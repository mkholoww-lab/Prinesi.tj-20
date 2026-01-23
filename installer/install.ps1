Param(
    [string]$InstallDir = "$env:ProgramFiles\Prinesi.tj-20",
    [string]$Branch = "main"
)

function Test-IsAdmin {
    $current = [Security.Principal.WindowsIdentity]::GetCurrent()
    $principal = New-Object Security.Principal.WindowsPrincipal($current)
    return $principal.IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
}

if (-not (Test-IsAdmin)) {
    Write-Host "Administrator permissions are required to install to $InstallDir." -ForegroundColor Yellow
    Write-Host "The installer will try to relaunch with elevated permissions..."
    Start-Process -FilePath "powershell.exe" -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`" -InstallDir `"$InstallDir`" -Branch `"$Branch`"" -Verb RunAs
    exit
}

Write-Host "Installing Prinesi.tj-20 to: $InstallDir" -ForegroundColor Cyan

# Prepare temp paths
$zipUrl = "https://github.com/mkholoww-lab/Prinesi.tj-20/archive/refs/heads/$Branch.zip"
$tmpZip = Join-Path $env:TEMP ("Prinesi_$Branch_{0}.zip" -f ([guid]::NewGuid().ToString()))
$tempDir = Join-Path $env:TEMP ("prinesi_extract_{0}" -f ([guid]::NewGuid().ToString()))

try {
    Write-Host "Downloading repository archive from $zipUrl ..."
    Invoke-WebRequest -Uri $zipUrl -OutFile $tmpZip -UseBasicParsing -ErrorAction Stop

    Write-Host "Extracting archive to $tempDir ..."
    Expand-Archive -Path $tmpZip -DestinationPath $tempDir -Force

    # Find extracted folder (github creates folder like repo-branch)
    $extractedRoot = Get-ChildItem -Path $tempDir | Where-Object { $_.PSIsContainer } | Select-Object -First 1
    if (-not $extractedRoot) {
        throw "Failed to find extracted repository folder inside $tempDir"
    }

    # Prepare install dir
    if (Test-Path $InstallDir) {
        Write-Host "Existing installation detected at $InstallDir. Files will be overwritten." -ForegroundColor Yellow
    } else {
        New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
    }

    Write-Host "Copying files to $InstallDir ..."
    Copy-Item -Path (Join-Path $extractedRoot.FullName '*') -Destination $InstallDir -Recurse -Force

    # Install dependencies
    Push-Location $InstallDir

    $pnpm = Get-Command pnpm -ErrorAction SilentlyContinue
    $npm = Get-Command npm -ErrorAction SilentlyContinue

    if ($pnpm) {
        Write-Host "pnpm detected, installing dependencies with pnpm..."
        & pnpm install --prod --frozen-lockfile
    } elseif ($npm) {
        Write-Host "npm detected, installing dependencies with npm..."
        if (Test-Path package-lock.json) {
            npm ci
        } else {
            npm install
        }
    } else {
        Write-Warning "Neither pnpm nor npm found in PATH. Please install Node.js (which includes npm) or pnpm and re-run the installer."
        Write-Host "Opening Node.js download page in your browser..."
        Start-Process "https://nodejs.org/"
        Pop-Location
        exit 1
    }

    Pop-Location

    # Create Start Menu and Desktop shortcuts
    try {
        $wsh = New-Object -ComObject WScript.Shell
        $programsPath = [Environment]::GetFolderPath('Programs')
        $startMenuFolder = Join-Path $programsPath "Prinesi.tj-20"
        if (-not (Test-Path $startMenuFolder)) { New-Item -ItemType Directory -Path $startMenuFolder -Force | Out-Null }

        $target = Join-Path $InstallDir 'settings\run.bat'
        if (-not (Test-Path $target)) {
            Write-Warning "Expected start script not found at $target. Installer will still create shortcuts to the install folder."
            $target = Join-Path $InstallDir 'package.json'
        }

        $lnkPath = Join-Path $startMenuFolder "Prinesi.tj-20.lnk"
        $shortcut = $wsh.CreateShortcut($lnkPath)
        $shortcut.TargetPath = $target
        $shortcut.WorkingDirectory = $InstallDir
        $shortcut.WindowStyle = 1
        $shortcut.IconLocation = $target
        $shortcut.Save()

        # Desktop shortcut for the current user
        $desktop = [Environment]::GetFolderPath('Desktop')
        $lnkDesktop = Join-Path $desktop "Prinesi.tj-20.lnk"
        $sc2 = $wsh.CreateShortcut($lnkDesktop)
        $sc2.TargetPath = $target
        $sc2.WorkingDirectory = $InstallDir
        $sc2.WindowStyle = 1
        $sc2.IconLocation = $target
        $sc2.Save()
    } catch {
        Write-Warning "Failed to create shortcuts: $_"
    }

    Write-Host "Installation completed successfully." -ForegroundColor Green
    Write-Host "You can launch the application from the Start Menu or Desktop shortcut, or run:`n  $target" -ForegroundColor Cyan
} catch {
    Write-Error "Installation failed: $_"
} finally {
    # Cleanup
    if (Test-Path $tmpZip) { Remove-Item -Path $tmpZip -Force }
    if (Test-Path $tempDir) { Remove-Item -Path $tempDir -Recurse -Force }
}