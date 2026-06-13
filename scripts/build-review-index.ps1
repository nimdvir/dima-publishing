param(
    [string]$SourceRoot = "books/database-book/files/source",

    [datetime]$BuildDate = (Get-Date)
)

$ErrorActionPreference = 'Stop'

$repoRoot = $PSScriptRoot | Split-Path -Parent
$sourceChapters = Join-Path $repoRoot $SourceRoot "chapters"
$outputPath = Join-Path $repoRoot "books" "database-book" "review-index.html"

$buildDateText = $BuildDate.ToString('yyyy-MM-dd')

Write-Host "Scanning for chapter reviews..." -ForegroundColor Cyan
Write-Host "Source: $sourceChapters" -ForegroundColor DarkGray

# ── Scan all chapter folders for review HTML files ──
$reviewEntries = New-Object System.Collections.Generic.List[pscustomobject]

$chapterDirs = Get-ChildItem -LiteralPath $sourceChapters -Directory |
    Where-Object { $_.Name -match '^ch\d{2}-' } |
    Sort-Object Name

foreach ($dir in $chapterDirs) {
    $chapterId = $dir.Name.Substring(0, 4)  # "ch01"
    $chapterNum = [int]$chapterId.Substring(2)

    # Find review HTML files
    $reviewFiles = Get-ChildItem -LiteralPath $dir.FullName -File -Filter "${chapterId}-review-*.html" |
        Sort-Object Name -Descending

    foreach ($reviewFile in $reviewFiles) {
        # Extract date from filename: chNN-review-YYYY-MM-DD.html
        $reviewDate = ""
        if ($reviewFile.BaseName -match '(\d{4}-\d{2}-\d{2})') {
            $reviewDate = $Matches[1]
        }

        # Try to get chapter title from core-concepts.md H1
        $chapterTitle = ""
        $coreConceptsPath = Join-Path $dir.FullName "core-concepts.md"
        if (Test-Path -LiteralPath $coreConceptsPath) {
            $firstLines = Get-Content -LiteralPath $coreConceptsPath -First 10 -Encoding UTF8
            foreach ($line in $firstLines) {
                if ($line -match '^#\s+(.+)') {
                    $chapterTitle = $Matches[1].Trim() -replace '<[^>]+>', ''
                    break
                }
            }
        }
        if ([string]::IsNullOrWhiteSpace($chapterTitle)) {
            $chapterTitle = $dir.Name -replace "^$chapterId-", '' -replace '-', ' '
            $chapterTitle = (Get-Culture).TextInfo.ToTitleCase($chapterTitle)
        }

        # Check for matching PDF
        $pdfBaseName = $reviewFile.BaseName  # chNN-review-YYYY-MM-DD
        $pdfPath = Join-Path $dir.FullName "${pdfBaseName}.pdf"
        $pdfRelativeLink = ""
        if (Test-Path -LiteralPath $pdfPath) {
            $pdfRelativeLink = "files/source/chapters/$($dir.Name)/${pdfBaseName}.pdf"
        }

        # Relative link from database-book/ to the review HTML
        $relativeLink = "files/source/chapters/$($dir.Name)/$($reviewFile.Name)"

        [void]$reviewEntries.Add([pscustomobject]@{
            ChapterNum  = $chapterNum
            ChapterId   = $chapterId
            ChapterName = $chapterTitle
            ReviewDate  = $reviewDate
            FileName    = $reviewFile.Name
            Link        = $relativeLink
            PdfLink     = $pdfRelativeLink
            FolderName  = $dir.Name
        })
    }
}

# ── Sort by chapter number, then by review date (newest first per chapter) ──
$sorted = $reviewEntries | Sort-Object ChapterNum, @{ Expression = 'ReviewDate'; Descending = $true }

# ── Count total reviews and chapters covered ──
$totalReviews = $sorted.Count
$uniqueChapters = ($sorted | Select-Object -ExpandProperty ChapterNum -Unique).Count

Write-Host "Found $totalReviews review(s) across $uniqueChapters chapter(s)" -ForegroundColor Green

# ── Build table rows ──
$tableRows = ""
$prevChapter = -1
foreach ($entry in $sorted) {
    $isLatest = ($entry.ChapterNum -ne $prevChapter)
    $prevChapter = $entry.ChapterNum

    $latestBadge = ""
    if ($isLatest -and $totalReviews -gt 1) {
        $latestBadge = ' <span class="latest-badge">latest</span>'
    }

    $chapterLabel = "$($entry.ChapterId): $($entry.ChapterName)"

    $pdfCell = ""
    if ($entry.PdfLink) {
        $pdfCell = '<td class="td-link"><a href="{0}">PDF &darr;</a></td>' -f $entry.PdfLink
    } else {
        $pdfCell = '<td class="td-link td-na">&mdash;</td>'
    }

    $tableRows += @"

      <tr>
        <td class="td-num">$($entry.ChapterNum)</td>
        <td class="td-name">$chapterLabel$latestBadge</td>
        <td class="td-date">$($entry.ReviewDate)</td>
        <td class="td-link"><a href="$($entry.Link)">HTML &rarr;</a></td>
        $pdfCell
      </tr>
"@
}

# ── CSS relative path from database-book/ to styles.css ──
$cssRelativePath = "platform-pilots/reader-hybrid-v1.1/src/styles.css"

$htmlDoc = @"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BITM330 — Chapter Review Index</title>
<!-- Generated: $buildDateText -->
<link rel="stylesheet" href="$cssRelativePath">
<style>
  /* ── Index page layout ── */
  .index-body {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 1.5rem 4rem;
  }
  .index-header {
    border-bottom: 3px solid var(--color-primary, #4f46e5);
    margin-bottom: 2rem;
    padding-bottom: 1rem;
  }
  .index-header h1 {
    font-family: var(--font-serif, Georgia, serif);
    font-size: 1.75rem;
    margin: 0 0 0.35rem;
    color: var(--color-heading, #1a2433);
  }
  .index-header .subtitle {
    color: var(--color-text-muted, #71717a);
    font-size: 0.95rem;
  }
  .index-meta {
    color: var(--color-text-muted, #71717a);
    font-size: 0.85rem;
    margin-bottom: 2rem;
  }
  /* ── Review table ── */
  .review-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }
  .review-table th {
    text-align: left;
    padding: 0.6rem 0.75rem;
    border-bottom: 2px solid var(--color-border, #e4e4e7);
    color: var(--color-text-muted, #71717a);
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .review-table td {
    padding: 0.75rem;
    border-bottom: 1px solid var(--color-border, #e4e4e7);
    vertical-align: middle;
  }
  .review-table tr:hover td {
    background: var(--color-surface-muted, #f1f5f9);
  }
  .td-num {
    width: 3rem;
    font-weight: 700;
    color: var(--color-primary, #4f46e5);
  }
  .td-name { font-weight: 600; }
  .td-date {
    width: 7rem;
    color: var(--color-text-muted, #71717a);
    font-size: 0.85rem;
    white-space: nowrap;
  }
  .td-link { width: 6rem; text-align: right; }
  .td-link a {
    color: var(--color-link, #4f46e5);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.85rem;
  }
  .td-link a:hover { text-decoration: underline; }
  .td-na {
    color: var(--color-text-muted, #71717a);
    font-size: 0.8rem;
  }
  /* ── Latest badge ── */
  .latest-badge {
    display: inline-block;
    font-size: 0.65rem;
    background: var(--color-accent-soft, #eef2ff);
    color: var(--color-accent-dark, #8e7b55);
    padding: 0.1rem 0.45rem;
    border-radius: 999px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-left: 0.4rem;
    vertical-align: middle;
  }
  /* ── Empty state ── */
  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
    color: var(--color-text-muted, #71717a);
  }
  .empty-state .icon {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
  }
  .empty-state p { margin: 0.25rem 0; }
  /* ── Footer ── */
  .index-footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border, #e4e4e7);
    color: var(--color-text-muted, #71717a);
    font-size: 0.8rem;
  }
  /* ── Print ── */
  @media print {
    .td-link a::after { content: " (" attr(href) ")"; font-size: 0.75rem; }
  }
</style>
</head>
<body>
<div class="index-body">
  <header class="index-header">
    <h1>&#x1F4DA; BITM330 Chapter Review Index</h1>
    <p class="subtitle"><em>Using Data to Drive Business Performance</em> &mdash; Self-contained HTML chapter reviews for offline reading and print.</p>
  </header>

  <p class="index-meta">
    <strong>Generated:</strong> $buildDateText &middot;
    <strong>Reviews:</strong> $totalReviews &middot;
    <strong>Chapters covered:</strong> $uniqueChapters
  </p>

  $(if ($totalReviews -eq 0) { @"

  <div class="empty-state">
    <div class="icon">&#x1F4AD;</div>
    <p><strong>No chapter reviews built yet.</strong></p>
    <p>Run <code>pwsh -File scripts/build-chapter-html.ps1 -ChapterNumber 1</code> to build the first one.</p>
  </div>

"@ } else { @"

  <table class="review-table">
    <thead>
      <tr>
        <th>#</th>
        <th>Chapter</th>
        <th>Review Date</th>
        <th>HTML</th>
        <th>PDF</th>
      </tr>
    </thead>
    <tbody>
$tableRows
    </tbody>
  </table>

"@ })

  <footer class="index-footer">
    <p>
      Open any review in a browser for a complete chapter view with all sections, images, and callouts.
      Use <strong>Ctrl+P</strong> to print or save as PDF with page breaks between sections.
    </p>
    <p>Style: <code>reader-hybrid-v1.1</code> &middot; Build tool: Pandoc</p>
  </footer>
</div>
</body>
</html>
"@

Set-Content -LiteralPath $outputPath -Value $htmlDoc -Encoding utf8

Write-Host ""
Write-Host "Index built: $outputPath" -ForegroundColor Green
Write-Host "$totalReviews review(s) listed across $uniqueChapters chapter(s)" -ForegroundColor Green

return $outputPath
