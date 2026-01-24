@echo off
REM Prinesi.tj Courier Management System - Windows Launcher
REM This script starts the application development server

echo.
echo ================================================
echo   Prinesi.tj Courier Management System
echo ================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo.
    echo Please download and install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies... This may take a few minutes...
    echo.
    call npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies!
        pause
        exit /b 1
    )
)

echo.
echo Starting development server...
echo.
echo The application will open at: http://localhost:5173
echo.
echo Default Credentials:
echo   Admin:    admin / admin123
echo   Operator: operator / operator123
echo   Manager:  manager / manager123
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the development server
npm run dev

pause
