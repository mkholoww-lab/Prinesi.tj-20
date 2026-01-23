import Layout from "@/components/Layout";
import { Package, Users, Clock, TrendingUp, Bike } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { user, hasAccess } = useAuth();
  const allStats = [
    {
      label: "Active Couriers",
      value: "12",
      icon: Users,
      color: "bg-blue-500",
      href: "/couriers",
      roles: ["admin", "manager"] as const,
    },
    {
      label: "Total Deliveries",
      value: "248",
      icon: Package,
      color: "bg-orange-500",
      href: "/deliveries",
      roles: ["admin", "operator"] as const,
    },
    {
      label: "Scooters",
      value: "8",
      icon: Bike,
      color: "bg-indigo-500",
      href: "/scooters",
      roles: ["admin"] as const,
    },
    {
      label: "Partners",
      value: "18",
      icon: Users,
      color: "bg-green-500",
      href: "/partners",
      roles: ["admin", "operator"] as const,
    },
  ];

  const stats = allStats.filter((stat) => hasAccess(stat.roles));

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-green-600 rounded-xl p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold mb-2">
            Welcome, {user?.username}!
          </h1>
          <p className="text-green-50 text-lg">
            {user?.role === "admin"
              ? "Full system access. Manage all operations, couriers, scooters, and view analytics."
              : user?.role === "operator"
                ? "Access to deliveries, partners, and comprehensive reports."
                : "Manage couriers and view performance reports."}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                to={stat.href}
                className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-8 shadow-sm border border-border">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Quick Actions
            </h2>
            <div className="space-y-3">
              {hasAccess(["admin", "manager"]) && (
                <Link
                  to="/couriers"
                  className="block w-full bg-primary hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
                >
                  + Add New Courier
                </Link>
              )}
              {hasAccess(["admin", "operator"]) && (
                <Link
                  to="/deliveries"
                  className="block w-full bg-secondary hover:bg-teal-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
                >
                  + Log Delivery
                </Link>
              )}
              {hasAccess(["admin"]) && (
                <Link
                  to="/scooters"
                  className="block w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
                >
                  + Manage Scooters
                </Link>
              )}
              {hasAccess(["admin", "operator"]) && (
                <Link
                  to="/partners"
                  className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
                >
                  + Add Partner
                </Link>
              )}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg p-8 shadow-sm border border-border">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 pb-4 border-b border-border">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Delivery completed
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Order #2847 - 2 hours ago
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 pb-4 border-b border-border">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    New courier added
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Ali Rahmani - 1 day ago
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Partner onboarded
                  </p>
                  <p className="text-xs text-muted-foreground">
                    TechStore - 3 days ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="bg-white dark:bg-slate-900 rounded-lg p-8 shadow-sm border border-border">
          <h2 className="text-2xl font-bold mb-6 text-foreground">
            Key Metrics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Monthly Deliveries
              </p>
              <p className="text-3xl font-bold text-primary">1,246</p>
              <p className="text-xs text-green-500 mt-2">
                +12% from last month
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Total Distance
              </p>
              <p className="text-3xl font-bold text-primary">3,847 km</p>
              <p className="text-xs text-green-500 mt-2">
                Average per delivery
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Avg. Delivery Time
              </p>
              <p className="text-3xl font-bold text-primary">2.4 hrs</p>
              <p className="text-xs text-green-500 mt-2">Improved by 8%</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
