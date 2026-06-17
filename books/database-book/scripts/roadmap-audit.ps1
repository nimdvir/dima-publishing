$root = "c:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\files\source\chapters"
$chapters = Get-ChildItem -Path $root -Directory | Where-Object { $_.Name -match '^ch\d{2}-' } | Sort-Object Name

foreach ($ch in $chapters) {
    # main file: core-concepts.md or latest dated chNN-main-*.md
    $main = Join-Path $ch.FullName 'core-concepts.md'
    if (-not (Test-Path $main)) {
        $dated = Get-ChildItem -Path $ch.FullName -Filter 'ch*-main-*.md' | Sort-Object Name -Descending | Select-Object -First 1
        if ($dated) { $main = $dated.FullName }
    }
    $index = Join-Path $ch.FullName 'index.md'

    $mainContent = if (Test-Path $main) { Get-Content $main -Raw } else { '' }
    $indexExists = Test-Path $index
    $indexContent = if ($indexExists) { Get-Content $index -Raw } else { '' }

    $mainRoadmaps = ([regex]::Matches($mainContent, '(?m)^##\s+Chapter Roadmap\s*$')).Count
    $indexRoadmaps = ([regex]::Matches($indexContent, '(?m)^##\s+Chapter Roadmap\s*$')).Count
    $mainLinked = if ($mainContent -match '\[[^\]]+\]\(#') { 'yes' } else { 'no' }

    # H2 headings in main, excluding boilerplate
    $h2 = [regex]::Matches($mainContent, '(?m)^##\s+(.+?)\s*$') | ForEach-Object { $_.Groups[1].Value.Trim() } |
        Where-Object { $_ -notmatch '^(Chapter Roadmap|Core Concepts|Chapter Files)$' }

    Write-Output ("=== {0} ===" -f $ch.Name)
    Write-Output ("  mainFile: {0}" -f (Split-Path $main -Leaf))
    Write-Output ("  roadmaps in main: {0} | linked: {1}" -f $mainRoadmaps, $mainLinked)
    Write-Output ("  index.md exists: {0} | roadmaps in index: {1}" -f $indexExists, $indexRoadmaps)
    Write-Output ("  content H2 count: {0}" -f $h2.Count)
    foreach ($h in $h2) { Write-Output ("    - {0}" -f $h) }
}
