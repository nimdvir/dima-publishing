$repo = "g:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts"

# ---- 1. Fix duplicate Core Concepts (keep only first occurrence, remove extra H1/H2 Core Concepts lines) ----
$dupFiles = @(
    "$repo\ch01-introduction-to-course\main\ch01-main-2026-06-19.md",
    "$repo\ch04-databases\main\ch04-main-2026-06-19.md",
    "$repo\ch05-sql\main\ch05-main-2026-06-19.md",
    "$repo\ch09-database-design\main\ch09-main-2026-06-20.md",
    "$repo\ch10-advanced-sql-queries\main\ch10-main-2026-06-19.md"
)

foreach ($f in $dupFiles) {
    $bak = "$f.bak-cc-2026-06-21"
    Copy-Item $f $bak -Force
    $lines = Get-Content $f
    $fixed = @()
    $foundCC = $false
    foreach ($line in $lines) {
        if ($line -match '^#+ Core Concepts') {
            if (!$foundCC) {
                # First occurrence: keep but ensure it's H2
                $fixed += "## Core Concepts"
                $foundCC = $true
            }
            # Skip subsequent occurrences
        }
        else {
            $fixed += $line
        }
    }
    $fixed | Set-Content $f -Encoding UTF8
    Write-Host "Fixed CC: $(Split-Path $f -Leaf)"
}

# ---- 2. Fix ch07 Looking Ahead reference (Chapter 9 → Chapter 10 for Advanced SQL) ----
$ch07 = "$repo\ch07-normalization\main\ch07-main-2026-06-19.md"
$bak7 = "$ch07.bak-la-2026-06-21"
Copy-Item $ch07 $bak7 -Force
$txt = Get-Content $ch07 -Raw
$txt = $txt -replace 'Chapter 9 then returns to SQL', 'Chapter 10 then returns to SQL'
$txt = $txt -replace 'Chapter 9 deepens', 'Chapter 10 deepens'
$txt | Set-Content $ch07 -Encoding UTF8 -NoNewline
Write-Host "Fixed ch07 Looking Ahead references"

# ---- 3. Fix ch15 image folder path (Ch14 → Ch15) ----
$ch15 = "$repo\ch15-business-strategy-is\main\ch15-main-2026-06-19.md"
$bak15 = "$ch15.bak-img-2026-06-21"
Copy-Item $ch15 $bak15 -Force
$txt15 = Get-Content $ch15 -Raw
$txt15 = $txt15 -replace 'Ch14%20Business%20Strategy%20and%20IS', 'Ch15%20Business%20Strategy%20and%20IS'
$txt15 = $txt15 -replace 'Ch14 Business Strategy and IS', 'Ch15 Business Strategy and IS'
$txt15 | Set-Content $ch15 -Encoding UTF8 -NoNewline
Write-Host "Fixed ch15 image path references"

Write-Host "ALL DONE"
