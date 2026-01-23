# Prinesi.tj Courier Management System - Role-Based Access

## Overview

The Prinesi.tj Courier Management System now includes three distinct user roles with specific access permissions and features.

---

## 🟢 ADMIN (Full System Access)

**Description:** Complete system control with access to all features, settings, and data.

**Accessible Pages:**

- ✅ Dashboard (Full overview)
- ✅ Couriers Management (Add, edit, delete couriers with full details)
- ✅ On-Duty Tracking (Real-time courier monitoring)
- ✅ Deliveries (Log and manage deliveries)
- ✅ Scooters (Complete scooter fleet management with equipment tracking)
- ✅ Partners (Manage delivery partners)
- ✅ Reports (All reports - Couriers, Partners, Scooters)

**Key Features:**

- Add and manage couriers with detailed information (passport, parent contact, work hours)
- Track courier equipment and uniform distribution
- Manage entire scooter fleet with maintenance tracking
- Monitor on-duty couriers in real-time
- View comprehensive analytics and reports
- Add and manage delivery partners
- Track deliveries with complete order management

**Quick Actions:**

- - Add New Courier
- - Log Delivery
- - Manage Scooters
- - Add Partner

---

## 🟦 OPERATOR (Deliveries & Reports)

**Description:** Focused access for managing daily operations - orders, partners, and performance tracking.

**Accessible Pages:**

- ✅ Dashboard (Overview of deliveries and partners)
- ✅ Deliveries (Log and manage deliveries)
- ✅ Partners (View and manage delivery partners)
- ✅ Reports (Courier performance reports)
- ❌ Couriers (Hidden)
- ❌ On-Duty Tracking (Hidden)
- ❌ Scooters (Hidden)

**Key Features:**

- Log new deliveries with complete details
- Track partner performance
- View courier performance reports
- Access delivery analytics and statistics
- Monitor monthly delivery volumes

**Quick Actions:**

- - Log Delivery
- - Add Partner

**Use Case:** Operations manager tracking daily deliveries and partner coordination.

---

## 🟨 MANAGER (Couriers & Reports)

**Description:** Limited access for courier management and performance monitoring.

**Accessible Pages:**

- ✅ Dashboard (Courier-focused overview)
- ✅ Couriers (Add and manage couriers)
- ✅ Reports (Courier performance reports)
- ❌ On-Duty Tracking (Hidden)
- ❌ Deliveries (Hidden)
- ❌ Scooters (Hidden)
- ❌ Partners (Hidden)

**Key Features:**

- Add new couriers with detailed information
- Manage courier profiles and assignments
- View courier performance metrics
- Track courier delivery counts and ratings
- Monitor working hours and scooter assignments

**Quick Actions:**

- - Add New Courier

**Use Case:** HR or team lead managing courier roster and performance.

---

## Login Credentials

### Demo Accounts

Use these to test each role:

| Role     | Username   | Password |
| -------- | ---------- | -------- |
| Admin    | `admin`    | (empty)  |
| Operator | `operator` | (empty)  |
| Manager  | `manager`  | (empty)  |

Simply enter the username on the login page and click the corresponding role button or use the demo account shortcuts.

---

## Color Scheme

- **Primary Brand Color:** Green (#22c55e - Emerald/Prinesi Green)
- **Sidebar:** Dark green background with lighter green accents
- **Buttons:** Green gradient (different shades for different actions)
- **Status Indicators:** Green (good), Orange (maintenance), Red (damaged)

---

## Navigation by Role

### Admin Sidebar (Full Access)

```
🏠 Dashboard
👥 Couriers
⏰ On-Duty
📦 Deliveries
🛵 Scooters
🤝 Partners
📊 Reports
🚪 Logout
```

### Operator Sidebar

```
🏠 Dashboard
📦 Deliveries
🤝 Partners
📊 Reports
🚪 Logout
```

### Manager Sidebar

```
🏠 Dashboard
👥 Couriers
📊 Reports
🚪 Logout
```

---

## Features Summary Table

| Feature          | Admin | Operator | Manager |
| ---------------- | :---: | :------: | :-----: |
| Dashboard        |  ✅   |    ✅    |   ✅    |
| Couriers         |  ✅   |    ❌    |   ✅    |
| On-Duty Tracking |  ✅   |    ❌    |   ❌    |
| Deliveries       |  ✅   |    ✅    |   ❌    |
| Scooters         |  ✅   |    ❌    |   ❌    |
| Partners         |  ✅   |    ✅    |   ❌    |
| Reports          |  ✅   |    ✅    |   ✅    |
| Add Courier      |  ✅   |    ❌    |   ✅    |
| Log Delivery     |  ✅   |    ✅    |   ❌    |
| Manage Scooters  |  ✅   |    ❌    |   ❌    |
| Add Partner      |  ✅   |    ✅    |   ❌    |

---

## Implementation Details

### Authentication

- Built with React Context API (`AuthContext`)
- Session stored in component state (can be extended to localStorage/backend)
- Protected routes with role validation
- Automatic redirect to login if not authenticated

### Routes Protected By Role

- `/couriers` → Admin, Manager
- `/on-duty` → Admin only
- `/deliveries` → Admin, Operator
- `/partners` → Admin, Operator
- `/scooters` → Admin only
- `/reports` → All roles (Admin, Operator, Manager)

### Logout

- Available in the top-right corner of every page
- Displays current username and role
- Returns to login page on logout

---

## Future Enhancements

1. **Backend Integration:** Connect to API for persistent authentication
2. **Database Sessions:** Store user sessions securely
3. **Permission Levels:** More granular permissions (read-only, edit, delete)
4. **Activity Logging:** Track user actions for compliance
5. **Two-Factor Authentication:** Enhanced security for admin accounts
6. **Custom Roles:** Create custom roles with specific permissions
