$now = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$destRoot = "C:\Users\nd115232\Documents\GitHub\dima-publishing\books\database-book\files\source\chapters"

# ch01 lab manifest
$m1Path = Join-Path $destRoot "ch01-introduction-to-course\.sync-manifest.json"
$m1 = Get-Content $m1Path -Raw | ConvertFrom-Json
$h1 = (Get-FileHash (Join-Path $destRoot "ch01-introduction-to-course\lab-01-questions-2026-06-03.md") -Algorithm SHA256).Hash
$m1.files | Add-Member -Force -NotePropertyName "lab" -NotePropertyValue @{source="lab-01-questions-2026-06-03.md";source_date="2026-06-03";synced_at=$now;hash="sha256:$h1"}
$m1.last_sync = $now
[System.IO.File]::WriteAllText($m1Path, ($m1 | ConvertTo-Json -Depth 5), [System.Text.UTF8Encoding]::new($false))
Write-Output "done ch01 manifest"

# ch05 lab manifest
$m5Path = Join-Path $destRoot "ch05-sql\.sync-manifest.json"
$m5 = Get-Content $m5Path -Raw | ConvertFrom-Json
$h5 = (Get-FileHash (Join-Path $destRoot "ch05-sql\lab-05-questions-2026-06-16.md") -Algorithm SHA256).Hash
$m5.files | Add-Member -Force -NotePropertyName "lab" -NotePropertyValue @{source="lab-05-questions-2026-06-16.md";source_date="2026-06-16";synced_at=$now;hash="sha256:$h5"}
$m5.last_sync = $now
[System.IO.File]::WriteAllText($m5Path, ($m5 | ConvertTo-Json -Depth 5), [System.Text.UTF8Encoding]::new($false))
Write-Output "done ch05 manifest"
