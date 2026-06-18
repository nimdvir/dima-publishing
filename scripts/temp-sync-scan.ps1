param($SrcRoot, $DestRoot, $LabSrcRoot)

$chapters = @("ch01", "ch02", "ch03", "ch05", "ch06", "ch09", "ch11")
$sections = @("main", "lets-build", "reflection", "terms", "rat")

function Get-LatestCanonicalFile($folder, $chNum, $section) {
    if (-not (Test-Path $folder)) { return $null }
    $files = Get-ChildItem $folder -File | Where-Object { $_.Name -match "^${chNum}-${section}-\d{4}-\d{2}-\d{2}\.md$" } | Sort-Object Name -Descending
    return $files | Select-Object -First 1
}

foreach ($chPrefix in $chapters) {
    $srcFolder = Get-ChildItem $SrcRoot -Directory | Where-Object Name -like "$chPrefix-*" | Select-Object -First 1
    $destFolder = Get-ChildItem $DestRoot -Directory | Where-Object Name -like "$chPrefix-*" | Select-Object -First 1
    
    if (-not $srcFolder) { Write-Output "=== $chPrefix : NO SOURCE FOLDER ==="; continue }
    
    $chNum = if ($srcFolder.Name -match '^(ch\d+)-') { $matches[1] } else { $chPrefix }
    $chSlug = $srcFolder.Name
    
    Write-Output "=== $chSlug ==="
    
    # Check manifest
    $manifest = $null
    if ($destFolder) {
        $manifestPath = Join-Path $destFolder.FullName ".sync-manifest.json"
        if (Test-Path $manifestPath) {
            try { $manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json } catch {}
        }
    }
    
    $anyChange = $false
    
    foreach ($section in $sections) {
        $srcSectionFolder = Join-Path $srcFolder.FullName $section
        $latestSrc = Get-LatestCanonicalFile $srcSectionFolder $chNum $section
        
        $srcDate = if ($latestSrc) { $latestSrc.Name -replace '.*-(\d{4}-\d{2}-\d{2})\.md$', '$1' } else { "NONE" }
        
        $destFile = if ($destFolder) { 
            Get-ChildItem $destFolder.FullName -File | Where-Object { $_.Name -match "^${chNum}-${section}-\d{4}-\d{2}-\d{2}\.md$" } | Sort-Object Name -Descending | Select-Object -First 1
        } else { $null }
        $destDate = if ($destFile) { $destFile.Name -replace '.*-(\d{4}-\d{2}-\d{2})\.md$', '$1' } else { "NONE" }
        
        $status = "?"
        if ($srcDate -eq "NONE") { $status = "NO_SOURCE" }
        elseif ($destDate -eq "NONE") { $status = "NEW" }
        elseif ($srcDate -gt $destDate) { $status = "NEEDS_SYNC"; $anyChange = $true }
        elseif ($srcDate -eq $destDate) { $status = "CURRENT" }
        else { $status = "DEST_NEWER?" }
        
        $srcName = if ($latestSrc) { $latestSrc.Name } else { "-" }
        $destName = if ($destFile) { $destFile.Name } else { "-" }
        
        Write-Output ("  {0,-14} src={1,-12} dest={2,-12} {3,-14} | {4}" -f $section, $srcDate, $destDate, $status, $srcName)
    }
    
    # Lab
    $chNumInt = [int]($chNum -replace 'ch', '')
    $labFolder = Get-ChildItem $LabSrcRoot -Directory | Where-Object Name -like "lab-$chNumInt-*" | Select-Object -First 1
    if (-not $labFolder) {
        $summerDir = Join-Path $LabSrcRoot "labs-summer"
        if (Test-Path $summerDir) {
            $labFolder = Get-ChildItem $summerDir -Directory | Where-Object { $_.Name -like "lab-0$chNumInt-*" -or $_.Name -like "lab-$chNumInt-*" } | Select-Object -First 1
        }
    }
    
    if ($labFolder) {
        $labQuestions = Get-ChildItem $labFolder.FullName -File | Where-Object { $_.Name -match "questions.*\d{4}-\d{2}-\d{2}\.md$" -and $_.Name -notmatch "answers" } | Sort-Object Name -Descending | Select-Object -First 1
        if ($labQuestions) {
            $labSrcDate = $labQuestions.Name -replace '.*-(\d{4}-\d{2}-\d{2})\.md$', '$1'
            $labDest = if ($destFolder) { Get-ChildItem $destFolder.FullName -File | Where-Object { $_.Name -match "lab-.*questions.*\d{4}-\d{2}-\d{2}\.md$" } | Sort-Object Name -Descending | Select-Object -First 1 } else { $null }
            $labDestDate = if ($labDest) { $labDest.Name -replace '.*-(\d{4}-\d{2}-\d{2})\.md$', '$1' } else { "NONE" }
            $labStatus = if ($labDestDate -eq "NONE") { "NEW" } elseif ($labSrcDate -gt $labDestDate) { "NEEDS_SYNC"; $anyChange = $true } else { "CURRENT" }
            Write-Output ("  {0,-14} src={1,-12} dest={2,-12} {3,-14} | {4}" -f "lab(q)", $labSrcDate, $labDestDate, $labStatus, $labQuestions.Name)
        } else { Write-Output "  lab(q)          NO QUESTIONS FILE FOUND IN $($labFolder.Name)" }
    } else { Write-Output "  lab(q)          NO LAB FOLDER FOR $chNumInt" }
    
    if ($anyChange) { Write-Output "  >> HAS PENDING CHANGES" }
    Write-Output ""
}
