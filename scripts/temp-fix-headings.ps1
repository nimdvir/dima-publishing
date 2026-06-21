$files = @(
    "g:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\ch03-what-is-data\main\ch03-main-2026-06-21.md",
    "g:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\ch06-relational-model\main\ch06-main-2026-06-19.md",
    "g:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\ch08-midterm-review\main\ch08-main-2026-06-19.md",
    "g:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\ch11-database-administration\main\ch11-main-2026-06-19.md",
    "g:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\ch12-business-intelligence\main\ch12-main-2026-06-19.md",
    "g:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts\ch13-advanced-database-techniques\main\ch13-main-2026-06-19.md"
)

foreach ($f in $files) {
    $bak = "$f.bak-2026-06-21"
    Copy-Item $f $bak -Force
    $lines = Get-Content $f
    $fixed = @()
    $foundTitle = $false
    foreach ($line in $lines) {
        if ($line -match '^# Chapter \d+:' -and !$foundTitle) {
            $fixed += $line
            $foundTitle = $true
        }
        elseif ($line -match '^# Core Concepts') {
            $fixed += ("##" + $line.Substring(1))
        }
        elseif ($line -match '^# ') {
            $fixed += ("##" + $line.Substring(1))
        }
        else {
            $fixed += $line
        }
    }
    $fixed | Set-Content $f -Encoding UTF8
    Write-Host "Fixed: $(Split-Path $f -Leaf)"
}
Write-Host "DONE - headings fixed in 6 files. Backups at .bak-2026-06-21"
