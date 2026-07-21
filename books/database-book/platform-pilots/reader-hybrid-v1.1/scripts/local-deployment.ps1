[CmdletBinding()]
param(
    [Parameter()]
    [ValidateSet('start', 'stop', 'restart', 'status')]
    [string]$Action = 'status',

    [Parameter()]
    [ValidateSet('preview', 'dev', 'all')]
    [string]$Mode = 'all'
)

$ErrorActionPreference = 'Stop'
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$StateRoot = Join-Path ([System.IO.Path]::GetTempPath()) 'dima-textbook-local'

$Modes = @{
    preview = @{
        Port = 3000
        NpmArguments = @('run', 'preview', '--', '--host', '0.0.0.0', '--port', '3000')
    }
    dev = @{
        Port = 3001
        NpmArguments = @('exec', 'vite', '--', '--host', '0.0.0.0', '--port', '3001')
    }
}

function Get-SelectedModes {
    if ($Mode -eq 'all') {
        return @('preview', 'dev')
    }

    return @($Mode)
}

function Get-StatePath {
    param([Parameter(Mandatory)][string]$SelectedMode)
    return Join-Path $StateRoot "$SelectedMode.json"
}

function Get-ModeState {
    param([Parameter(Mandatory)][string]$SelectedMode)

    $statePath = Get-StatePath -SelectedMode $SelectedMode
    if (-not (Test-Path -LiteralPath $statePath)) {
        return $null
    }

    try {
        return Get-Content -Raw -LiteralPath $statePath | ConvertFrom-Json
    }
    catch {
        Write-Warning "Ignoring unreadable state file: $statePath"
        Remove-Item -LiteralPath $statePath -Force
        return $null
    }
}

function Test-StateProcess {
    param([Parameter(Mandatory)]$State)

    $process = Get-Process -Id ([int]$State.ProcessId) -ErrorAction SilentlyContinue
    if (-not $process) {
        return $false
    }

    try {
        $actualStart = $process.StartTime.ToUniversalTime()
        $recordedStart = [DateTime]::Parse(
            [string]$State.ProcessStartUtc,
            [Globalization.CultureInfo]::InvariantCulture,
            [Globalization.DateTimeStyles]::RoundtripKind
        ).ToUniversalTime()
        return [Math]::Abs(($actualStart - $recordedStart).TotalSeconds) -lt 2
    }
    catch {
        return $false
    }
}

function Remove-StaleState {
    param([Parameter(Mandatory)][string]$SelectedMode)

    $statePath = Get-StatePath -SelectedMode $SelectedMode
    if (Test-Path -LiteralPath $statePath) {
        Remove-Item -LiteralPath $statePath -Force
    }
}

function Test-PortInUse {
    param([Parameter(Mandatory)][int]$Port)

    return [System.Net.NetworkInformation.IPGlobalProperties]::GetIPGlobalProperties().GetActiveTcpListeners().Port -contains $Port
}

function Get-LanAddresses {
    $addresses = foreach ($networkInterface in [System.Net.NetworkInformation.NetworkInterface]::GetAllNetworkInterfaces()) {
        if ($networkInterface.OperationalStatus -ne [System.Net.NetworkInformation.OperationalStatus]::Up) {
            continue
        }
        if ($networkInterface.NetworkInterfaceType -eq [System.Net.NetworkInformation.NetworkInterfaceType]::Loopback) {
            continue
        }

        foreach ($addressInfo in $networkInterface.GetIPProperties().UnicastAddresses) {
            $address = $addressInfo.Address
            if ($address.AddressFamily -ne [System.Net.Sockets.AddressFamily]::InterNetwork) {
                continue
            }
            if ($address.ToString().StartsWith('169.254.')) {
                continue
            }
            $address.ToString()
        }
    }

    return @($addresses | Sort-Object -Unique)
}

function Write-ModeUrls {
    param(
        [Parameter(Mandatory)][string]$SelectedMode,
        [Parameter(Mandatory)][int]$Port
    )

    Write-Host "  Local: http://localhost:$Port"
    foreach ($address in Get-LanAddresses) {
        Write-Host "  LAN:   http://${address}:$Port"
    }
}

function Invoke-Npm {
    param([Parameter(Mandatory)][string[]]$Arguments)

    Write-Host "`n> npm $($Arguments -join ' ')" -ForegroundColor Cyan
    Push-Location $ProjectRoot
    try {
        & npm.cmd @Arguments
        if ($LASTEXITCODE -ne 0) {
            throw "npm command failed with exit code $LASTEXITCODE"
        }
    }
    finally {
        Pop-Location
    }
}

function Invoke-ModePrerequisites {
    param([Parameter(Mandatory)][string]$SelectedMode)

    if ($SelectedMode -eq 'preview') {
        Invoke-Npm -Arguments @('run', 'validate:access')
        Invoke-Npm -Arguments @('run', 'generate')
        Invoke-Npm -Arguments @('run', 'lint')
        Invoke-Npm -Arguments @('run', 'build')
        return
    }

    Invoke-Npm -Arguments @('run', 'generate')
}

function Wait-ForServer {
    param(
        [Parameter(Mandatory)][int]$Port,
        [Parameter(Mandatory)]$Process
    )

    $deadline = [DateTime]::UtcNow.AddSeconds(30)
    do {
        if ($Process.HasExited) {
            return $false
        }

        try {
            $response = Invoke-WebRequest -Uri "http://127.0.0.1:$Port/" -UseBasicParsing -TimeoutSec 2
            if ($response.StatusCode -eq 200) {
                return $true
            }
        }
        catch {
            Start-Sleep -Milliseconds 500
        }
    } while ([DateTime]::UtcNow -lt $deadline)

    return $false
}

function Stop-ProcessTree {
    param([Parameter(Mandatory)][int]$ProcessId)

    $children = @(Get-CimInstance Win32_Process -Filter "ParentProcessId = $ProcessId" -ErrorAction SilentlyContinue)
    foreach ($child in $children) {
        Stop-ProcessTree -ProcessId ([int]$child.ProcessId)
    }

    Stop-Process -Id $ProcessId -Force -ErrorAction SilentlyContinue
}

function Start-Mode {
    param([Parameter(Mandatory)][string]$SelectedMode)

    $existingState = Get-ModeState -SelectedMode $SelectedMode
    if ($existingState -and (Test-StateProcess -State $existingState)) {
        Write-Host "$SelectedMode is already running (PID $($existingState.ProcessId))." -ForegroundColor Yellow
        Write-ModeUrls -SelectedMode $SelectedMode -Port ([int]$existingState.Port)
        return
    }
    if ($existingState) {
        Write-Warning "Removing stale $SelectedMode process state."
        Remove-StaleState -SelectedMode $SelectedMode
    }

    $configuration = $Modes[$SelectedMode]
    $port = [int]$configuration.Port
    if (Test-PortInUse -Port $port) {
        throw "Port $port is already in use. Stop the process using it or choose another port before starting $SelectedMode."
    }

    Invoke-ModePrerequisites -SelectedMode $SelectedMode
    New-Item -ItemType Directory -Path $StateRoot -Force | Out-Null

    $timestamp = Get-Date -Format 'yyyyMMdd-HHmmss'
    $stdoutPath = Join-Path $StateRoot "$SelectedMode-$timestamp.stdout.log"
    $stderrPath = Join-Path $StateRoot "$SelectedMode-$timestamp.stderr.log"
    $startParameters = @{
        FilePath = 'npm.cmd'
        ArgumentList = [string[]]$configuration.NpmArguments
        WorkingDirectory = $ProjectRoot
        WindowStyle = 'Hidden'
        RedirectStandardOutput = $stdoutPath
        RedirectStandardError = $stderrPath
        PassThru = $true
    }
    $process = Start-Process @startParameters

    if (-not (Wait-ForServer -Port $port -Process $process)) {
        if (-not $process.HasExited) {
            Stop-ProcessTree -ProcessId $process.Id
        }
        $errorTail = if (Test-Path -LiteralPath $stderrPath) {
            (Get-Content -LiteralPath $stderrPath -Tail 20) -join [Environment]::NewLine
        }
        throw "$SelectedMode did not become ready on port $port within 30 seconds.`n$errorTail"
    }

    $process.Refresh()
    $state = [ordered]@{
        Mode = $SelectedMode
        ProcessId = $process.Id
        ProcessStartUtc = $process.StartTime.ToUniversalTime().ToString('o')
        Port = $port
        StartedUtc = [DateTime]::UtcNow.ToString('o')
        StdoutLog = $stdoutPath
        StderrLog = $stderrPath
    }
    $state | ConvertTo-Json | Set-Content -LiteralPath (Get-StatePath -SelectedMode $SelectedMode) -Encoding utf8

    Write-Host "`n$SelectedMode started in the background (PID $($process.Id))." -ForegroundColor Green
    Write-ModeUrls -SelectedMode $SelectedMode -Port $port
    Write-Host "  stdout: $stdoutPath"
    Write-Host "  stderr: $stderrPath"
}

function Stop-Mode {
    param([Parameter(Mandatory)][string]$SelectedMode)

    $state = Get-ModeState -SelectedMode $SelectedMode
    if (-not $state) {
        Write-Host "$SelectedMode is not running."
        return
    }

    if (Test-StateProcess -State $state) {
        Stop-ProcessTree -ProcessId ([int]$state.ProcessId)
        Write-Host "$SelectedMode stopped (PID $($state.ProcessId))." -ForegroundColor Green
    }
    else {
        Write-Warning "$SelectedMode had stale process state; no process was stopped."
    }

    Remove-StaleState -SelectedMode $SelectedMode
}

function Show-ModeStatus {
    param([Parameter(Mandatory)][string]$SelectedMode)

    $state = Get-ModeState -SelectedMode $SelectedMode
    if (-not $state) {
        Write-Host "${SelectedMode}: stopped"
        return
    }

    if (-not (Test-StateProcess -State $state)) {
        Write-Host "${SelectedMode}: stopped (removed stale state)" -ForegroundColor Yellow
        Remove-StaleState -SelectedMode $SelectedMode
        return
    }

    Write-Host "${SelectedMode}: running (PID $($state.ProcessId), started $($state.StartedUtc))" -ForegroundColor Green
    Write-ModeUrls -SelectedMode $SelectedMode -Port ([int]$state.Port)
    Write-Host "  stdout: $($state.StdoutLog)"
    Write-Host "  stderr: $($state.StderrLog)"
}

$selectedModes = Get-SelectedModes
switch ($Action) {
    'start' {
        foreach ($selectedMode in $selectedModes) {
            Start-Mode -SelectedMode $selectedMode
        }
    }
    'stop' {
        foreach ($selectedMode in $selectedModes) {
            Stop-Mode -SelectedMode $selectedMode
        }
    }
    'restart' {
        foreach ($selectedMode in $selectedModes) {
            Stop-Mode -SelectedMode $selectedMode
            Start-Mode -SelectedMode $selectedMode
        }
    }
    'status' {
        foreach ($selectedMode in $selectedModes) {
            Show-ModeStatus -SelectedMode $selectedMode
        }
    }
}
