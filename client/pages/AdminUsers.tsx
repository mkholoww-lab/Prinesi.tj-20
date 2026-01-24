import Layout from "@/components/Layout";
import { useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Plus, Trash2, Search, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminUsersPage() {
  const { user, allUsers, createUser, deleteUser, getAllUsers } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    role: "operator" as UserRole,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!user || user.role !== "admin") {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-600">
            Only administrators can access this page
          </p>
        </div>
      </Layout>
    );
  }

  const handleAddUser = () => {
    setError("");
    setSuccess("");

    if (
      !formData.username.trim() ||
      !formData.password ||
      !formData.name.trim()
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (createUser(formData.username, formData.password, formData.role, formData.name)) {
      setSuccess("User created successfully!");
      setFormData({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        role: "operator",
      });
      setShowForm(false);
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError("Username already exists");
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this user? This action cannot be undone."
      )
    ) {
      if (deleteUser(userId)) {
        setSuccess("User deleted successfully");
        setTimeout(() => setSuccess(""), 3000);
      }
    }
  };

  const filteredUsers = getAllUsers().filter(
    (u) =>
      u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const roleColors: Record<UserRole, string> = {
    admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    operator: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    manager: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              User Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Create and manage system users
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create User
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-green-700 dark:text-green-300">
              {success}
            </p>
          </div>
        )}

        {/* Create User Form */}
        {showForm && (
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-border">
            <h2 className="text-xl font-bold mb-6 text-foreground">
              Create New User
            </h2>

            {error && (
              <div className="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as UserRole,
                    })
                  }
                  className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="admin">Admin - Full Access</option>
                  <option value="operator">
                    Operator - Deliveries & Reports
                  </option>
                  <option value="manager">Manager - Couriers & Reports</option>
                </select>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  onClick={handleAddUser}
                  className="flex-1 bg-primary hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Create User
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-muted hover:bg-gray-300 text-foreground font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search by username or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-gray-50 dark:bg-slate-800">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-border hover:bg-gray-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {u.username}
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">
                      {u.name}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                          roleColors[u.role]
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {u.lastLogin
                        ? new Date(u.lastLogin).toLocaleString()
                        : "Never"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        disabled={u.id === user.id}
                        className={`flex items-center gap-1 ${
                          u.id === user.id
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-red-500 hover:text-red-600"
                        } transition-colors`}
                        title={u.id === user.id ? "Cannot delete yourself" : "Delete user"}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No users found
            </div>
          )}
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Total Users</p>
            <p className="text-3xl font-bold text-primary">
              {getAllUsers().length}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Admins</p>
            <p className="text-3xl font-bold text-red-500">
              {getAllUsers().filter((u) => u.role === "admin").length}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Other Users</p>
            <p className="text-3xl font-bold text-blue-500">
              {getAllUsers().filter((u) => u.role !== "admin").length}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
