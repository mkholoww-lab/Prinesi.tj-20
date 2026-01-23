import Layout from "@/components/Layout";
import { Package, Users, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const stats = [
    {
      label: "Active Couriers",
      value: "12",
      icon: Users,
      color: "bg-blue-500",
      href: "/couriers",
    },
    {
      label: "Total Deliveries",
      value: "248",
      icon: Package,
      color: "bg-orange-500",
      href: "/deliveries",
    },
    {
      label: "Scooters",
      value: "8",
      icon: Package,
      color: "bg-indigo-500",
      href: "/scooters",
    },
    {
      label: "Partners",
      value: "18",
      icon: Users,
      color: "bg-green-500",
      href: "/partners",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold mb-2">Welcome to CourierHub</h1>
          <p className="text-blue-50 text-lg">
            Manage your courier operations efficiently with real-time tracking
            and detailed reporting
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
              <Link
                to="/couriers"
                className="block w-full bg-primary hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
              >
                + Add New Courier
              </Link>
              <Link
                to="/deliveries"
                className="block w-full bg-secondary hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
              >
                + Log Delivery
              </Link>
              <Link
                to="/partners"
                className="block w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
              >
                + Add Partner
              </Link>
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
              <p className="text-xs text-green-500 mt-2">+12% from last month</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Total Distance
              </p>
              <p className="text-3xl font-bold text-primary">3,847 km</p>
              <p className="text-xs text-green-500 mt-2">Average per delivery</p>
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
