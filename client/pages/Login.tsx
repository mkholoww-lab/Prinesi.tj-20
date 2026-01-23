import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim()) {
      login(username, selectedRole);
      navigate("/");
    }
  };

  const roles: {
    id: UserRole;
    title: string;
    description: string;
    color: string;
  }[] = [
    {
      id: "admin",
      title: "Admin",
      description: "Full access to all features and settings",
      color: "from-green-500 to-green-600",
    },
    {
      id: "operator",
      title: "Operator",
      description: "Access to orders, partners, and reports",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: "manager",
      title: "Manager",
      description: "Manage couriers and view reports",
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F8cc0bb9fe0d443f9a8b7366b133cf86b%2F524b9bb04585458cb8e202d0dd9acde4?format=webp&width=800&height=1200"
              alt="Prinesi.tj"
              className="w-16 h-16"
            />
          </div>
          <h1 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
            Prinesi.tj
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Courier Management System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 space-y-6">
          {/* Username Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              placeholder="Enter your username"
              className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900 transition-all"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Select Your Role
            </label>
            <div className="space-y-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedRole === role.id
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-slate-800 hover:border-green-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {role.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {role.description}
                      </p>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        selectedRole === role.id
                          ? "border-green-500 bg-green-500"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedRole === role.id && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={!username.trim()}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            Login as{" "}
            {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
          </button>

          {/* Demo Accounts */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 text-center">
              Demo Accounts
            </p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setUsername("admin");
                  setSelectedRole("admin");
                }}
                className="w-full text-sm text-green-600 dark:text-green-400 hover:text-green-700 py-2"
              >
                Use Demo Admin
              </button>
              <button
                onClick={() => {
                  setUsername("operator");
                  setSelectedRole("operator");
                }}
                className="w-full text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 py-2"
              >
                Use Demo Operator
              </button>
              <button
                onClick={() => {
                  setUsername("manager");
                  setSelectedRole("manager");
                }}
                className="w-full text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 py-2"
              >
                Use Demo Manager
              </button>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { icon: "📦", label: "Deliveries" },
            { icon: "👥", label: "Couriers" },
            { icon: "🛵", label: "Scooters" },
          ].map((feature) => (
            <div
              key={feature.label}
              className="text-center text-white dark:text-gray-300"
            >
              <div className="text-3xl mb-2">{feature.icon}</div>
              <p className="text-sm font-medium">{feature.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
