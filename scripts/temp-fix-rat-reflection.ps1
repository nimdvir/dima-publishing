# Fix RAT and Reflection heading formatting for all chapters
# Creates new dated files (2026-06-21) with standard heading hierarchy
param(
    [switch]$DryRun,
    [switch]$WhatIf
)

$ErrorActionPreference = "Stop"
$today = "2026-06-21"
$baseDir = "g:\My Drive\0-Projects\!-important\BITM330-book-drive\BITM330-Book-draft\chapter-drafts"

# Chapter info: folder name, chapter number, short title (for H1)
$chapters = @(
    @{Folder="ch01-introduction-to-course"; Num="01"; Title="Introduction to the Textbook"},
    @{Folder="ch02-mis-and-bitm"; Num="02"; Title="Foundations of Information Systems"},
    @{Folder="ch03-what-is-data"; Num="03"; Title="Understanding Data Fundamentals"},
    @{Folder="ch04-databases"; Num="04"; Title="Introduction to Databases"},
    @{Folder="ch05-sql"; Num="05"; Title="SQL — The Language of Databases"},
    @{Folder="ch06-relational-model"; Num="06"; Title="The Relational Model"},
    @{Folder="ch07-normalization"; Num="07"; Title="Data Normalization"},
    @{Folder="ch08-midterm-review"; Num="08"; Title="Midterm Review — Concepts"},
    @{Folder="ch09-database-design"; Num="09"; Title="Database Design and ER Modeling"},
    @{Folder="ch10-advanced-sql-queries"; Num="10"; Title="Advanced SQL for Business Analysis"},
    @{Folder="ch11-database-administration"; Num="11"; Title="Database Administration"},
    @{Folder="ch12-business-intelligence"; Num="12"; Title="Business Intelligence and Analytics"},
    @{Folder="ch13-advanced-database-techniques"; Num="13"; Title="Advanced Database Techniques"},
    @{Folder="ch14-powerbi"; Num="14"; Title="Power BI — Data Visualization and Business Reporting"},
    @{Folder="ch15-business-strategy-is"; Num="15"; Title="Business Strategy and Information Systems"},
    @{Folder="ch16-final-review"; Num="16"; Title="Final Integration"},
    @{Folder="ch17-conclusion"; Num="17"; Title="Designing Systems That Matter"}
)

# Bloom/question type headings we expect
$questionTypes = @("Remember", "Understand", "Apply", "Analyze", "Evaluate")

function Fix-RatFile {
    param($sourcePath, $destPath, $chapterTitle)
    
    Write-Host "  Processing RAT: $sourcePath" -ForegroundColor Cyan
    
    if (-not (Test-Path $sourcePath)) {
        Write-Host "    SKIPPED: source not found" -ForegroundColor Yellow
        return
    }
    
    $content = Get-Content $sourcePath -Raw
    
    # ---- STEP 1: Ensure correct H1 title ----
    # Replace any existing H1 with the standard format
    $content = $content -replace '^# .*$', "# Readiness Assessment Test (RAT): $chapterTitle"
    
    # ---- STEP 2: Add ## Questions if missing ----
    # Insert ## Questions after the first image/icon block (after </p> or after the icon line)
    if ($content -notmatch '## Questions') {
        # Insert after the closing </p> of the icon, or after frontmatter
        if ($content -match '(?m)^<p align="center">\s*$') {
            $content = $content -replace '(<p align="center">\s*\n\s*</p>\s*\n)', ('$1' + "`n## Questions`n")
        }
        elseif ($content -match '(?m)^!\[RAT\]') {
            $content = $content -replace '(!\[RAT\].*\n)', ('$1' + "`n## Questions`n")
        }
        else {
            # Insert after first non-title line (after the H1)
            $content = $content -replace "(# Readiness Assessment Test \(RAT\): .+?\n)", ('$1' + "`n## Questions`n")
        }
    }
    
    # ---- STEP 3: Fix design note headings ----
    # Demote # Assessment Design Notes -> **Assessment Design Notes**
    $content = $content -replace '(?m)^# (Assessment Design Notes)$', '**$1**'
    # Demote ## Assessment Design Notes -> **Assessment Design Notes**  
    $content = $content -replace '(?m)^## (Assessment Design Notes)$', '**$1**'
    # Demote ## Bloom Distribution -> **Bloom Distribution**
    $content = $content -replace '(?m)^## (Bloom Distribution)$', '**$1**'
    # Demote ## Design Criterion Coverage -> **Design Criterion Coverage**
    $content = $content -replace '(?m)^## (Design Criterion Coverage)$', '**$1**'
    # Demote ## AI-Resistance Strategies Used -> **AI-Resistance Strategies Used**
    $content = $content -replace '(?m)^## (AI-Resistance Strategies Used)$', '**$1**'
    # Demote ## Question Distribution Summary -> **Question Distribution Summary**
    $content = $content -replace '(?m)^## (Question Distribution Summary)$', '**$1**'
    # Demote # Question Distribution Summary -> **Question Distribution Summary**
    $content = $content -replace '(?m)^# (Question Distribution Summary)$', '**$1**'
    # Demote ## Table \d: ... -> **Table N: ...**
    $content = $content -replace '(?m)^## (Table \d+: .+)$', '**$1**'
    
    # Keep ### under design notes as-is (they're fine)
    
    # ---- STEP 4: Fix question type headings BEFORE Answer Key ----
    # Only fix headings before the Answer Key section
    $akIndex = [regex]::Match($content, '(?m)^#{1,2} Answer Key').Index
    if ($akIndex -gt 0) {
        $beforeAK = $content.Substring(0, $akIndex)
        $afterAK = $content.Substring($akIndex)
        
        # Fix question type headings in beforeAK section
        # ## Remember -> ### Remember Questions
        $beforeAK = $beforeAK -replace '(?m)^## (Remember)$', '### $1 Questions'
        $beforeAK = $beforeAK -replace '(?m)^## (Understand)$', '### $1 Questions'
        $beforeAK = $beforeAK -replace '(?m)^## (Apply)$', '### $1 Questions'
        $beforeAK = $beforeAK -replace '(?m)^## (Analyze)$', '### $1 Questions'
        $beforeAK = $beforeAK -replace '(?m)^## (Evaluate)$', '### $1 Questions'
        # # Remember -> ### Remember Questions (H1 demote)
        $beforeAK = $beforeAK -replace '(?m)^# (Remember Questions)$', '### $1'
        $beforeAK = $beforeAK -replace '(?m)^# (Understand Questions)$', '### $1'
        $beforeAK = $beforeAK -replace '(?m)^# (Apply Questions)$', '### $1'
        $beforeAK = $beforeAK -replace '(?m)^# (Analyze Questions)$', '### $1'
        $beforeAK = $beforeAK -replace '(?m)^# (Evaluate Questions)$', '### $1'
        # ## Remember Questions -> ### Remember Questions
        $beforeAK = $beforeAK -replace '(?m)^## (Remember Questions)$', '### $1'
        $beforeAK = $beforeAK -replace '(?m)^## (Understand Questions)$', '### $1'
        $beforeAK = $beforeAK -replace '(?m)^## (Apply Questions)$', '### $1'
        $beforeAK = $beforeAK -replace '(?m)^## (Analyze Questions)$', '### $1'
        $beforeAK = $beforeAK -replace '(?m)^## (Evaluate Questions)$', '### $1'
        # # Remember -> ### Remember Questions (bare H1)
        $beforeAK = $beforeAK -replace '(?m)^# (Remember)$', '### $1 Questions'
        $beforeAK = $beforeAK -replace '(?m)^# (Understand)$', '### $1 Questions'
        $beforeAK = $beforeAK -replace '(?m)^# (Apply)$', '### $1 Questions'
        $beforeAK = $beforeAK -replace '(?m)^# (Analyze)$', '### $1 Questions'
        $beforeAK = $beforeAK -replace '(?m)^# (Evaluate)$', '### $1 Questions'
        
        # ---- STEP 5: Fix Answer Key section ----
        # Fix # Answer Key -> ## Answer Key
        $afterAK = $afterAK -replace '(?m)^# (Answer Key)$', '## $1'
        
        # Fix AK question type headings
        # ## Remember Answers -> ### Remember Questions
        $afterAK = $afterAK -replace '(?m)^## (Remember) Answers$', '### $1 Questions'
        $afterAK = $afterAK -replace '(?m)^## (Understand) Answers$', '### $1 Questions'
        $afterAK = $afterAK -replace '(?m)^## (Apply) Answers$', '### $1 Questions'
        $afterAK = $afterAK -replace '(?m)^## (Analyze) Answers$', '### $1 Questions'
        $afterAK = $afterAK -replace '(?m)^## (Evaluate) Answers$', '### $1 Questions'
        # ## Remember -> ### Remember Questions
        $afterAK = $afterAK -replace '(?m)^## (Remember)$', '### $1 Questions'
        $afterAK = $afterAK -replace '(?m)^## (Understand)$', '### $1 Questions'
        $afterAK = $afterAK -replace '(?m)^## (Apply)$', '### $1 Questions'
        $afterAK = $afterAK -replace '(?m)^## (Analyze)$', '### $1 Questions'
        $afterAK = $afterAK -replace '(?m)^## (Evaluate)$', '### $1 Questions'
        # ## Remember Questions -> ### Remember Questions
        $afterAK = $afterAK -replace '(?m)^## (Remember Questions)$', '### $1'
        $afterAK = $afterAK -replace '(?m)^## (Understand Questions)$', '### $1'
        $afterAK = $afterAK -replace '(?m)^## (Apply Questions)$', '### $1'
        $afterAK = $afterAK -replace '(?m)^## (Analyze Questions)$', '### $1'
        $afterAK = $afterAK -replace '(?m)^## (Evaluate Questions)$', '### $1'
        # # Remember Questions -> ### Remember Questions (H1 demote)
        $afterAK = $afterAK -replace '(?m)^# (Remember Questions)$', '### $1'
        $afterAK = $afterAK -replace '(?m)^# (Understand Questions)$', '### $1'
        $afterAK = $afterAK -replace '(?m)^# (Apply Questions)$', '### $1'
        $afterAK = $afterAK -replace '(?m)^# (Analyze Questions)$', '### $1'
        $afterAK = $afterAK -replace '(?m)^# (Evaluate Questions)$', '### $1'
        # Demote ## Question Distribution Summary in AK section
        $afterAK = $afterAK -replace '(?m)^## (Question Distribution Summary)$', '**$1**'
        # Demote # Question Distribution Summary in AK section
        $afterAK = $afterAK -replace '(?m)^# (Question Distribution Summary)$', '**$1**'
        # Demote ## Table N: ... in AK section
        $afterAK = $afterAK -replace '(?m)^## (Table \d+: .+)$', '**$1**'
        
        # ---- STEP 6: Ensure page break before Answer Key ----
        if ($beforeAK -notmatch 'PAGE BREAK') {
            $beforeAK += "`n`n<!-- PAGE BREAK -->`n<div style=`"page-break-after: always;`"></div>`n"
        }
        
        $content = $beforeAK + $afterAK
    }
    else {
        # No Answer Key found - still fix any question type headings
        $content = $content -replace '(?m)^## (Remember)$', '### $1 Questions'
        $content = $content -replace '(?m)^## (Understand)$', '### $1 Questions'
        $content = $content -replace '(?m)^## (Apply)$', '### $1 Questions'
        $content = $content -replace '(?m)^## (Analyze)$', '### $1 Questions'
        $content = $content -replace '(?m)^## (Evaluate)$', '### $1 Questions'
        $content = $content -replace '(?m)^# (Remember Questions)$', '### $1'
        $content = $content -replace '(?m)^# (Understand Questions)$', '### $1'
        $content = $content -replace '(?m)^# (Apply Questions)$', '### $1'
        $content = $content -replace '(?m)^# (Analyze Questions)$', '### $1'
        $content = $content -replace '(?m)^# (Evaluate Questions)$', '### $1'
    }
    
    # ---- STEP 7: Clean up extra blank lines ----
    $content = $content -replace '\n{4,}', "`n`n`n"
    
    if ($DryRun -or $WhatIf) {
        Write-Host "    WOULD WRITE: $destPath" -ForegroundColor Green
    }
    else {
        Set-Content $destPath -Value $content -NoNewline
        Write-Host "    WROTE: $destPath" -ForegroundColor Green
    }
}

function Fix-ReflectionFile {
    param($sourcePath, $destPath)
    
    Write-Host "  Processing Reflection: $sourcePath" -ForegroundColor Cyan
    
    if (-not (Test-Path $sourcePath)) {
        Write-Host "    SKIPPED: source not found" -ForegroundColor Yellow
        return
    }
    
    $content = Get-Content $sourcePath -Raw
    
    # ---- STEP 1: Fix H1 title ----
    $content = $content -replace '(?m)^# Chapter \d+: Review and Reflection\s*$', '# Review and Reflection Questions'
    
    # ---- STEP 2: Add ## Questions if missing ----
    if ($content -notmatch '## Questions') {
        # Find the first question type heading (# Review Questions, # Reflection Questions, etc.)
        # and insert ## Questions before it
        $firstQTypeMatch = [regex]::Match($content, '(?m)^#{1,3} (Review|Reflection|Personal Reflection) Questions?\s*$')
        if ($firstQTypeMatch.Success) {
            $pos = $firstQTypeMatch.Index
            $before = $content.Substring(0, $pos)
            $after = $content.Substring($pos)
            # Remove trailing newlines from before
            $before = $before -replace '\n+$', "`n`n"
            $content = $before + "## Questions`n`n" + $after
        }
        else {
            # Insert after the icon/description
            $content = $content -replace '(</p>\s*\n\s*\n)', ('$1' + "## Questions`n`n")
        }
    }
    
    # ---- STEP 3: Fix question type headings BEFORE Answer Key ----
    $akIndex = [regex]::Match($content, '(?m)^#{1,2} Answer Key').Index
    if ($akIndex -gt 0) {
        $beforeAK = $content.Substring(0, $akIndex)
        $afterAK = $content.Substring($akIndex)
        
        # Fix question type headings in beforeAK
        # # Review Questions -> ### Review Questions
        $beforeAK = $beforeAK -replace '(?m)^# (Review Questions)$', '### $1'
        # # Reflection Questions -> ### Reflection Questions
        $beforeAK = $beforeAK -replace '(?m)^# (Reflection Questions)$', '### $1'
        # # Personal Reflection Questions -> ### Personal Reflection Questions
        $beforeAK = $beforeAK -replace '(?m)^# (Personal Reflection Questions)$', '### $1'
        
        # ---- STEP 4: Fix Answer Key section ----
        # # Answer Key -> ## Answer Key
        $afterAK = $afterAK -replace '(?m)^# (Answer Key)$', '## $1'
        
        # Fix AK question type headings
        # ## Review -> ### Review Questions
        $afterAK = $afterAK -replace '(?m)^## (Review)$', '### $1 Questions'
        # ## Reflection -> ### Reflection Questions
        $afterAK = $afterAK -replace '(?m)^## (Reflection)$', '### $1 Questions'
        # ## Personal Reflection -> ### Personal Reflection Questions
        $afterAK = $afterAK -replace '(?m)^## (Personal Reflection)$', '### $1 Questions'
        # # Review Questions -> ### Review Questions
        $afterAK = $afterAK -replace '(?m)^# (Review Questions)$', '### $1'
        # # Reflection Questions -> ### Reflection Questions
        $afterAK = $afterAK -replace '(?m)^# (Reflection Questions)$', '### $1'
        # # Personal Reflection Questions -> ### Personal Reflection Questions
        $afterAK = $afterAK -replace '(?m)^# (Personal Reflection Questions)$', '### $1'
        # ## Review Questions -> ### Review Questions
        $afterAK = $afterAK -replace '(?m)^## (Review Questions)$', '### $1'
        # ## Reflection Questions -> ### Reflection Questions
        $afterAK = $afterAK -replace '(?m)^## (Reflection Questions)$', '### $1'
        # ## Personal Reflection Questions -> ### Personal Reflection Questions
        $afterAK = $afterAK -replace '(?m)^## (Personal Reflection Questions)$', '### $1'
        
        # ---- STEP 5: Ensure page break before Answer Key ----
        if ($beforeAK -notmatch 'PAGE BREAK') {
            $beforeAK += "`n`n<!-- PAGE BREAK -->`n<div style=`"page-break-after: always;`"></div>`n"
        }
        
        $content = $beforeAK + $afterAK
    }
    
    # ---- STEP 6: Clean up extra blank lines ----
    $content = $content -replace '\n{4,}', "`n`n`n"
    
    if ($DryRun -or $WhatIf) {
        Write-Host "    WOULD WRITE: $destPath" -ForegroundColor Green
    }
    else {
        Set-Content $destPath -Value $content -NoNewline
        Write-Host "    WROTE: $destPath" -ForegroundColor Green
    }
}

# ---- MAIN EXECUTION ----
Write-Host "`n===== FIXING RAT AND REFLECTION FORMATTING =====" -ForegroundColor Magenta
Write-Host "Target date: $today"
Write-Host "Dry run: $($DryRun -or $WhatIf)"
Write-Host ""

foreach ($ch in $chapters) {
    $chDir = Join-Path $baseDir $ch.Folder
    $chNum = $ch.Num
    
    Write-Host ("--- Chapter {0}: {1} ---" -f $chNum, $ch.Folder) -ForegroundColor Yellow
    
    # Find most recent RAT file
    $ratDir = Join-Path $chDir "rat"
    if (Test-Path $ratDir) {
        $ratFiles = Get-ChildItem $ratDir -Filter "ch$chNum-rat-20*.md" | Where-Object { $_.Name -match 'ch\d{2}-rat-\d{4}-\d{2}-\d{2}\.md$' } | Sort-Object Name -Descending
        if ($ratFiles.Count -gt 0) {
            $sourceRat = $ratFiles[0].FullName
            $destRat = Join-Path $ratDir "ch$chNum-rat-$today.md"
            Fix-RatFile -sourcePath $sourceRat -destPath $destRat -chapterTitle $ch.Title
        }
        else {
            Write-Host "  RAT: No dated files found" -ForegroundColor DarkYellow
        }
    }
    
    # Find most recent Reflection file
    $refDir = Join-Path $chDir "reflection"
    if (Test-Path $refDir) {
        $refFiles = Get-ChildItem $refDir -Filter "ch$chNum-reflection-20*.md" | Where-Object { $_.Name -match 'ch\d{2}-reflection-\d{4}-\d{2}-\d{2}\.md$' } | Sort-Object Name -Descending
        if ($refFiles.Count -gt 0) {
            $sourceRef = $refFiles[0].FullName
            $destRef = Join-Path $refDir "ch$chNum-reflection-$today.md"
            Fix-ReflectionFile -sourcePath $sourceRef -destPath $destRef
        }
        else {
            Write-Host "  Reflection: No dated files found" -ForegroundColor DarkYellow
        }
    }
    
    Write-Host ""
}

Write-Host "===== DONE =====" -ForegroundColor Magenta
if ($DryRun -or $WhatIf) {
    Write-Host "This was a dry run. Remove -DryRun/-WhatIf to actually write files." -ForegroundColor Yellow
}
