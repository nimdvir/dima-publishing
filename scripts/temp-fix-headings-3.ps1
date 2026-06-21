$repo = "g:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts"

# Fix remaining chapters with mixed H1 headings: ch01, ch04, ch05, ch09, ch10, ch15, ch16, ch17
$fixFiles = @(
    "$repo\ch01-introduction-to-course\main\ch01-main-2026-06-19.md",
    "$repo\ch04-databases\main\ch04-main-2026-06-19.md",
    "$repo\ch05-sql\main\ch05-main-2026-06-19.md",
    "$repo\ch09-database-design\main\ch09-main-2026-06-20.md",
    "$repo\ch10-advanced-sql-queries\main\ch10-main-2026-06-19.md",
    "$repo\ch15-business-strategy-is\main\ch15-main-2026-06-19.md",
    "$repo\ch16-final-review\main\ch16-main-2026-06-19.md",
    "$repo\ch17-conclusion\main\ch17-main-2026-06-19.md"
)

foreach ($f in $fixFiles) {
    $bak = "$f.bak-h-2026-06-21"
    Copy-Item $f $bak -Force
    $lines = Get-Content $f
    $fixed = @()
    $foundTitle = $false
    foreach ($line in $lines) {
        if ($line -match '^# (Chapter|Lab) \d+' -and !$foundTitle) {
            $fixed += $line
            $foundTitle = $true
        }
        elseif ($line -match '^# Designing Systems That Matter' -and !$foundTitle) {
            # ch17 title variant
            $fixed += $line
            $foundTitle = $true
        }
        elseif ($line -match '^# ') {
            $fixed += ("##" + $line.Substring(1))
        }
        else {
            $fixed += $line
        }
    }
    $fixed | Set-Content $f -Encoding UTF8
    Write-Host "Fixed headings: $(Split-Path $f -Leaf)"
}
Write-Host "DONE - all 8 files fixed"
