param(
    [Parameter(Mandatory = $true)]
    [string]$ChapterNumber,

    [string]$SourceRoot = "books/database-book/files/source",

    [datetime]$BuildDate = (Get-Date)
)

$ErrorActionPreference = 'Stop'

# ── Paths ──
$repoRoot = $PSScriptRoot | Split-Path -Parent
$sourceChapters = Join-Path $repoRoot $SourceRoot "chapters"
$sourceLabs = Join-Path $repoRoot $SourceRoot "labs"
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

# ── Resolve lab folder ──
$labFolders = Get-ChildItem -LiteralPath $sourceLabs -Directory |
    Where-Object { $_.Name -like "lab-{0:d2}-*" -f $chapterNum -or $_.Name -like "lab-{0:d1}-*" -f $chapterNum } |
    Sort-Object Name

$labQuestionsFile = $null
$labFolderName = $null
if ($labFolders.Count -gt 0) {
    $labFolder = $labFolders[0].FullName
    $labFolderName = $labFolders[0].Name
    $labQuestionsFiles = Get-ChildItem -LiteralPath $labFolder -File -Filter "lab-*-questions-*.md" |
        Sort-Object Name -Descending
    if ($labQuestionsFiles.Count -gt 0) {
        $labQuestionsFile = $labQuestionsFiles[0]
        Write-Host "Lab file: $($labQuestionsFile.Name)" -ForegroundColor Cyan
    } else {
        Write-Warning "No questions file found in $labFolderName"
    }
} else {
    Write-Warning "No lab folder found for chapter $chapterNum"
}

# ── Define sections to read ──
$sections = @(
    @{ File = "core-concepts.md";   Heading = "Core Concepts" },
    @{ File = "lets-build.md";      Heading = "Let's Build" },
    @{ File = "review-questions.md"; Heading = "Review & Reflection" },
    @{ File = "terms-treasury.md";  Heading = "Terms Treasury" },
    @{ File = "rat.md";             Heading = "Readiness Assessment Test" }
)

# ── Collect content ──
$combinedParts = New-Object System.Collections.Generic.List[string]
$includedSections = New-Object System.Collections.Generic.List[string]
$skippedSections = New-Object System.Collections.Generic.List[string]

foreach ($section in $sections) {
    $filePath = Join-Path $chapterFolder $section.File
    if (-not (Test-Path -LiteralPath $filePath)) {
        Write-Warning "Missing: $($section.File) — skipping $($section.Heading)"
        $skippedSections.Add($section.Heading)
        continue
    }

    $content = Get-Content -LiteralPath $filePath -Raw -Encoding UTF8
    if ([string]::IsNullOrWhiteSpace($content)) {
        Write-Warning "Empty: $($section.File) — skipping $($section.Heading)"
        $skippedSections.Add($section.Heading)
        continue
    }

    # Build section block with heading and page-break separator
    $combinedParts.Add(@"
<div class="page-break"></div>

## $($section.Heading)

$($content.Trim())
"@)
    $includedSections.Add($section.Heading)
}

# ── Add lab section ──
if ($null -ne $labQuestionsFile) {
    $labContent = Get-Content -LiteralPath $labQuestionsFile.FullName -Raw -Encoding UTF8
    if (-not [string]::IsNullOrWhiteSpace($labContent)) {
        $combinedParts.Add(@"
<div class="page-break"></div>

## Lab

$($labContent.Trim())
"@)
        $includedSections.Add("Lab")
    } else {
        $skippedSections.Add("Lab (empty)")
    }
} else {
    $skippedSections.Add("Lab (not found)")
}

# ── Ensure we have something to build ──
if ($combinedParts.Count -eq 0) {
    throw "No content found for $chapterId — all sections are missing or empty."
}

# ── Check for Pandoc ──
if (-not (Get-Command pandoc -ErrorAction SilentlyContinue)) {
    throw 'Pandoc is required but was not found on PATH.'
}

# ── Build date string ──
$buildDateText = $BuildDate.ToString('yyyy-MM-dd')

# ── Combine sections into temporary Markdown ──
$tempMdPath = Join-Path $chapterFolder "._review-temp-${chapterId}-${buildDateText}.md"
$combinedMarkdown = ($combinedParts -join "`r`n`r`n")

try {
    Set-Content -LiteralPath $tempMdPath -Value $combinedMarkdown -Encoding utf8

    # ── Pandoc: Markdown → HTML fragment ──
    $tempHtmlPath = Join-Path $chapterFolder "._review-temp-${chapterId}-${buildDateText}.html"
    $pandocExtensions = @(
        'markdown',
        'raw_html',
        'fenced_code_blocks',
        'fenced_code_attributes',
        'pipe_tables',
        'grid_tables',
        'header_attributes',
        'link_attributes',
        'fenced_divs',
        'native_divs'
    ) -join '+'

    $pandocArgs = @(
        $tempMdPath,
        '-f', $pandocExtensions,
        '-t', 'html5',
        '-o', $tempHtmlPath
    )

    Write-Host "Running Pandoc..." -ForegroundColor Cyan
    & pandoc @pandocArgs
    if ($LASTEXITCODE -ne 0) {
        throw "Pandoc conversion failed."
    }

    # ── Read the HTML fragment ──
    $htmlFragment = Get-Content -LiteralPath $tempHtmlPath -Raw -Encoding UTF8

    # ── Try to extract chapter title from core-concepts.md H1 ──
    $coreConceptsPath = Join-Path $chapterFolder "core-concepts.md"
    $chapterTitle = ""
    if (Test-Path -LiteralPath $coreConceptsPath) {
        $firstLines = Get-Content -LiteralPath $coreConceptsPath -First 10 -Encoding UTF8
        foreach ($line in $firstLines) {
            if ($line -match '^#\s+(.+)') {
                $chapterTitle = $Matches[1].Trim()
                # Remove trailing HTML tags if any
                $chapterTitle = $chapterTitle -replace '<[^>]+>', ''
                break
            }
        }
    }
    if ([string]::IsNullOrWhiteSpace($chapterTitle)) {
        # Fall back to folder name
        $chapterTitle = $chapterName -replace "^$chapterId-", '' -replace '-', ' '
        $chapterTitle = (Get-Culture).TextInfo.ToTitleCase($chapterTitle)
    }

    # ── Calculate relative CSS path ──
    # From: books/database-book/files/source/chapters/chNN-name/chNN-review-YYYY-MM-DD.html
    # To:   books/database-book/platform-pilots/reader-hybrid-v1.1/src/styles.css
    $cssRelativePath = "../../../../../platform-pilots/reader-hybrid-v1.1/src/styles.css"

    # ── Wrap in the review template ──
    $outputPath = Join-Path $chapterFolder "${chapterId}-review-${buildDateText}.html"

    $htmlDoc = @"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>$chapterId — Chapter Review — $buildDateText</title>
<!-- Generated: $buildDateText -->
<link rel="stylesheet" href="$cssRelativePath">
<style>
  /* ── Print page setup ── */
  @page {
    size: letter;
    margin: 0.75in;
  }
  @media print {
    .page-break { page-break-before: always; border: none; margin: 0; }
    .section-heading { page-break-before: always; }
    .review-header { page-break-after: avoid; }
    .back-link { display: none; }
    body { font-size: 11pt; }
    .markdown-body pre { white-space: pre-wrap; word-wrap: break-word; }
    .markdown-body iframe { max-width: 100%; height: auto; }
  }
  /* ── Screen separator ── */
  .page-break {
    border: none;
    border-top: 2px dashed var(--color-border, #e4e4e7);
    margin: 2.5rem 0 1.5rem;
  }
  .page-break:first-child { display: none; }
  /* ── Review layout ── */
  .review-body {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
  }
  .review-header {
    border-bottom: 3px solid var(--color-primary, #4f46e5);
    margin-bottom: 2rem;
    padding-bottom: 0.75rem;
  }
  .review-header h1 {
    font-family: var(--font-serif, Georgia, serif);
    font-size: 1.75rem;
    margin: 0 0 0.35rem;
    color: var(--color-heading, #1a2433);
  }
  .review-meta {
    color: var(--color-text-muted, #71717a);
    font-size: 0.85rem;
    line-height: 1.5;
  }
  /* ── Back to index link ── */
  .back-link {
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 0.85rem;
    color: var(--color-link, #4f46e5);
    text-decoration: none;
  }
  .back-link:hover { text-decoration: underline; }
  /* ── Ensure content fits ── */
  .markdown-body { overflow-wrap: break-word; }
  .markdown-body img { max-width: 100%; height: auto; }
  .markdown-body iframe,
  .markdown-body video { max-width: 100%; }
  .markdown-body table { display: block; overflow-x: auto; max-width: 100%; }
</style>
</head>
<body>
<div class="review-body">
  <header class="review-header">
    <h1>${chapterId}: $chapterTitle</h1>
    <p class="review-meta">
      <strong>Chapter Review</strong> &middot;
      Generated: $buildDateText &middot;
      Sections: $($includedSections -join ', ')
    </p>
    <a class="back-link" href="../../../../../review-index.html">&larr; Back to Review Index</a>
  </header>
  <div class="markdown-body">
$htmlFragment
  </div>
</div>
</body>
</html>
"@

    Set-Content -LiteralPath $outputPath -Value $htmlDoc -Encoding utf8

    # ── Report ──
    Write-Host ""
    Write-Host "Built: $outputPath" -ForegroundColor Green
    Write-Host "Sections: $($includedSections.Count)/$($sections.Count + 1) ($($includedSections -join ', '))" -ForegroundColor Green
    if ($skippedSections.Count -gt 0) {
        Write-Host "Skipped: $($skippedSections -join ', ')" -ForegroundColor Yellow
    }

    # ── Rebuild the master index ──
    if (Test-Path -LiteralPath $reviewIndexScript) {
        Write-Host ""
        Write-Host "Rebuilding review index..." -ForegroundColor Cyan
        & pwsh -NoProfile -ExecutionPolicy Bypass -File $reviewIndexScript
        if ($LASTEXITCODE -ne 0) {
            Write-Warning "Index rebuild returned exit code $LASTEXITCODE"
        }
    } else {
        Write-Warning "Index script not found at: $reviewIndexScript"
    }

    return $outputPath

} finally {
    # ── Cleanup temp files ──
    if (Test-Path -LiteralPath $tempMdPath) {
        Remove-Item -LiteralPath $tempMdPath -Force -ErrorAction SilentlyContinue
    }
    if (Test-Path -LiteralPath $tempHtmlPath) {
        Remove-Item -LiteralPath $tempHtmlPath -Force -ErrorAction SilentlyContinue
    }
}
