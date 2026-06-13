$dst = 'C:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\files\source'

# Check 1: No YAML frontmatter
$yamlCount = 0
Get-ChildItem -Path $dst -Recurse -Filter '*.md' | ForEach-Object {
    $firstLine = Get-Content -LiteralPath $_.FullName -TotalCount 1
    if ($firstLine -is [string] -and $firstLine.Trim() -eq '---') { $yamlCount++; Write-Host "FAIL: $($_.FullName)" }
}
if ($yamlCount -eq 0) { Write-Host "PASS: No YAML frontmatter remains" } else { Write-Host "FAIL: $yamlCount files still have YAML" }

# Check 2: Metadata comments present
$noCommentCount = 0
Get-ChildItem -Path $dst -Recurse -Filter '*.md' | ForEach-Object {
    if ($_.Name -eq 'index.md' -and $_.Directory.Name -match '^lab-') { return }
    $firstLine = Get-Content -LiteralPath $_.FullName -TotalCount 1
    if (-not ($firstLine -match '^<!-- metadata:')) { $noCommentCount++; Write-Host "MISS: $($_.FullName)" }
}
if ($noCommentCount -eq 0) { Write-Host "PASS: All files have metadata comment" } else { Write-Host "WARN: $noCommentCount files missing metadata comment" }

# Check 3: Answer files only in instructor/
$badAnswers = Get-ChildItem -Path $dst -Recurse -Filter '*-answers-*.md' | Where-Object { $_.FullName -notmatch '\\instructor\\' }
if ($badAnswers) { Write-Host "FAIL: Answer files outside instructor/" } else { Write-Host "PASS: All answer files under instructor/ only" }

# Check 4: No unwanted artifacts
$unwanted = Get-ChildItem -Path $dst -Recurse -Include 'desktop.ini','*.crdownload' -ErrorAction SilentlyContinue
if ($unwanted) { Write-Host "WARN: Unwanted files found" } else { Write-Host "PASS: No unwanted artifacts" }

# Check 5: Chapter file counts
foreach ($ch in @('ch09-database-design','ch10-advanced-sql-queries','ch11-database-administration','ch12-business-intelligence')) {
    $d = Join-Path $dst 'chapters' $ch
    $present = @('core-concepts.md','lets-build.md','review-questions.md','terms-treasury.md','rat.md') | Where-Object { Test-Path (Join-Path $d $_) }
    $total = (Get-ChildItem -LiteralPath $d -Recurse -File).Count
    Write-Host "CHK  $ch : $($present.Count)/5 stable | $total total files"
}

# Check 6: Labs
foreach ($lab in @('lab-09-advanced-sql','lab-10-database-design','lab-11-database-admin','lab-12-business-intelligence')) {
    $d = Join-Path $dst 'labs' $lab
    $hasQ = (Get-ChildItem -LiteralPath $d -Filter '*-questions-2026-05-22.md' -ErrorAction SilentlyContinue).Count -gt 0
    $hasA = (Get-ChildItem -LiteralPath (Join-Path $d 'instructor') -Filter '*-answers-2026-05-22.md' -ErrorAction SilentlyContinue).Count -gt 0
    Write-Host "CHK  $lab : questions=$hasQ answers=$hasA"
}

Write-Host "`n=== Verification complete ==="
