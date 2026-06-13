<#
.SYNOPSIS
  Rebaseline chapters 1-7 from Google Drive into dima-publishing source.
  Copies latest canonical chapter files to stable filenames, lab questions,
  lab answers (instructor/), lab assets, adds HTML metadata comments, and
  removes YAML frontmatter.

  Plan: /memories/session/plan.md
  On disk: .edits/rebaseline-plan-2026-06-11.md
#>

param([switch]$DryRun)

$ErrorActionPreference = 'Stop'

$SourceRoot = 'G:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts'
$LabsRoot  = Join-Path $SourceRoot 'Labs-draft'
$TargetRoot = 'C:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\files\source'
$ChaptersDir = Join-Path $TargetRoot 'chapters'
$LabsDir    = Join-Path $TargetRoot 'labs'
$Timestamp  = Get-Date -Format 'yyyy-MM-ddTHH:mm:ssK'
$Today      = '2026-06-11'

$ExcludePattern = '(edit|edits|edited|rewrite|rewritten|draft|outline|concept|notes|scratch|backup|archive|termtreasury|TermTreasury|production|final)'

# Chapter definitions order 1-7
$Chapters = @(
    @{ N='01'; Slug='ch01-introduction-to-course';      DraftFolder='ch01-introduction-to-course' }
    @{ N='02'; Slug='ch02-mis-and-bitm';                DraftFolder='ch02-mis-and-bitm' }
    @{ N='03'; Slug='ch03-what-is-data';                 DraftFolder='ch03-what-is-data' }
    @{ N='04'; Slug='ch04-databases';                    DraftFolder='ch04-databases' }
    @{ N='05'; Slug='ch05-sql';                          DraftFolder='ch05-sql' }
    @{ N='06'; Slug='ch06-relational-model';             DraftFolder='ch06-relational-model' }
    @{ N='07'; Slug='ch07-normalization';                DraftFolder='ch07-normalization' }
)

# Section mapping: Drive subfolder -> stable filename, filename pattern
$Sections = @(
    @{ Sub='main';       Stable='core-concepts.md';   Pattern='^ch\d{2}-main-(\d{4}-\d{2}-\d{2})\.md$' }
    @{ Sub='lets-build'; Stable='lets-build.md';       Pattern='^ch\d{2}-lets-build-(\d{4}-\d{2}-\d{2})\.md$' }
    @{ Sub='reflection'; Stable='review-questions.md'; Pattern='^ch\d{2}-reflection-(\d{4}-\d{2}-\d{2})\.md$' }
    @{ Sub='terms';      Stable='terms-treasury.md';   Pattern='^ch\d{2}-terms-(\d{4}-\d{2}-\d{2})\.md$' }
    @{ Sub='rat';        Stable='rat.md';              Pattern='^ch\d{2}-rat-(\d{4}-\d{2}-\d{2})\.md$' }
)

# Lab definitions 1-7
$Labs = @(
    @{ LabNum='01'; Folder='lab-01-petvax-intro';          Slug='lab-01-petvax-intro' }
    @{ LabNum='02'; Folder='lab-02-petvax-system';         Slug='lab-02-petvax-system' }
    @{ LabNum='03'; Folder='lab-03-data-types-and-tables'; Slug='lab-03-data-types-and-tables' }
    @{ LabNum='04'; Folder='lab-04-intro-to-access';       Slug='lab-04-intro-to-access' }
    @{ LabNum='05'; Folder='lab-05-sql';                   Slug='lab-05-sql' }
    @{ LabNum='06'; Folder='lab-06-relational-model';      Slug='lab-06-relational-model' }
    @{ LabNum='07'; Folder='lab-07-normalization';         Slug='lab-07-normalization' }
)

$Stats = @{ Chapters=0; Sections=0; LabQuestions=0; LabAnswers=0; Assets=0; Ch02Cleaned=0 }

# ── Helpers ──

function Get-FileHash256 { param([string]$Path) (Get-FileHash -Path $Path -Algorithm SHA256).Hash.ToLower() }

function Select-LatestCanonical {
    param([string]$FolderPath, [string]$Pattern)
    if (-not (Test-Path $FolderPath)) { return $null }
    $files = Get-ChildItem $FolderPath -File -Filter '*.md' | Where-Object {
        $_.Name -notmatch $ExcludePattern -and $_.Name -match $Pattern
    }
    if (-not $files) { return $null }
    $latest = $files | ForEach-Object { if ($_.Name -match $Pattern) { [PSCustomObject]@{ File=$_; Date=$Matches[1] } } } | Sort-Object Date -Descending | Select-Object -First 1
    return $latest
}

function Build-MetadataComment {
    param([string]$Content, [string]$SourceDate, [string]$DefaultTitle)
    $meta = "<!-- metadata: date=`"$SourceDate`""
    # Try to extract from YAML frontmatter
    if ($Content -match '^---\s*\n(.*?)\n---') {
        $yamlBlock = $Matches[1]
        if ($yamlBlock -match 'title:\s*["'']?(.+?)["'']?\s*$') { $meta += "; title=`"$($Matches[1].Replace('"','\"').Trim())`"" }
        if ($yamlBlock -match 'chapter:\s*(\d+)') { $meta += "; chapter=`"$($Matches[1])`"" }
        if ($yamlBlock -match 'section:\s*["'']?(.+?)["'']?\s*$') { $meta += "; section=`"$($Matches[1].Replace('"','\"').Trim())`"" }
        if ($yamlBlock -match 'description:\s*["'']?(.+?)["'']?\s*$') {
            # get only first line of description
            $desc = $Matches[1].Trim() -replace '\s*\n.*', ''
            $meta += "; description=`"$($desc.Replace('"','\"'))`""
        }
        if ($yamlBlock -match 'author:\s*["'']?(.+?)["'']?\s*$') { $meta += "; author=`"$($Matches[1].Trim())`"" }
        if ($yamlBlock -match 'keywords:\s*\n(.*?)(?:\n\w+:|$)' -or $yamlBlock -match 'keywords:\s*\[(.*?)\]') {
            $kw = $Matches[1].Trim()
            $kw = $kw -replace '^\s*-\s*', '' -replace '\n\s*-\s*', ', ' -replace '\n\s*', ', '
            if ($kw) { $meta += "; keywords=`"$($kw.Trim().Replace('"','\"'))`"" }
        }
    }
    $meta += " -->"
    return $meta
}

function Remove-YamlFrontmatter {
    param([string]$Content)
    if ($Content -match '^---\s*\n') {
        $secondDash = $Content.IndexOf("`n---", 4)
        if ($secondDash -gt 0) {
            return $Content.Substring($secondDash + 4).TrimStart()
        }
    }
    return $Content
}

function Copy-ChapterSection {
    param($Ch, $Sec)
    $srcDir = Join-Path $SourceRoot $Ch.DraftFolder $Sec.Sub
    $destDir = Join-Path $ChaptersDir $Ch.Slug
    $destFile = Join-Path $destDir $Sec.Stable
    $relDest = $destFile.Replace($TargetRoot, '').TrimStart('\').Replace('\', '/')

    $latest = Select-LatestCanonical $srcDir $Sec.Pattern
    if (-not $latest) {
        Write-Host "  MISS $($Ch.N) $($Sec.Sub) — no canonical file" -ForegroundColor Yellow
        return $null
    }

    $srcFile = $latest.File
    $srcPath = $srcFile.FullName
    $srcDate = $latest.Date
    $srcHash = Get-FileHash256 $srcPath
    $rawContent = Get-Content $srcPath -Raw

    # Build metadata comment
    $metaComment = Build-MetadataComment -Content $rawContent -SourceDate $srcDate

    # Remove YAML frontmatter
    $body = Remove-YamlFrontmatter $rawContent

    # Check if existing HTML comment at top (e.g. "<!-- Chapter edit:"), keep it
    $existingComment = ''
    if ($body -match '^(<!--[^>]*-->)\s*\n') {
        $existingComment = $Matches[1]
        $body = $body.Substring($Matches[0].Length).TrimStart()
    }

    # Assemble final content
    $finalContent = if ($existingComment) {
        "$existingComment`n$metaComment`n`n$body"
    } else {
        "$metaComment`n`n$body"
    }

    if (-not $DryRun) {
        if (-not (Test-Path $destDir)) { New-Item -ItemType Directory -Path $destDir -Force | Out-Null }
        [System.IO.File]::WriteAllText($destFile, $finalContent, [System.Text.UTF8Encoding]::new($false))
    }

    Write-Host "  OK   ch$($Ch.N) $($Sec.Sub) [$srcDate] -> $($Sec.Stable)" -ForegroundColor Green

    return @{
        ChN=$Ch.N; Section=$Sec.Sub; SrcPath=$srcPath; SrcFile=$srcFile.Name; SrcDate=$srcDate
        SrcSha256=$srcHash; DestPath=$relDest; Status='imported-normalized'
        Notes='metadata comment added; YAML frontmatter removed if present'
    }
}

function Copy-LabFiles {
    param($Lab)
    $labDraftDir = Join-Path $LabsRoot $Lab.Folder
    $labDestDir  = Join-Path $LabsDir $Lab.Slug
    $results = @()

    if (-not (Test-Path $labDraftDir)) {
        Write-Host "  MISS lab-$($Lab.LabNum) — folder not found" -ForegroundColor Yellow
        return $results
    }

    $labFiles = Get-ChildItem $labDraftDir -File | Sort-Object Name

    # Find latest questions file
    $qPattern = "^lab-$($Lab.LabNum)-questions-(\d{4}-\d{2}-\d{2})\.md$"
    $questions = $labFiles | Where-Object { $_.Name -match $qPattern } | ForEach-Object {
        if ($_.Name -match $qPattern) { [PSCustomObject]@{ File=$_; Date=$Matches[1] } }
    } | Sort-Object Date -Descending | Select-Object -First 1

    if ($questions) {
        $destFile = Join-Path $labDestDir $questions.File.Name
        $relDest = $destFile.Replace($TargetRoot, '').TrimStart('\').Replace('\', '/')
        $rawContent = Get-Content $questions.File.FullName -Raw
        $metaComment = Build-MetadataComment -Content $rawContent -SourceDate $questions.Date
        $body = Remove-YamlFrontmatter $rawContent
        $finalContent = "$metaComment`n`n$body"

        if (-not $DryRun) {
            if (-not (Test-Path $labDestDir)) { New-Item -ItemType Directory -Path $labDestDir -Force | Out-Null }
            [System.IO.File]::WriteAllText($destFile, $finalContent, [System.Text.UTF8Encoding]::new($false))
        }
        Write-Host "  OK   lab-$($Lab.LabNum) questions [$($questions.Date)]" -ForegroundColor Green
        $results += @{ LabNum=$Lab.LabNum; Type='lab-questions'; SrcPath=$questions.File.FullName; SrcFile=$questions.File.Name
            SrcDate=$questions.Date; SrcSha256=(Get-FileHash256 $questions.File.FullName)
            DestPath=$relDest; Status='imported-normalized'; Notes='metadata comment added; YAML frontmatter removed' }
        $Stats.LabQuestions++
    } else {
        Write-Host "  MISS lab-$($Lab.LabNum) questions — no canonical file" -ForegroundColor Yellow
    }

    # Find latest answers file
    $aPattern = "^lab-$($Lab.LabNum)-answers-(\d{4}-\d{2}-\d{2})\.md$"
    $answers = $labFiles | Where-Object { $_.Name -match $aPattern } | ForEach-Object {
        if ($_.Name -match $aPattern) { [PSCustomObject]@{ File=$_; Date=$Matches[1] } }
    } | Sort-Object Date -Descending | Select-Object -First 1

    if ($answers) {
        $instructorDir = Join-Path $labDestDir 'instructor'
        $destFile = Join-Path $instructorDir $answers.File.Name
        $relDest = $destFile.Replace($TargetRoot, '').TrimStart('\').Replace('\', '/')
        $rawContent = Get-Content $answers.File.FullName -Raw
        $metaComment = Build-MetadataComment -Content $rawContent -SourceDate $answers.Date
        $body = Remove-YamlFrontmatter $rawContent
        $finalContent = "$metaComment`n`n$body"

        if (-not $DryRun) {
            if (-not (Test-Path $instructorDir)) { New-Item -ItemType Directory -Path $instructorDir -Force | Out-Null }
            [System.IO.File]::WriteAllText($destFile, $finalContent, [System.Text.UTF8Encoding]::new($false))
        }
        Write-Host "  OK   lab-$($Lab.LabNum) answers [$($answers.Date)] -> instructor/" -ForegroundColor Green
        $results += @{ LabNum=$Lab.LabNum; Type='lab-answers'; SrcPath=$answers.File.FullName; SrcFile=$answers.File.Name
            SrcDate=$answers.Date; SrcSha256=(Get-FileHash256 $answers.File.FullName)
            DestPath=$relDest; Status='imported-normalized'; Notes='metadata comment added; YAML frontmatter removed; instructor-only' }
        $Stats.LabAnswers++
    } else {
        Write-Host "  MISS lab-$($Lab.LabNum) answers — no canonical file" -ForegroundColor Yellow
    }

    # Copy assets folder
    $assetsSrc = Join-Path $labDraftDir 'assets'
    if (Test-Path $assetsSrc) {
        $assetsDest = Join-Path $labDestDir 'assets'
        $assetFiles = Get-ChildItem $assetsSrc -Recurse -File
        if ($assetFiles.Count -gt 0) {
            if (-not $DryRun) {
                if (-not (Test-Path $assetsDest)) { New-Item -ItemType Directory -Path $assetsDest -Force | Out-Null }
                Copy-Item "$assetsSrc\*" $assetsDest -Recurse -Force
            }
            Write-Host "  OK   lab-$($Lab.LabNum) assets — $($assetFiles.Count) file(s)" -ForegroundColor Green
            foreach ($af in $assetFiles) {
                $relAf = $af.FullName.Replace($labDraftDir, "assets").Replace('\', '/')
                $results += @{ LabNum=$Lab.LabNum; Type='lab-assets'; SrcPath=$af.FullName; SrcFile=$af.Name
                    SrcDate=''; SrcSha256=(Get-FileHash256 $af.FullName)
                    DestPath="files/source/labs/$($Lab.Slug)/$relAf"; Status='imported'; Notes='binary asset, unmodified' }
            }
            $Stats.Assets += $assetFiles.Count
        } else {
            Write-Host "  NOTE lab-$($Lab.LabNum) assets — folder empty" -ForegroundColor DarkGray
        }
    } else {
        Write-Host "  NOTE lab-$($Lab.LabNum) — no assets folder" -ForegroundColor DarkGray
    }

    return $results
}

# ── Main ──

Write-Host ''
if ($DryRun) { Write-Host '=== DRY RUN — no files written ===' -ForegroundColor Yellow }
else { Write-Host '=== REBASELINE Ch01-07 ===' -ForegroundColor Green }
Write-Host "  Source: $SourceRoot"
Write-Host "  Target: $ChaptersDir"
Write-Host ''

$allManifestRows = [System.Collections.Generic.List[object]]::new()

# ── Chapters ──
Write-Host '── Chapters ──' -ForegroundColor Cyan
foreach ($ch in $Chapters) {
    Write-Host ''
    Write-Host "  Chapter $($ch.N) — $($ch.Slug)" -ForegroundColor White
    foreach ($sec in $Sections) {
        $row = Copy-ChapterSection $ch $sec
        if ($row) {
            $allManifestRows.Add([pscustomobject][ordered]@{
                content_id=$ch.Slug.Replace('ch01-','').Replace('ch02-','').Replace('ch03-','').Replace('ch04-','').Replace('ch05-','').Replace('ch06-','').Replace('ch07-','')
                component=$sec.Sub; source_path=$row.SrcPath; source_filename=$row.SrcFile
                source_date=$row.SrcDate; source_sha256=$row.SrcSha256; destination_path=$row.DestPath
                imported_at=$Timestamp; status=$row.Status; notes=$row.Notes
            })
            $Stats.Sections++
        }
    }
}

# ── Labs ──
Write-Host ''
Write-Host '── Labs ──' -ForegroundColor Cyan
foreach ($lab in $Labs) {
    Write-Host ''
    Write-Host "  Lab $($lab.LabNum) — $($lab.Slug)" -ForegroundColor White
    $labRows = Copy-LabFiles $lab
    foreach ($lr in $labRows) {
        $allManifestRows.Add([pscustomobject][ordered]@{
            content_id="lab-$($lr.LabNum)"
            component=$lr.Type; source_path=$lr.SrcPath; source_filename=$lr.SrcFile
            source_date=$lr.SrcDate; source_sha256=$lr.SrcSha256; destination_path=$lr.DestPath
            imported_at=$Timestamp; status=$lr.Status; notes=$lr.Notes
        })
    }
}

# ── Ch02 cleanup ──
Write-Host ''
Write-Host '── Ch02 Cleanup ──' -ForegroundColor Cyan
$ch02Dir = Join-Path $ChaptersDir 'ch02-mis-and-bitm'
$ch02Artifacts = @('ch02-main-2026-06-06.md','ch02-lets-build-2026-06-03.md','ch02-reflection-2026-06-03.md','ch02-terms-2026-06-02.md','ch02-rat-2026-06-03.md','.sync-manifest.json')
$ch02Removed = 0
foreach ($art in $ch02Artifacts) {
    $artPath = Join-Path $ch02Dir $art
    if (Test-Path $artPath) {
        if (-not $DryRun) { Remove-Item $artPath -Force }
        Write-Host "  RM   $art" -ForegroundColor Yellow
        $ch02Removed++
    }
}
if ($ch02Removed -eq 0) {
    Write-Host "  (nothing to clean up)" -ForegroundColor DarkGray
}
$Stats.Ch02Cleaned = $ch02Removed

# ── Summary ──
Write-Host ''
Write-Host '── Summary ──' -ForegroundColor Cyan
Write-Host "  Chapter sections:  $($Stats.Sections)"
Write-Host "  Lab questions:     $($Stats.LabQuestions)"
Write-Host "  Lab answers:       $($Stats.LabAnswers)"
Write-Host "  Lab assets:        $($Stats.Assets)"
Write-Host "  Ch02 artifacts rm: $($Stats.Ch02Cleaned)"
Write-Host ''

if ($DryRun) {
    Write-Host 'DRY RUN complete. No files were written.' -ForegroundColor Yellow
} else {
    Write-Host "REBASELINE complete." -ForegroundColor Green
    Write-Host "Manifest rows: $($allManifestRows.Count)"
}

Write-Host ''

# Return manifest rows for pipeline use
$allManifestRows
