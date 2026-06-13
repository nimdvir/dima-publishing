param(
    [Parameter(Mandatory = $true)]
    [string]$ChapterNumber,

    [switch]$SkipHtmlBuild,

    [string]$SourceRoot = "books/database-book/files/source",

    [datetime]$BuildDate = (Get-Date)
)

$ErrorActionPreference = 'Stop'

# ── Paths ──
$repoRoot = $PSScriptRoot | Split-Path -Parent
$sourceChapters = Join-Path $repoRoot $SourceRoot "chapters"
$htmlBuildScript = Join-Path $repoRoot "scripts" "build-chapter-html.ps1"
$reviewIndexScript = Join-Path $repoRoot "scripts" "build-review-index.ps1"

# ── Normalize chapter number ──
$num = $ChapterNumber.Trim()
if ($num -match '^ch(?<digits>\d{1,2})$') { $num = $Matches['digits'] }
if ($num -notmatch '^\d{1,2}$') { throw "Invalid chapter number: $ChapterNumber" }
$chapterId = 'ch{0:d2}' -f [int]$num
$chapterNum = [int]$num

# ── Resolve chapter folder ──
$chapterFolders = Get-ChildItem -LiteralPath $sourceChapters -Directory |
    Where-Object { $_.Name -like "$chapterId-*" } |
    Sort-Object Name

if ($chapterFolders.Count -eq 0) {
    throw "No chapter folder found for $chapterId under $sourceChapters"
}
if ($chapterFolders.Count -gt 1) {
    throw "Multiple chapter folders found for $chapterId under $sourceChapters"
}

$chapterFolder = $chapterFolders[0].FullName
$chapterName = $chapterFolders[0].Name

Write-Host "Chapter folder: $chapterName" -ForegroundColor Cyan

# ── Ensure HTML exists ──
if (-not $SkipHtmlBuild) {
    Write-Host "Building review HTML first..." -ForegroundColor Cyan
    if (-not (Test-Path -LiteralPath $htmlBuildScript)) {
        throw "HTML build script not found at: $htmlBuildScript"
    }

    $htmlResult = & pwsh -NoProfile -ExecutionPolicy Bypass -File $htmlBuildScript -ChapterNumber $num 2>&1
    if ($LASTEXITCODE -ne 0) {
        # HTML build already prints its own errors; fail here
        throw "HTML build failed (exit code $LASTEXITCODE). Cannot proceed to PDF."
    }
    Write-Host ""
}

# ── Find most recent review HTML ──
$htmlFiles = Get-ChildItem -LiteralPath $chapterFolder -File -Filter "${chapterId}-review-*.html" |
    Sort-Object Name -Descending

if ($htmlFiles.Count -eq 0) {
    throw "No review HTML found for $chapterId in $chapterFolder. Run build-chapter-html.ps1 first."
}

$htmlFile = $htmlFiles[0]
$htmlPath = $htmlFile.FullName
$htmlFileName = $htmlFile.Name

Write-Host "Source HTML: $htmlFileName" -ForegroundColor Cyan

# ── Extract date from HTML filename ──
$reviewDate = $BuildDate.ToString('yyyy-MM-dd')
if ($htmlFile.BaseName -match '(\d{4}-\d{2}-\d{2})') {
    $reviewDate = $Matches[1]
}

# ── Resolve Edge binary ──
$edgePath = $null
$edgeCandidates = @(
    (Get-Command msedge -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source),
    "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
    "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
    "${env:LOCALAPPDATA}\Microsoft\Edge\Application\msedge.exe"
)

foreach ($candidate in $edgeCandidates) {
    if ($candidate -and (Test-Path -LiteralPath $candidate)) {
        $edgePath = $candidate
        break
    }
}

if (-not $edgePath) {
    throw "Microsoft Edge not found. Install Edge or ensure msedge is on PATH."
}

Write-Host "Edge: $edgePath" -ForegroundColor DarkGray

# ── Output PDF path ──
$outputPdf = Join-Path $chapterFolder "${chapterId}-review-${reviewDate}.pdf"

# ── Build file:// URL (Edge requires forward slashes) ──
$fileUrl = "file:///" + ($htmlPath -replace '\\', '/')

# ── Convert HTML to PDF via Edge headless ──
Write-Host "Converting to PDF..." -ForegroundColor Cyan
Write-Host "  Output: $outputPdf" -ForegroundColor DarkGray

$edgeArgs = @(
    '--headless',
    '--disable-gpu',
    "--print-to-pdf=$outputPdf",
    '--no-pdf-header-footer',
    '--window-size=1280,900',
    $fileUrl
)

& $edgePath @edgeArgs 2>&1 | Out-Null

if ($LASTEXITCODE -ne 0) {
    throw "Edge headless PDF conversion failed (exit code $LASTEXITCODE)."
}

# ── Verify PDF was created ──
if (-not (Test-Path -LiteralPath $outputPdf)) {
    throw "PDF was not created at: $outputPdf"
}

$pdfSizeKB = [math]::Round((Get-Item -LiteralPath $outputPdf).Length / 1KB, 1)

# ── Report ──
Write-Host ""
Write-Host "Built: $outputPdf" -ForegroundColor Green
Write-Host "Size: $pdfSizeKB KB" -ForegroundColor Green
Write-Host "Source HTML: $htmlFileName" -ForegroundColor Green

# ── Rebuild the master index ──
if (Test-Path -LiteralPath $reviewIndexScript) {
    Write-Host ""
    Write-Host "Updating review index..." -ForegroundColor Cyan
    & pwsh -NoProfile -ExecutionPolicy Bypass -File $reviewIndexScript
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Index rebuild returned exit code $LASTEXITCODE"
    }
} else {
    Write-Warning "Index script not found at: $reviewIndexScript"
}

return $outputPdf
