<#
.SYNOPSIS
  Import latest canonical BITM330 chapter drafts from Google Drive into
  the Git repository using stable filenames.

.DESCRIPTION
  Scans the Google Drive chapter-drafts folder, selects the latest
  canonical dated file per section, and copies them into
  files/source/chapters/ with stable names. Also handles labs and outlines.

  See: plans/book-edit/book-plan-codex.md (Phase 3-4)

.PARAMETER DryRun
  Report what would be imported without writing any files.

.EXAMPLE
  .\import-latest-drafts.ps1 -DryRun
  .\import-latest-drafts.ps1
#>

param(
    [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

# ── Paths ──────────────────────────────────────────────────────────────

$RepoRoot   = (Resolve-Path "$PSScriptRoot\..").Path
$SourceRoot = Join-Path $RepoRoot 'files\source'
$ChaptersDir = Join-Path $SourceRoot 'chapters'
$LabsDir    = Join-Path $SourceRoot 'labs'
$ManifestsDir = Join-Path $RepoRoot 'files\manifests'

$DriveRoot  = 'G:\My Drive\0-Projects\!-important\BITM330-book-drive'
$DraftRoot  = Join-Path $DriveRoot 'BITM330-Book-draft\chapter-drafts'
$LabsDraft  = Join-Path $DraftRoot 'Labs-draft'

# ── Chapter registry ───────────────────────────────────────────────────

# Section mapping: Drive subfolder → stable filename, with regex pattern
$Sections = @(
    @{ Subfolder = 'main';       StableFile = 'core-concepts.md';    Pattern = '^ch\d{2}-main-(\d{4}-\d{2}-\d{2})\.md$' }
    @{ Subfolder = 'lets-build'; StableFile = 'lets-build.md';       Pattern = '^ch\d{2}-lets-build-(\d{4}-\d{2}-\d{2})\.md$' }
    @{ Subfolder = 'reflection'; StableFile = 'review-questions.md'; Pattern = '^ch\d{2}-reflection-(\d{4}-\d{2}-\d{2})\.md$' }
    @{ Subfolder = 'terms';      StableFile = 'terms-treasury.md';   Pattern = '^ch\d{2}-terms-(\d{4}-\d{2}-\d{2})\.md$' }
    @{ Subfolder = 'rat';        StableFile = 'rat.md';              Pattern = '^ch\d{2}-rat-(\d{4}-\d{2}-\d{2})\.md$' }
)

# Exclusion filter for non-canonical files
$ExcludePattern = '(edit|edits|edited|rewrite|rewritten|draft|outline|concept|notes|scratch|backup|archive|termtreasury|TermTreasury|production|final)'

# Chapter definitions (from chapter-registry.yml)
$Chapters = @(
    @{ Id = 'introduction-to-course';       DraftFolder = 'ch01-introduction-to-course';       SourceFolder = 'ch01-introduction-to-course' }
    @{ Id = 'mis-and-bitm';                 DraftFolder = 'ch02-mis-and-bitm';                 SourceFolder = 'ch02-mis-and-bitm' }
    @{ Id = 'what-is-data';                 DraftFolder = 'ch03-what-is-data';                 SourceFolder = 'ch03-what-is-data' }
    @{ Id = 'databases';                    DraftFolder = 'ch04-databases';                    SourceFolder = 'ch04-databases' }
    @{ Id = 'sql';                          DraftFolder = 'ch05-sql';                          SourceFolder = 'ch05-sql' }
    @{ Id = 'relational-model';             DraftFolder = 'ch06-relational-model';             SourceFolder = 'ch06-relational-model' }
    @{ Id = 'normalization';                DraftFolder = 'ch07-normalization';                 SourceFolder = 'ch07-normalization' }
    @{ Id = 'midterm-review';               DraftFolder = 'ch08-midterm-review';               SourceFolder = 'ch08-midterm-review' }
    @{ Id = 'database-design';              DraftFolder = 'ch09-database-design';              SourceFolder = 'ch09-database-design' }
    @{ Id = 'advanced-sql-queries';         DraftFolder = 'ch10-advanced-sql-queries';         SourceFolder = 'ch10-advanced-sql-queries' }
    @{ Id = 'database-administration';      DraftFolder = 'ch11-database-administration';      SourceFolder = 'ch11-database-administration' }
    @{ Id = 'business-intelligence';        DraftFolder = 'ch12-business-intelligence';        SourceFolder = 'ch12-business-intelligence' }
    @{ Id = 'advanced-database-techniques'; DraftFolder = 'ch13-advanced-database-techniques'; SourceFolder = 'ch13-advanced-database-techniques' }
    @{ Id = 'power-bi';                     DraftFolder = 'ch14-powerbi';                      SourceFolder = 'ch14-powerbi' }
    @{ Id = 'business-strategy-and-is';     DraftFolder = 'ch15-business-strategy-is';         SourceFolder = 'ch15-business-strategy-is' }
    @{ Id = 'final-review';                 DraftFolder = 'ch16-final-review';                 SourceFolder = 'ch16-final-review' }
    @{ Id = 'conclusion';                   DraftFolder = 'ch17-conclusion';                   SourceFolder = 'ch17-conclusion' }
)

# Lab definitions
$Labs = @(
    @{ Id = 'lab-01'; Slug = 'lab-01-petvax-intro';          Folder = 'lab-01-petvax-intro' }
    @{ Id = 'lab-02'; Slug = 'lab-02-petvax-system';         Folder = 'lab-02-petvax-system' }
    @{ Id = 'lab-03'; Slug = 'lab-03-data-types-and-tables'; Folder = 'lab-03-data-types-and-tables' }
    @{ Id = 'lab-04'; Slug = 'lab-04-intro-to-access';       Folder = 'lab-04-intro-to-access' }
    @{ Id = 'lab-05'; Slug = 'lab-05-sql';                   Folder = 'lab-05-sql' }
    @{ Id = 'lab-06'; Slug = 'lab-06-relational-model';      Folder = 'lab-06-relational-model' }
    @{ Id = 'lab-07'; Slug = 'lab-07-normalization';         Folder = 'lab-07-normalization' }
    @{ Id = 'lab-08'; Slug = 'lab-08-midterm-review';        Folder = 'lab-08-midterm-review' }
    @{ Id = 'lab-09'; Slug = 'lab-09-advanced-sql';          Folder = 'lab-09-advanced-sql' }
    @{ Id = 'lab-10'; Slug = 'lab-10-database-design';       Folder = 'lab-10-database-design' }
    @{ Id = 'lab-11'; Slug = 'lab-11-database-admin';        Folder = 'lab-11-database-admin' }
    @{ Id = 'lab-12'; Slug = 'lab-12-business-intelligence'; Folder = 'lab-12-business-intelligence' }
    @{ Id = 'lab-13'; Slug = 'lab-13-advanced-techniques';   Folder = 'lab-13-advanced-techniques' }
    @{ Id = 'lab-14'; Slug = 'lab-14-powerbi';               Folder = 'lab-14-powerbi' }
    @{ Id = 'lab-15'; Slug = 'lab-15-strategy-and-is';       Folder = 'lab-15-strategy-and-is' }
)

# ── Helpers ────────────────────────────────────────────────────────────

function Get-FileHash256 {
    param([string]$Path)
    (Get-FileHash -Path $Path -Algorithm SHA256).Hash.ToLower()
}

function Select-LatestCanonical {
    param(
        [string]$FolderPath,
        [string]$Pattern,
        [string]$ExcludeRegex
    )

    if (-not (Test-Path -LiteralPath $FolderPath)) {
        return @{ Status = 'missing-folder'; File = $null; Date = $null; Skipped = @() }
    }

    $files = Get-ChildItem -LiteralPath $FolderPath -File -Filter '*.md' | Sort-Object Name

    $skipped = @()
    $candidates = @()

    foreach ($f in $files) {
        if ($f.Name -match $ExcludeRegex) {
            $skipped += @{ Name = $f.Name; Reason = 'excluded-pattern' }
            continue
        }
        if ($f.Name -match $Pattern) {
            $dateStr = $Matches[1]
            $candidates += @{ File = $f; Date = $dateStr }
        } else {
            $skipped += @{ Name = $f.Name; Reason = 'no-pattern-match' }
        }
    }

    if (@($candidates).Count -eq 0) {
        return @{ Status = 'missing-source'; File = $null; Date = $null; Skipped = $skipped }
    }

    $sorted = @($candidates | Sort-Object { $_.Date } -Descending)
    $latest = $sorted[0]

    # Check for same-date conflicts (wrap in @() so .Count is array length, not hashtable key count)
    $sameDateCount = @($sorted | Where-Object { $_.Date -eq $latest.Date }).Count
    if ($sameDateCount -gt 1) {
        return @{ Status = 'same-date-conflict'; File = $null; Date = $latest.Date; Skipped = $skipped }
    }

    return @{ Status = 'found'; File = $latest.File; Date = $latest.Date; Skipped = $skipped }
}

# ── Main ───────────────────────────────────────────────────────────────

$timestamp = Get-Date -Format 'yyyy-MM-ddTHH:mm:ssK'
$manifestRows = [System.Collections.Generic.List[string]]::new()
$manifestRows.Add('content_id,component,source_path,source_filename,source_date,source_sha256,destination_path,imported_at,status,notes')

$totalImported  = 0
$totalMissing   = 0
$totalSkipped   = 0
$totalConflicts = 0
$warnings       = [System.Collections.Generic.List[string]]::new()

Write-Host ''
if ($DryRun) {
    Write-Host '=== DRY RUN — no files will be written ===' -ForegroundColor Yellow
} else {
    Write-Host '=== IMPORT MODE — files will be copied ===' -ForegroundColor Green
}
Write-Host "  Drive root:  $DraftRoot"
Write-Host "  Repo root:   $RepoRoot"
Write-Host "  Timestamp:   $timestamp"
Write-Host ''

# ── Process chapters ───────────────────────────────────────────────────

Write-Host '── Chapters ──' -ForegroundColor Cyan
Write-Host ''

foreach ($ch in $Chapters) {
    $chDraftDir = Join-Path $DraftRoot $ch.DraftFolder
    $chDestDir  = Join-Path $ChaptersDir $ch.SourceFolder

    Write-Host "  $($ch.Id)" -ForegroundColor White

    if (-not (Test-Path -LiteralPath $chDraftDir)) {
        Write-Host "    WARN: Draft folder not found: $($ch.DraftFolder)" -ForegroundColor Red
        $warnings.Add("Chapter $($ch.Id): draft folder missing at $chDraftDir")
        $manifestRows.Add("$($ch.Id),all,$chDraftDir,,,,$chDestDir,$timestamp,missing-source,draft folder not found")
        $totalMissing++
        continue
    }

    foreach ($sec in $Sections) {
        $secDir = Join-Path $chDraftDir $sec.Subfolder
        $result = Select-LatestCanonical -FolderPath $secDir -Pattern $sec.Pattern -ExcludeRegex $ExcludePattern

        $destFile = Join-Path $chDestDir $sec.StableFile
        $relDest  = $destFile.Replace($RepoRoot, '').TrimStart('\').Replace('\', '/')

        switch ($result.Status) {
            'found' {
                $srcFile  = $result.File
                $hash     = Get-FileHash256 -Path $srcFile.FullName
                $relSrc   = $srcFile.FullName

                Write-Host "    OK   $($sec.Subfolder)/$($srcFile.Name)  ->  $($sec.StableFile)  [$($result.Date)]" -ForegroundColor Green

                if (-not $DryRun) {
                    if (-not (Test-Path -LiteralPath $chDestDir)) {
                        New-Item -ItemType Directory -Path $chDestDir -Force | Out-Null
                    }
                    Copy-Item -LiteralPath $srcFile.FullName -Destination $destFile -Force
                }

                $manifestRows.Add("$($ch.Id),$($sec.StableFile -replace '\.md$',''),$relSrc,$($srcFile.Name),$($result.Date),$hash,$relDest,$timestamp,imported,")
                $totalImported++
            }
            'missing-folder' {
                Write-Host "    SKIP $($sec.Subfolder)/  (folder not found)" -ForegroundColor DarkGray
                $manifestRows.Add("$($ch.Id),$($sec.StableFile -replace '\.md$',''),$secDir,,,,,$timestamp,missing-source,subfolder not found")
                $totalMissing++
            }
            'missing-source' {
                Write-Host "    MISS $($sec.Subfolder)/  (no canonical file)" -ForegroundColor Yellow
                $manifestRows.Add("$($ch.Id),$($sec.StableFile -replace '\.md$',''),$secDir,,,,,$timestamp,missing-source,no canonical file matched pattern")
                $totalMissing++
            }
            'same-date-conflict' {
                Write-Host "    CONFLICT $($sec.Subfolder)/  same-date: $($result.Date)" -ForegroundColor Red
                $warnings.Add("Chapter $($ch.Id) $($sec.Subfolder): same-date conflict on $($result.Date)")
                $manifestRows.Add("$($ch.Id),$($sec.StableFile -replace '\.md$',''),$secDir,,$($result.Date),,,,$timestamp,manual-review,same-date conflict")
                $totalConflicts++
            }
        }

        foreach ($sk in $result.Skipped) {
            $totalSkipped++
            Write-Host "    skip $($sec.Subfolder)/$($sk.Name)  ($($sk.Reason))" -ForegroundColor DarkGray
            $manifestRows.Add("$($ch.Id),$($sec.StableFile -replace '\.md$',''),,`"$($sk.Name)`",,,,,$timestamp,skipped-noncanonical,$($sk.Reason)")
        }
    }

    Write-Host ''
}

# ── Process labs ───────────────────────────────────────────────────────

Write-Host '── Labs ──' -ForegroundColor Cyan
Write-Host ''

$labPattern = '^lab-\d{2}-questions-(\d{4}-\d{2}-\d{2})\.md$'
$labAnswerPattern = 'answers'

foreach ($lab in $Labs) {
    $labDraftDir = Join-Path $LabsDraft $lab.Folder
    $labDestDir  = Join-Path $LabsDir $lab.Slug
    $destFile    = Join-Path $labDestDir 'index.md'
    $relDest     = $destFile.Replace($RepoRoot, '').TrimStart('\').Replace('\', '/')

    if (-not (Test-Path -LiteralPath $labDraftDir)) {
        Write-Host "  MISS $($lab.Id)  (folder not found: $($lab.Folder))" -ForegroundColor Yellow
        $manifestRows.Add("$($lab.Id),lab-questions,$labDraftDir,,,,,$timestamp,missing-source,lab folder not found")
        $totalMissing++
        continue
    }

    $files = Get-ChildItem -LiteralPath $labDraftDir -File -Filter '*.md' | Sort-Object Name
    $candidates = @()
    $answerFiles = @()
    $otherSkipped = @()

    foreach ($f in $files) {
        if ($f.Name -match $labAnswerPattern) {
            $answerFiles += $f.Name
            $manifestRows.Add("$($lab.Id),lab-answers,,$($f.Name),,,,,$timestamp,skipped-answer-file,")
            continue
        }
        if ($f.Name -match $labPattern) {
            $candidates += @{ File = $f; Date = $Matches[1] }
        } else {
            $otherSkipped += $f.Name
        }
    }

    if ($answerFiles.Count -gt 0) {
        Write-Host "  skip $($lab.Id) answer files: $($answerFiles.Count) skipped" -ForegroundColor DarkGray
    }

    if (@($candidates).Count -eq 0) {
        Write-Host "  MISS $($lab.Id)  (no canonical questions file)" -ForegroundColor Yellow
        $manifestRows.Add("$($lab.Id),lab-questions,$labDraftDir,,,,,$timestamp,missing-source,no canonical file")
        $totalMissing++
        continue
    }

    $sorted = @($candidates | Sort-Object { $_.Date } -Descending)
    $latest = $sorted[0]

    $sameDateCount = @($sorted | Where-Object { $_.Date -eq $latest.Date }).Count
    if ($sameDateCount -gt 1) {
        Write-Host "  CONFLICT $($lab.Id)  same-date: $($latest.Date)" -ForegroundColor Red
        $warnings.Add("Lab $($lab.Id): same-date conflict on $($latest.Date)")
        $manifestRows.Add("$($lab.Id),lab-questions,$labDraftDir,,$($latest.Date),,,,$timestamp,manual-review,same-date conflict")
        $totalConflicts++
        continue
    }

    $srcFile = $latest.File
    $hash = Get-FileHash256 -Path $srcFile.FullName
    Write-Host "  OK   $($lab.Id)  $($srcFile.Name)  ->  index.md  [$($latest.Date)]" -ForegroundColor Green

    if (-not $DryRun) {
        if (-not (Test-Path -LiteralPath $labDestDir)) {
            New-Item -ItemType Directory -Path $labDestDir -Force | Out-Null
        }
        Copy-Item -LiteralPath $srcFile.FullName -Destination $destFile -Force
    }

    $manifestRows.Add("$($lab.Id),lab-questions,$($srcFile.FullName),$($srcFile.Name),$($latest.Date),$hash,$relDest,$timestamp,imported,")
    $totalImported++
}

Write-Host ''

# ── Summary ────────────────────────────────────────────────────────────

Write-Host '── Summary ──' -ForegroundColor Cyan
Write-Host ''
Write-Host "  Imported:   $totalImported"
Write-Host "  Missing:    $totalMissing"
Write-Host "  Skipped:    $totalSkipped (non-canonical files)"
Write-Host "  Conflicts:  $totalConflicts (same-date, need manual review)"
Write-Host ''

if ($warnings.Count -gt 0) {
    Write-Host '── Warnings ──' -ForegroundColor Yellow
    foreach ($w in $warnings) {
        Write-Host "  ! $w" -ForegroundColor Yellow
    }
    Write-Host ''
}

# ── Write manifest ────────────────────────────────────────────────────

if ($DryRun) {
    Write-Host '── Manifest preview (first 20 rows) ──' -ForegroundColor Cyan
    $manifestRows | Select-Object -First 21 | ForEach-Object { Write-Host "  $_" }
    if ($manifestRows.Count -gt 21) {
        Write-Host "  ... ($($manifestRows.Count - 1) total rows)"
    }
    Write-Host ''
    Write-Host 'DRY RUN complete. No files were written.' -ForegroundColor Yellow
} else {
    $manifestPath = Join-Path $ManifestsDir 'source-import-manifest.csv'
    $manifestRows | Out-File -FilePath $manifestPath -Encoding utf8
    Write-Host "Manifest written: $manifestPath" -ForegroundColor Green
    Write-Host "Import complete. Review the manifest and commit." -ForegroundColor Green
}

Write-Host ''
