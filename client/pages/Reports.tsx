import Layout from "@/components/Layout";
import { useState } from "react";
import { Calendar, Download, TrendingUp, ChevronDown } from "lucide-react";

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("month");
  const [expandedScooter, setExpandedScooter] = useState<string | null>(null);

  const courierReports = [
    {
      name: "Ali Rahmani",
      deliveries: 145,
      distance: 487.5,
      avgRating: 4.9,
      earnings: 4500,
    },
    {
      name: "Fatima Shodiev",
      deliveries: 128,
      distance: 421.3,
      avgRating: 4.7,
      earnings: 3900,
    },
    {
      name: "Rustam Mirzoev",
      deliveries: 112,
      distance: 356.8,
      avgRating: 4.5,
      earnings: 3400,
    },
  ];

  const partnerReports = [
    {
      name: "TechStore",
      orders: 487,
      volume: 54300,
      avgOrderValue: 111.5,
      rating: 4.8,
    },
    {
      name: "FashionHub",
      orders: 342,
      volume: 38200,
      avgOrderValue: 111.7,
      rating: 4.6,
    },
    {
      name: "GroceryMart",
      orders: 521,
      volume: 67850,
      avgOrderValue: 130.2,
      rating: 4.9,
    },
  ];

  const handleExport = (reportType: string) => {
    alert(`Exporting ${reportType} report...`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground mt-1">
              Comprehensive analytics and reports
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">
              Total Deliveries
            </p>
            <p className="text-3xl font-bold text-primary">785</p>
            <p className="text-xs text-green-500 mt-1">+12% from last period</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Revenue</p>
            <p className="text-3xl font-bold text-primary">160,350 сомони</p>
            <p className="text-xs text-green-500 mt-1">+8% from last period</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Avg. Rating</p>
            <p className="text-3xl font-bold text-primary">4.7/5</p>
            <p className="text-xs text-green-500 mt-1">Excellent performance</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Total Distance</p>
            <p className="text-3xl font-bold text-primary">1,265.6 km</p>
            <p className="text-xs text-muted-foreground mt-1">
              Average efficiency
            </p>
          </div>
        </div>

        {/* Courier Performance Report */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Courier Performance
            </h2>
            <button
              onClick={() => handleExport("Courier Performance")}
              className="bg-white/20 hover:bg-white/30 text-white font-medium py-1 px-3 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-gray-50 dark:bg-slate-800">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Courier
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Deliveries
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Distance
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Avg. Rating
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Earnings
                  </th>
                </tr>
              </thead>
              <tbody>
                {courierReports.map((report) => (
                  <tr
                    key={report.name}
                    className="border-b border-border hover:bg-gray-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {report.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {report.deliveries}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {report.distance} km
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-foreground">
                          {report.avgRating}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary">
                      {report.earnings.toLocaleString()} сомони
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Partner Performance Report */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Partner Performance
            </h2>
            <button
              onClick={() => handleExport("Partner Performance")}
              className="bg-white/20 hover:bg-white/30 text-white font-medium py-1 px-3 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-gray-50 dark:bg-slate-800">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Partner
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Volume
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Avg. Order
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody>
                {partnerReports.map((report) => (
                  <tr
                    key={report.name}
                    className="border-b border-border hover:bg-gray-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {report.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {report.orders}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary">
                      {report.volume.toLocaleString()} сомони
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {report.avgOrderValue} сомони
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-foreground">{report.rating}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-border">
            <h3 className="text-lg font-bold mb-4 text-foreground">
              Delivery Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">Completed</span>
                <span className="text-lg font-semibold text-green-500">
                  758
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">
                  In Transit
                </span>
                <span className="text-lg font-semibold text-blue-500">23</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">Pending</span>
                <span className="text-lg font-semibold text-orange-500">4</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Success Rate
                </span>
                <span className="text-lg font-semibold text-primary">
                  96.5%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-border">
            <h3 className="text-lg font-bold mb-4 text-foreground">
              Monthly Revenue
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">
                  Delivery Fees
                </span>
                <span className="text-lg font-semibold text-primary">
                  125,480 сомони
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">
                  Partner Commissions
                </span>
                <span className="text-lg font-semibold text-muted-foreground">
                  34,870 сомони
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <span className="text-sm text-muted-foreground">
                  Net Income
                </span>
                <span className="text-lg font-semibold text-green-500">
                  90,610 сомони
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Margin</span>
                <span className="text-lg font-semibold text-primary">
                  56.5%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scooter Condition Report */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              Scooter Fleet Report
            </h2>
            <button
              onClick={() => handleExport("Scooter Report")}
              className="bg-white/20 hover:bg-white/30 text-white font-medium py-1 px-3 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 border-b border-border">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Total Scooters
              </p>
              <p className="text-2xl font-bold text-primary">8</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Good Condition
              </p>
              <p className="text-2xl font-bold text-green-500">6</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Needs Maintenance
              </p>
              <p className="text-2xl font-bold text-orange-500">1</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Damaged</p>
              <p className="text-2xl font-bold text-red-500">1</p>
            </div>
          </div>

          {/* Scooter List */}
          <div className="divide-y divide-border">
            {[
              {
                id: "1",
                number: "SCTR-001",
                courier: "Ali Rahmani",
                mileage: 5420,
                status: "good",
                equipment: 6,
                issues: "None",
              },
              {
                id: "2",
                number: "SCTR-002",
                courier: "Fatima Shodiev",
                mileage: 4850,
                status: "maintenance",
                equipment: 4,
                issues: "Brake pads, Missing shorts",
              },
              {
                id: "3",
                number: "SCTR-003",
                courier: "Unassigned",
                mileage: 6200,
                status: "good",
                equipment: 6,
                issues: "None",
              },
              {
                id: "4",
                number: "SCTR-004",
                courier: "Rustam Mirzoev",
                mileage: 3450,
                status: "damaged",
                equipment: 3,
                issues: "Engine malfunction, Multiple parts damaged",
              },
            ].map((scooter) => (
              <div key={scooter.id} className="px-6 py-4">
                <button
                  onClick={() =>
                    setExpandedScooter(
                      expandedScooter === scooter.id ? null : scooter.id,
                    )
                  }
                  className="w-full flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 py-2 rounded transition-colors"
                >
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-foreground">
                        {scooter.number}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          scooter.status === "good"
                            ? "bg-green-100 text-green-800"
                            : scooter.status === "maintenance"
                              ? "bg-orange-100 text-orange-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {scooter.status === "good"
                          ? "Good"
                          : scooter.status === "maintenance"
                            ? "Maintenance"
                            : "Damaged"}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {scooter.courier} • {scooter.mileage} km
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      expandedScooter === scooter.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedScooter === scooter.id && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground mb-1">Mileage</p>
                        <p className="font-medium text-foreground">
                          {scooter.mileage} km
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Equipment</p>
                        <p className="font-medium text-foreground">
                          {scooter.equipment}/6 items
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">Condition</p>
                        <p
                          className={`font-medium ${
                            scooter.status === "good"
                              ? "text-green-500"
                              : scooter.status === "maintenance"
                                ? "text-orange-500"
                                : "text-red-500"
                          }`}
                        >
                          {scooter.status === "good"
                            ? "Excellent"
                            : scooter.status === "maintenance"
                              ? "Needs Service"
                              : "In Repair"}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground mb-1">
                          Assigned To
                        </p>
                        <p className="font-medium text-foreground">
                          {scooter.courier}
                        </p>
                      </div>
                    </div>
                    {scooter.issues !== "None" && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3">
                        <p className="text-sm font-medium text-red-700 dark:text-red-300">
                          Issues: {scooter.issues}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-lg p-6 text-white shadow-lg">
          <h3 className="text-xl font-bold mb-4">Export Reports</h3>
          <p className="mb-4 text-blue-50">
            Download comprehensive reports in your preferred format
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => handleExport("PDF")}
              className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export as PDF
            </button>
            <button
              onClick={() => handleExport("Excel")}
              className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export as Excel
            </button>
            <button
              onClick={() => handleExport("CSV")}
              className="bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export as CSV
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
