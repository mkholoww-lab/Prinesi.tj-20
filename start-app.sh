#!/bin/bash

# Prinesi.tj Courier Management System - Mac/Linux Launcher
# This script starts the application development server

echo ""
echo "================================================"
echo "  Prinesi.tj Courier Management System"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo ""
    echo "Please download and install Node.js from: https://nodejs.org/"
    echo ""
    echo "Or use a package manager:"
    echo "  macOS: brew install node"
    echo "  Ubuntu: sudo apt-get install nodejs npm"
    echo ""
    exit 1
fi

echo "Node.js version:"
node --version
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies... This may take a few minutes..."
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Failed to install dependencies!"
        exit 1
    fi
fi

echo ""
echo "Starting development server..."
echo ""
echo "The application will open at: http://localhost:5173"
echo ""
echo "Default Credentials:"
echo "  Admin:    admin / admin123"
echo "  Operator: operator / operator123"
echo "  Manager:  manager / manager123"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev
