# Quick Start - Prinesi.tj Courier Management System

## For Windows 10/11 Users

### Step 1: Install Node.js
1. Download from https://nodejs.org/ (LTS version)
2. Run installer and follow the setup
3. Verify: Open Command Prompt and type `node --version`

### Step 2: Start the App
1. Extract the project folder
2. Double-click `start-app.bat`
3. Wait for "development server ready in..." message
4. Open browser: http://localhost:5173

### Step 3: Login
**Admin (Full Access)**
- Username: `admin`
- Password: `admin123`

**Operator (Orders & Reports)**
- Username: `operator`
- Password: `operator123`

**Manager (Couriers & Reports)**
- Username: `manager`
- Password: `manager123`

### Step 4: Change Password
1. Click "Settings" in left menu
2. Enter current password
3. Enter new password (min 6 characters)
4. Click "Update Password"

---

## For Mac Users

### Step 1: Install Node.js
```bash
brew install node
node --version
```

### Step 2: Start the App
```bash
chmod +x start-app.sh
./start-app.sh
```

### Step 3-4: Same as Windows

---

## For Linux Users

### Step 1: Install Node.js
```bash
sudo apt update
sudo apt install nodejs npm
node --version
```

### Step 2: Start the App
```bash
chmod +x start-app.sh
./start-app.sh
```

### Step 3-4: Same as Windows

---

## What Can Each Role Do?

### 👤 Admin (You are here if logged in as "admin")
- ✅ Create new users
- ✅ Manage couriers (add photos, passport)
- ✅ Manage partners
- ✅ Track on-duty couriers
- ✅ Manage scooter fleet
- ✅ View all reports
- ✅ Delete anything
- ✅ Access all pages

### 👥 Operator
- ✅ Log deliveries
- ✅ View partners
- ✅ View reports
- ❌ Cannot create couriers
- ❌ Cannot manage partners
- ❌ Cannot delete anything

### 💼 Manager
- ✅ Manage couriers
- ✅ View reports
- ✅ View courier performance
- ❌ Cannot create partners
- ❌ Cannot log deliveries
- ❌ Cannot delete anything

---

## Common Tasks

### Add a New User (Admin Only)
1. Click "Users" in left menu
2. Click "Create User"
3. Fill in username, password, name, role
4. Click "Create User"

### Add a Courier (Admin Only)
1. Click "Couriers" in left menu
2. Click "Add Courier"
3. Fill in information
4. **Upload photos** (personal photo + passport)
5. Click "Save Courier"

### Add a Partner (Admin Only)
1. Click "Partners" in left menu
2. Click "Add Partner"
3. Fill in partner info
4. Click "Save Partner"

### Log a Delivery
1. Click "Deliveries" in left menu
2. Click "Log Delivery"
3. Fill in order details
4. Click "Save Delivery"

### View Your Profile
1. Click "Settings" in left menu
2. See your information
3. Upload avatar photo
4. Change password if needed

### View Reports
1. Click "Reports" in left menu
2. See all analytics
3. Can export to PDF, Excel, or CSV

---

## Troubleshooting

**Q: "Node is not installed"**  
A: Download from https://nodejs.org/ and install it

**Q: "Port 5173 already in use"**  
A: Close other apps using this port or wait 30 seconds

**Q: "Cannot log in"**  
A: Make sure you're using correct username and password (case-sensitive)

**Q: "Password change not working"**  
A: Make sure current password is correct and new password is 6+ characters

**Q: "Photos not showing"**  
A: Refresh browser (Ctrl+R) or clear cache

---

## Important Security Notes

⚠️ **Change default passwords immediately!**

1. Login as admin
2. Click Settings
3. Change password to something only you know
4. Remember: Password must be 6+ characters

---

## Getting Help

1. See full documentation: `README.md`
2. Setup detailed guide: `SETUP_GUIDE.md`
3. Role permissions: `ROLE_BASED_ACCESS.md`
4. Implementation details: `IMPLEMENTATION_SUMMARY.md`

---

## Next Steps

1. ✅ Start the app (you've done this!)
2. ✅ Login as admin
3. ✅ Change admin password
4. Create user accounts for your team
5. Start adding couriers, partners, and logging deliveries

---

**Welcome to Prinesi.tj! 🎉**

The application is ready to use. Start with the admin account and explore all the features!
