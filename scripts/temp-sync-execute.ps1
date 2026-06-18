param(
    [switch]$DryRun
)

$srcRoot = "G:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts"
$destRoot = "C:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\files\source\chapters"
$labSrcRoot = Join-Path $srcRoot "Labs-draft"
$sections = @("main", "lets-build", "reflection", "terms", "rat")
$now = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

# Chapters to sync: ch01, ch05, ch06, ch11
$syncPlan = @()

# --- Build sync plan ---
$chapters = @("ch01", "ch05", "ch06", "ch11")
foreach ($chPrefix in $chapters) {
    $srcFolder = Get-ChildItem $srcRoot -Directory | Where-Object Name -like "$chPrefix-*" | Select-Object -First 1
    $destFolder = Get-ChildItem $destRoot -Directory | Where-Object Name -like "$chPrefix-*" | Select-Object -First 1
    
    if (-not $srcFolder) { Write-Output "ERROR: No source for $chPrefix"; continue }
    
    $chNum = if ($srcFolder.Name -match '^(ch\d+)-') { $matches[1] } else { $chPrefix }
    $chSlug = $srcFolder.Name
    
    if (-not $destFolder) {
        $destFolder = New-Item -ItemType Directory -Path (Join-Path $destRoot $chSlug) -Force
        Write-Output "CREATED: $chSlug"
    }
    
    # Load manifest
    $manifest = $null
    $manifestPath = Join-Path $destFolder.FullName ".sync-manifest.json"
    if (Test-Path $manifestPath) {
        try { $manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json } catch {}
    }
    if (-not $manifest) {
        $manifest = @{ chapter = $chSlug; last_sync = $now; files = @{} }
    }
    
    $chPlan = @{ slug = $chSlug; num = $chNum; srcFolder = $srcFolder; destFolder = $destFolder; manifest = $manifest; actions = @(); indexRegen = $false }
    
    foreach ($section in $sections) {
        $srcSectionFolder = Join-Path $srcFolder.FullName $section
        $latestSrc = $null
        if (Test-Path $srcSectionFolder) {
            $latestSrc = Get-ChildItem $srcSectionFolder -File | Where-Object { $_.Name -match "^${chNum}-${section}-\d{4}-\d{2}-\d{2}\.md$" } | Sort-Object Name -Descending | Select-Object -First 1
        }
        
        if (-not $latestSrc) { continue }
        
        $srcDate = $latestSrc.Name -replace '.*-(\d{4}-\d{2}-\d{2})\.md$', '$1'
        
        # Find current dest file
        $destFiles = Get-ChildItem $destFolder.FullName -File | Where-Object { $_.Name -match "^${chNum}-${section}-\d{4}-\d{2}-\d{2}\.md$" } | Sort-Object Name -Descending
        $destFile = $destFiles | Select-Object -First 1
        
        $destDate = if ($destFile) { $destFile.Name -replace '.*-(\d{4}-\d{2}-\d{2})\.md$', '$1' } else { $null }
        $manEntry = if ($manifest.files.$section) { $manifest.files.$section } else { $null }
        
        $needsSync = $false
        if (-not $destFile) { $needsSync = $true }
        elseif ($srcDate -gt $destDate) { $needsSync = $true }
        
        if ($needsSync) {
            $chPlan.actions += @{
                type = "copy"
                section = $section
                srcPath = $latestSrc.FullName
                srcName = $latestSrc.Name
                srcDate = $srcDate
                destPath = Join-Path $destFolder.FullName $latestSrc.Name
                supersede = if ($destFile -and $destFile.Name -ne $latestSrc.Name) { $destFile.FullName } else { $null }
            }
            $chPlan.indexRegen = $true
        }
    }
    
    # Lab
    $chNumInt = [int]($chNum -replace 'ch', '')
    $labFolder = Get-ChildItem $labSrcRoot -Directory | Where-Object Name -like "lab-$chNumInt-*" | Select-Object -First 1
    if ($labFolder) {
        $labQ = Get-ChildItem $labFolder.FullName -File | Where-Object { $_.Name -match "^lab-$chNumInt-questions-\d{4}-\d{2}-\d{2}\.md$" } | Sort-Object Name -Descending | Select-Object -First 1
        if ($labQ) {
            $labSrcDate = $labQ.Name -replace '.*-(\d{4}-\d{2}-\d{2})\.md$', '$1'
            $labDest = Get-ChildItem $destFolder.FullName -File | Where-Object { $_.Name -match "^lab-$chNumInt-questions-\d{4}-\d{2}-\d{2}\.md$" } | Sort-Object Name -Descending | Select-Object -First 1
            $labDestDate = if ($labDest) { $labDest.Name -replace '.*-(\d{4}-\d{2}-\d{2})\.md$', '$1' } else { $null }
            
            $labNeedsSync = $false
            if (-not $labDest) { $labNeedsSync = $true }
            elseif ($labSrcDate -gt $labDestDate) { $labNeedsSync = $true }
            
            if ($labNeedsSync) {
                $chPlan.actions += @{
                    type = "copy"
                    section = "lab"
                    srcPath = $labQ.FullName
                    srcName = $labQ.Name
                    srcDate = $labSrcDate
                    destPath = Join-Path $destFolder.FullName $labQ.Name
                    supersede = if ($labDest -and $labDest.Name -ne $labQ.Name) { $labDest.FullName } else { $null }
                }
                $chPlan.indexRegen = $true
            }
        }
    }
    
    $syncPlan += $chPlan
}

# --- Report ---
Write-Output "========== SYNC PLAN =========="
$totalCopies = 0
$totalDeletes = 0
foreach ($ch in $syncPlan) {
    Write-Output ""
    Write-Output "--- $($ch.slug) ---"
    foreach ($a in $ch.actions) {
        $actionLabel = if ($a.supersede) { "COPY+DELETE" } else { "COPY" }
        Write-Output "  $actionLabel $($a.section): $($a.srcName)"
        $totalCopies++
        if ($a.supersede) { $totalDeletes++ }
    }
    if ($ch.indexRegen) { Write-Output "  REGEN index.md" }
    if ($ch.actions.Count -eq 0) { Write-Output "  (no changes)" }
}
Write-Output ""
Write-Output "Total: $totalCopies copies, $totalDeletes deletes, across $($syncPlan.Count) chapters"

if ($DryRun) {
    Write-Output ""
    Write-Output "DRY RUN -- no files modified."
    return
}

# --- Execute ---
Write-Output ""
Write-Output "========== EXECUTING =========="

foreach ($ch in $syncPlan) {
    if ($ch.actions.Count -eq 0) { continue }
    
    Write-Output ""
    Write-Output "--- $($ch.slug) ---"
    
    foreach ($a in $ch.actions) {
        # Copy
        Copy-Item $a.srcPath $a.destPath -Force
        Write-Output "  COPIED: $($a.srcName)"
        
        # Delete superseded
        if ($a.supersede) {
            Remove-Item $a.supersede -Force
            Write-Output "  DELETED: $(Split-Path $a.supersede -Leaf)"
        }
        
        # Update manifest
        $hash = (Get-FileHash $a.destPath -Algorithm SHA256).Hash
        $ch.manifest.files | Add-Member -Force -NotePropertyName $a.section -NotePropertyValue @{
            source = $a.srcPath
            source_date = $a.srcDate
            synced_at = $now
            hash = "sha256:$hash"
        }
    }
    
    # Regenerate index.md
    if ($ch.indexRegen) {
        $destDir = $ch.destFolder.FullName
        $mainFile = Get-ChildItem $destDir -File | Where-Object { $_.Name -match "^$($ch.num)-main-\d{4}-\d{2}-\d{2}\.md$" } | Sort-Object Name -Descending | Select-Object -First 1
        $lbFile = Get-ChildItem $destDir -File | Where-Object { $_.Name -match "^$($ch.num)-lets-build-\d{4}-\d{2}-\d{2}\.md$" } | Sort-Object Name -Descending | Select-Object -First 1
        $reflFile = Get-ChildItem $destDir -File | Where-Object { $_.Name -match "^$($ch.num)-reflection-\d{4}-\d{2}-\d{2}\.md$" } | Sort-Object Name -Descending | Select-Object -First 1
        $termsFile = Get-ChildItem $destDir -File | Where-Object { $_.Name -match "^$($ch.num)-terms-\d{4}-\d{2}-\d{2}\.md$" } | Sort-Object Name -Descending | Select-Object -First 1
        $ratFile = Get-ChildItem $destDir -File | Where-Object { $_.Name -match "^$($ch.num)-rat-\d{4}-\d{2}-\d{2}\.md$" } | Sort-Object Name -Descending | Select-Object -First 1
        $labQFile = Get-ChildItem $destDir -File | Where-Object { $_.Name -match "^lab-$($chNumInt)-questions-\d{4}-\d{2}-\d{2}\.md$" } | Sort-Object Name -Descending | Select-Object -First 1
        
        # Extract chapter title and description from main file
        $title = $ch.slug -replace '^ch\d+-', '' -replace '-', ' '
        $title = (Get-Culture).TextInfo.ToTitleCase($title)
        $chNumDisplay = [int]($ch.num -replace 'ch', '')
        $desc = ""
        if ($mainFile) {
            $mainContent = Get-Content $mainFile.FullName -Raw -Encoding UTF8
            # Get first substantive paragraph (skip YAML frontmatter, headings, metadata)
            if ($mainContent -match '---\s*\n.*?\n---\s*\n') {
                $mainContent = $mainContent -replace '---\s*\n.*?\n---\s*\n', ''
            }
            # Skip heading lines and blank lines
            $lines = $mainContent -split '\r?\n' | Where-Object { $_ -notmatch '^\s*#' -and $_ -notmatch '^\s*$' -and $_ -notmatch '^\s*<!--' -and $_ -notmatch '^\s*\*\*Chapter:' }
            $descCandidates = @()
            $charCount = 0
            foreach ($line in $lines) {
                $trimmed = $line.Trim()
                if ($trimmed.Length -gt 40) {
                    $descCandidates += $trimmed
                    $charCount += $trimmed.Length
                    if ($charCount -gt 400) { break }
                }
            }
            $desc = ($descCandidates -join ' ').Substring(0, [Math]::Min(500, ($descCandidates -join ' ').Length))
        }
        
        $indexContent = @"
# Chapter $($chNumDisplay): $title

$desc

## Chapter Files

"@
        if ($mainFile) { $indexContent += "- [Main Chapter]($($mainFile.Name))`n" }
        if ($lbFile) { $indexContent += "- [Let's Build]($($lbFile.Name))`n" }
        if ($reflFile) { $indexContent += "- [Review & Reflection]($($reflFile.Name))`n" }
        if ($termsFile) { $indexContent += "- [Terms Treasury]($($termsFile.Name))`n" }
        if ($ratFile) { $indexContent += "- [Readiness Assessment Test]($($ratFile.Name))`n" }
        
        if ($labQFile) {
            $indexContent += @"

## Lab

- [Lab $chNumDisplay Questions]($($labQFile.Name))
"@
        }
        
        $indexContent += @"

---
*Generated by chapter-sync on $(Get-Date -Format 'yyyy-MM-dd')*
"@
        $indexPath = Join-Path $destDir "index.md"
        [System.IO.File]::WriteAllText($indexPath, $indexContent, [System.Text.UTF8Encoding]::new($false))
        Write-Output "  REGEN: index.md"
    }
    
    # Write manifest
    $ch.manifest.last_sync = $now
    $manifestJson = $ch.manifest | ConvertTo-Json -Depth 5
    $manifestPath = Join-Path $ch.destFolder.FullName ".sync-manifest.json"
    [System.IO.File]::WriteAllText($manifestPath, $manifestJson, [System.Text.UTF8Encoding]::new($false))
    Write-Output "  WROTE: .sync-manifest.json"
}

Write-Output ""
Write-Output "========== SYNC COMPLETE =========="
