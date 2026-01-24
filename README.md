# Prinesi.tj Courier Management System

A modern, production-ready courier service management application built with React, TypeScript, and Tailwind CSS.

![License](https://img.shields.io/badge/license-Proprietary-red)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-Production%20Ready-brightgreen)

---

## 🎯 Features

### Core Management
- ✅ **Courier Management** - Add, edit, track couriers with photos and documents
- ✅ **Delivery Tracking** - Log and monitor deliveries with location details
- ✅ **Partner Management** - Manage delivery partners and their performance
- ✅ **Scooter Fleet Management** - Track scooter inventory, maintenance, and equipment
- ✅ **On-Duty Tracking** - Real-time monitoring of active couriers

### User System
- ✅ **Role-Based Access Control** - Admin, Operator, Manager roles with specific permissions
- ✅ **User Management** - Create/delete users (admin only)
- ✅ **Secure Authentication** - Username + password login
- ✅ **Personal Profiles** - Avatar upload, password management
- ✅ **Activity Logging** - Track login history

### Reporting & Analytics
- ✅ **Courier Reports** - Performance metrics, earnings, delivery counts
- ✅ **Partner Reports** - Monthly volumes, average order values
- ✅ **Fleet Reports** - Scooter condition, equipment status
- ✅ **Export Options** - PDF, Excel, CSV export formats

### Data Management
- ✅ **Photo Uploads** - Courier photos, passport documentation
- ✅ **Data Backup** - GitHub integration for secure backups
- ✅ **Local Storage** - Persistent local data management
- ✅ **Admin Controls** - Full delete permissions (admin only)

---

## 🚀 Quick Start

### Windows
1. Download and install [Node.js](https://nodejs.org/)
2. Extract project folder
3. Double-click `start-app.bat`
4. Open http://localhost:5173 in your browser

### macOS/Linux
1. Install Node.js: `brew install node` (macOS) or `sudo apt install nodejs npm` (Linux)
2. Extract project folder
3. Run: `chmod +x start-app.sh && ./start-app.sh`
4. Open http://localhost:5173 in your browser

### Default Credentials
| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Operator | `operator` | `operator123` |
| Manager | `manager` | `manager123` |

**⚠️ Change these passwords immediately after first login!**

---

## 👥 User Roles

### 🔴 Admin (Full System Access)
**Can do everything:**
- Manage all users (create, delete)
- Add/edit/delete couriers with photos
- Manage delivery partners
- Track on-duty couriers
- Manage scooter fleet
- View all reports
- Access all system settings

**Pages Accessible:**
- Dashboard, Couriers, On-Duty, Deliveries, Scooters, Partners, Reports, Settings, User Management

### 🔵 Operator (Operations Focus)
**Can manage daily operations:**
- Log and track deliveries
- View partner information
- Access delivery and partner reports
- Manage personal profile and password

**Pages Accessible:**
- Dashboard, Deliveries, Partners, Reports, Settings

### 🟡 Manager (Courier Management)
**Can manage courier team:**
- Add and manage couriers
- View courier performance reports
- Manage personal profile and password

**Pages Accessible:**
- Dashboard, Couriers, Reports, Settings

---

## 📁 Installation Methods

### Method 1: Quick Start (Recommended for Windows)
```batch
start-app.bat
```

### Method 2: Command Line
```bash
npm install
npm run dev
```

### Method 3: Production Build
```bash
npm install
npm run build
npm start
```

---

## 🔐 Security Features

- **Password Protection** - All accounts password-protected
- **Role-Based Access** - Strict permission controls
- **Admin-Only Actions** - Delete operations restricted to admins
- **Secure Authentication** - No credentials stored in localStorage
- **Photo Encryption** - Base64 encoding for photo storage
- **GitHub Backup** - Optional encrypted backup to GitHub

---

## 📊 Key Features by Section

### Couriers Management
- Add couriers with detailed information
- Upload personal photos and passport images
- Assign scooters and work hours
- Track status and performance
- Full edit/delete capabilities

### Deliveries
- Log deliveries with complete details
- Track pickup/delivery locations
- Record distances and notes
- Update delivery status
- Export delivery reports

### Scooters
- Fleet inventory management
- Equipment tracking (key, documents, helmet, uniform items)
- Maintenance problem logs
- Condition monitoring
- Individual scooter reports

### Reports
- Courier performance metrics
- Partner delivery volumes and revenue
- Scooter fleet condition overview
- Monthly analytics
- Export in multiple formats

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS 3, Lucide Icons
- **State Management**: React Context API
- **Router**: React Router 6
- **Backend**: Express (optional)
- **Database**: Local JSON storage
- **Backup**: GitHub API integration

---

## 📦 File Structure

```
Prinesi.tj-20/
├── client/
│   ├── pages/                 # Page components
│   │   ├── Login.tsx
│   │   ├── Index.tsx (Dashboard)
│   │   ├── Couriers.tsx
│   │   ├── Deliveries.tsx
│   │   ├── Partners.tsx
│   │   ├── Scooters.tsx
│   │   ├── OnDuty.tsx
│   │   ├── Reports.tsx
│   │   ├── Settings.tsx
│   │   ├── AdminUsers.tsx
│   │   └── NotFound.tsx
│   ├── components/
│   │   ├── Layout.tsx
│   │   └── ui/                # UI component library
│   ├── contexts/
│   │   └── AuthContext.tsx    # Authentication context
│   ├── services/
│   │   └── githubSync.ts      # GitHub backup service
│   ├── App.tsx
│   └── global.css
├── server/
│   └── index.ts               # Express server
├── start-app.bat              # Windows launcher
├── start-app.sh               # Mac/Linux launcher
├── package.json
├── vite.config.ts
├── SETUP_GUIDE.md             # Detailed setup instructions
├── ROLE_BASED_ACCESS.md       # Role permissions documentation
└── README.md                  # This file
```

---

## 🔧 Configuration

### Environment Variables

Create `.env` file in project root for GitHub backup:

```env
VITE_GITHUB_TOKEN=your_github_token
VITE_GITHUB_REPO=username/repo
VITE_GITHUB_USER=username
```

[Get GitHub Token Instructions](SETUP_GUIDE.md#enable-github-data-sync)

---

## 📱 System Requirements

### Minimum
- **OS**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+
- **RAM**: 2 GB
- **Disk**: 500 MB
- **Node.js**: 18.0+
- **Browser**: Chrome/Edge/Firefox (latest)

### Recommended
- **RAM**: 4 GB
- **Disk**: 1 GB
- **Node.js**: 20.0+

---

## 🚨 Troubleshooting

### Issue: Port 5173 already in use
```bash
# Kill process and try again
# Windows: 
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# macOS/Linux:
lsof -i :5173
kill -9 <PID>
```

### Issue: Dependencies fail to install
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: Password change not working
- Verify current password is correct
- Ensure new password is at least 6 characters
- Try logging out and back in

### Issue: Photos not displaying
- Check image file size (max 5MB)
- Verify browser cache is cleared
- Try different image format (JPG/PNG)

[More troubleshooting →](SETUP_GUIDE.md#troubleshooting)

---

## 📞 Support

- **Documentation**: See [SETUP_GUIDE.md](SETUP_GUIDE.md) and [ROLE_BASED_ACCESS.md](ROLE_BASED_ACCESS.md)
- **Issues**: GitHub Issues section
- **Feature Requests**: Create detailed issue with description

---

## 🔄 Updating

### Check for updates
```bash
git pull origin main
npm install
npm run build
```

### Backup before updating
1. Export data from Reports section
2. Or use GitHub backup feature
3. Manual backup: Copy `data/` folder

---

## 📋 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Run tests
npm test

# Type check
npm run typecheck

# Format code
npm run format.fix
```

---

## 🎨 Customization

### Change Colors/Branding
Edit `client/global.css` CSS variables:
```css
--primary: 132 76% 42%;        /* Green */
--secondary: 160 84% 46%;      /* Teal */
```

### Change App Name
- Update `client/components/Layout.tsx` brand name
- Update page titles in components
- Update `.env` app name

---

## 📄 License

**Proprietary Software**
- All rights reserved
- Unauthorized copying, modification, or distribution is prohibited
- For licensing inquiries contact Prinesi.tj

---

## 🎯 Roadmap

### Version 1.1
- [ ] SMS notifications for deliveries
- [ ] Mobile app (React Native)
- [ ] Advanced reporting with charts
- [ ] Integration with payment systems

### Version 1.2
- [ ] Machine learning for route optimization
- [ ] Real-time GPS tracking
- [ ] Customer portal
- [ ] Multi-language support

---

## 👨‍💻 Contributing

Internal team members:
1. Create feature branch
2. Make changes
3. Test thoroughly
4. Create pull request
5. Get code review
6. Merge to main

---

## 📞 Contact

**Prinesi.tj Management System**
- Email: support@prinesi.tj
- Website: www.prinesi.tj
- Address: Dushanbe, Tajikistan

---

## ✅ Checklist for First Run

- [ ] Install Node.js
- [ ] Extract/clone project
- [ ] Run `start-app.bat` or `start-app.sh`
- [ ] Open http://localhost:5173
- [ ] Login with default credentials
- [ ] Change admin password
- [ ] Create user accounts for team
- [ ] Configure GitHub backup (optional)
- [ ] Test all features by role
- [ ] Create initial data

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: Production Ready ✅

---

For detailed setup instructions, see [SETUP_GUIDE.md](SETUP_GUIDE.md)  
For role permissions, see [ROLE_BASED_ACCESS.md](ROLE_BASED_ACCESS.md)
