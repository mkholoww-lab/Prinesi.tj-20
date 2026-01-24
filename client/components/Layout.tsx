import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Package,
  Users,
  Clock,
  FileText,
  BarChart3,
  Menu,
  X,
  Bike,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, hasAccess } = useAuth();

  const navigationItems = [
    { name: "Dashboard", href: "/", icon: BarChart3, roles: ["admin", "operator", "manager"] as const },
    { name: "Couriers", href: "/couriers", icon: Users, roles: ["admin"] as const },
    { name: "On-Duty", href: "/on-duty", icon: Clock, roles: ["admin"] as const },
    { name: "Deliveries", href: "/deliveries", icon: Package, roles: ["admin", "operator"] as const },
    { name: "Scooters", href: "/scooters", icon: Bike, roles: ["admin"] as const },
    { name: "Partners", href: "/partners", icon: Users, roles: ["admin"] as const },
    { name: "Reports", href: "/reports", icon: FileText, roles: ["admin", "operator", "manager"] as const },
    { name: "Settings", href: "/settings", icon: X, roles: ["admin", "operator", "manager"] as const },
    { name: "Users", href: "/admin/users", icon: Users, roles: ["admin"] as const },
  ];

  const navigation = navigationItems.filter((item) => hasAccess(item.roles));

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out z-40",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Logo/Brand */}
        <div className="h-16 border-b border-sidebar-border flex items-center justify-center px-4">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F8cc0bb9fe0d443f9a8b7366b133cf86b%2F524b9bb04585458cb8e202d0dd9acde4?format=webp&width=800&height=1200"
              alt="Prinesi.tj"
              className="w-8 h-8 flex-shrink-0"
            />
            {sidebarOpen && (
              <span className="font-bold text-lg">Prinesi.tj</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-200",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  )}
                  title={!sidebarOpen ? item.name : ""}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent/50 rounded-lg p-2 transition-colors"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          sidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        {/* Header */}
        <div className="h-16 bg-white dark:bg-slate-900 border-b border-border flex items-center justify-between px-6 shadow-sm">
          <h1 className="text-xl font-semibold text-foreground">
            Courier Service Management
          </h1>
          {user && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{user.username}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors p-2"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
