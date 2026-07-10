param(
  [string]$ChatsDir = "books/database-book/chats",
  [string]$OutputFile = "books/database-book/chats/CHAT-INDEX.md"
)

$root = Get-Location
$chatPath = Join-Path $root $ChatsDir
$outPath = Join-Path $root $OutputFile

if (-not (Test-Path $chatPath)) {
  Write-Error "Chats directory not found: $chatPath"
  exit 1
}

$items = Get-ChildItem -Path $chatPath -File -Filter "*.md" |
  Where-Object { $_.Name -ne "CHAT-INDEX.md" } |
  ForEach-Object {
    $name = $_.BaseName
    $m = [regex]::Match($name, '^(?<date>\d{4}-\d{2}-\d{2})-(?<source>[^-]+)-(?<topic>.+)$')
    if ($m.Success) {
      [pscustomobject]@{
        Date = [datetime]::ParseExact($m.Groups['date'].Value, 'yyyy-MM-dd', $null)
        DateText = $m.Groups['date'].Value
        YearMonth = $m.Groups['date'].Value.Substring(0,7)
        Source = $m.Groups['source'].Value
        Topic = ($m.Groups['topic'].Value -replace '-', ' ')
        FileName = $_.Name
      }
    }
    else {
      [pscustomobject]@{
        Date = $_.LastWriteTime
        DateText = $_.LastWriteTime.ToString('yyyy-MM-dd')
        YearMonth = $_.LastWriteTime.ToString('yyyy-MM')
        Source = "other"
        Topic = $_.BaseName
        FileName = $_.Name
      }
    }
  } |
  Sort-Object Date -Descending

$lines = @()
$lines += "# Chat Index"
$lines += ""
$lines += "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$lines += ""
$lines += "## Summary"
$lines += ""
$lines += "- Total chats: $($items.Count)"
$lines += ""

foreach ($ymGroup in ($items | Group-Object YearMonth | Sort-Object Name -Descending)) {
  $lines += "## $($ymGroup.Name)"
  $lines += ""

  foreach ($srcGroup in ($ymGroup.Group | Group-Object Source | Sort-Object Name)) {
    $lines += "### Source: $($srcGroup.Name)"
    $lines += ""
    $lines += "| Date | Topic | File |"
    $lines += "|------|-------|------|"

    foreach ($entry in ($srcGroup.Group | Sort-Object Date -Descending)) {
      $escapedTopic = $entry.Topic.Replace('|','\\|')
      $file = $entry.FileName
      $lines += "| $($entry.DateText) | $escapedTopic | [$file]($file) |"
    }

    $lines += ""
  }
}

$lines -join "`r`n" | Set-Content -Path $outPath -Encoding UTF8
Write-Output "Wrote chat index: $outPath"
