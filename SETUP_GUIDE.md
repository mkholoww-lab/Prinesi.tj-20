# Prinesi.tj Courier Management System - Setup Guide

## System Requirements

### Windows 10/11
- Node.js 18+ (https://nodejs.org/)
- npm or pnpm (included with Node.js)
- 500 MB free disk space
- Internet connection for initial setup

### macOS
- Node.js 18+
- npm or pnpm
- 500 MB free disk space

### Linux
- Node.js 18+
- npm or pnpm
- 500 MB free disk space

---

## Installation Steps

### Step 1: Install Node.js

1. Visit https://nodejs.org/
2. Download LTS version (18.x or newer)
3. Run the installer and follow the setup wizard
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Download/Clone Project

**Option A: Download as ZIP**
1. Download the project as ZIP
2. Extract to desired location (e.g., `C:\Prinesi\` on Windows)

**Option B: Clone from GitHub**
```bash
git clone https://github.com/mkholoww-lab/Prinesi.tj-20.git
cd Prinesi.tj-20
```

### Step 3: Install Dependencies

Navigate to project folder and run:
```bash
npm install
# or
pnpm install
```

This will install all required packages (~500MB).

---

## Running the Application

### Development Mode

```bash
npm run dev
```

This will:
- Start the development server
- Open the app at http://localhost:5173
- Enable hot-reload (changes auto-refresh)

### Production Build

```bash
npm run build
```

This creates optimized files in the `dist/` folder.

### Start Production Build

```bash
npm start
```

---

## Default Login Credentials

Use these credentials to log in after starting the app:

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Operator | `operator` | `operator123` |
| Manager | `manager` | `manager123` |

**⚠️ IMPORTANT:** Change these passwords immediately after first login!

---

## Creating Windows Executable

### Option 1: Using pkg (Recommended)

```bash
# Install pkg globally
npm install -g pkg

# Build executable
npm run build
pkg dist/server/node-build.mjs --target node18-win-x64 --output prinesi.exe
```

The executable will be created in the project root as `prinesi.exe`.

### Option 2: Using electron-builder

1. Install electron:
   ```bash
   npm install --save-dev electron electron-builder
   ```

2. Create `electron-main.js`:
   ```javascript
   const { app, BrowserWindow } = require('electron');
   
   function createWindow() {
     const mainWindow = new BrowserWindow({
       width: 1200,
       height: 800
     });
     
     mainWindow.loadURL('http://localhost:5173');
   }
   
   app.on('ready', createWindow);
   ```

3. Add to `package.json`:
   ```json
   "build": {
     "appId": "com.prinesi.courier",
     "files": ["dist/**/*"]
   }
   ```

---

## Data Backup & GitHub Integration

### Enable GitHub Data Sync

1. Create a GitHub repository for your data
2. Get a Personal Access Token:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Click "Generate new token"
   - Select `repo` scope
   - Copy the token

3. Set up in your application:
   - Create a `.env` file in project root:
   ```
   GITHUB_TOKEN=your_token_here
   GITHUB_REPO=your_username/your_repo
   GITHUB_USER=your_username
   ```

4. Data will auto-sync to GitHub on changes

### Manual Backup

Create a backup script (`backup.bat` for Windows):
```batch
@echo off
set BACKUP_DIR=%USERPROFILE%\Documents\Prinesi-Backup
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

xcopy /E /Y "%CD%\data" "%BACKUP_DIR%\data-backup-%date:~-4,4%%date:~-10,2%%date:~-7,2%"

echo Backup completed to %BACKUP_DIR%
pause
```

---

## Features by Role

### Admin Access ✓
- Dashboard
- User Management (create/delete users)
- Couriers (add/edit/delete with photos)
- On-Duty Tracking
- Deliveries (log/manage)
- Scooters (fleet management)
- Partners (add/edit/delete)
- Reports (all types)
- Settings (profile + password)
- User Management

### Operator Access ✓
- Dashboard
- Deliveries (log/manage)
- Partners (view only)
- Reports (delivery & partner)
- Settings (profile + password)

### Manager Access ✓
- Dashboard
- Couriers (view/edit only - no delete)
- Reports (courier performance)
- Settings (profile + password)

---

## Key Features

### User Management
- Create users (Admin only)
- Unique username & password for each user
- Change password in Settings
- Upload profile avatar
- Track login activity

### Courier Management
- Add couriers with detailed information
- Upload courier photos
- Upload passport photos
- Assign scooters
- Set working hours
- Track status (active/inactive)

### Delivery Tracking
- Log deliveries with photos
- Track partner & courier assignments
- Monitor distance & status
- Generate reports

### Scooter Management
- Fleet inventory
- Equipment tracking (key, docs, helmet, uniform)
- Maintenance logs
- Problem tracking

### Reporting
- Courier performance metrics
- Partner delivery volumes
- Scooter condition reports
- Revenue analytics

---

## Troubleshooting

### Port 5173 Already in Use
```bash
# Kill the process using port 5173
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5173
kill -9 <PID>
```

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Photos Not Showing
- Ensure file is in supported format (JPG, PNG, WebP)
- Check file size (max 5MB recommended)
- Verify browser cache is cleared

### GitHub Sync Not Working
- Verify token permissions include `repo` scope
- Check internet connection
- Verify repo name and token in `.env`

---

## Security Notes

1. **Change Default Passwords**: Do this immediately after first login
2. **Use Strong Passwords**: Min 6 characters, mixed case recommended
3. **Backup Data**: Use GitHub sync or manual backups regularly
4. **Limit Admin Accounts**: Only create necessary admin accounts
5. **Secure `.env`**: Never commit `.env` file to GitHub
6. **HTTPS in Production**: Use reverse proxy (nginx/Apache) with SSL

---

## Performance Tips

1. **Database Optimization**: Data stored locally; regular backups prevent loss
2. **Photo Optimization**: Compress images before uploading
3. **Archive Old Data**: Move older records to archive folder
4. **Clear Cache**: Browser DevTools → Application → Clear storage

---

## Support & Updates

- **GitHub Issues**: Report bugs on GitHub
- **Documentation**: See ROLE_BASED_ACCESS.md
- **Feature Requests**: Create issue with detailed description

---

## File Structure

```
Prinesi.tj-20/
├── client/                 # React frontend
│   ├── pages/             # Page components
│   ├── components/        # Reusable components
│   ├── contexts/          # React Context (Auth)
│   └── global.css         # Tailwind styles
├── server/                # Express backend
├── dist/                  # Build output
├── package.json          # Dependencies
├── vite.config.ts        # Vite config
└── README.md             # This file
```

---

## Next Steps

1. Read ROLE_BASED_ACCESS.md for detailed role information
2. Set up GitHub backup (optional but recommended)
3. Create admin accounts for team members
4. Import initial data (if available)
5. Configure working parameters (delivery rates, etc.)

---

**Version**: 1.0  
**Last Updated**: January 2026  
**License**: Proprietary - Prinesi.tj
