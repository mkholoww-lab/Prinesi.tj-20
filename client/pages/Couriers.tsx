import Layout from "@/components/Layout";
import { useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";

interface Courier {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: "active" | "inactive";
  joinDate: string;
}

export default function CouriersPage() {
  const [couriers, setCouriers] = useState<Courier[]>([
    {
      id: "1",
      name: "Ali Rahmani",
      phone: "+992 901 23 45 67",
      email: "ali@example.com",
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Fatima Shodiev",
      phone: "+992 902 34 56 78",
      email: "fatima@example.com",
      status: "active",
      joinDate: "2024-02-20",
    },
    {
      id: "3",
      name: "Rustam Mirzoev",
      phone: "+992 903 45 67 89",
      email: "rustam@example.com",
      status: "inactive",
      joinDate: "2023-11-10",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddCourier = () => {
    if (formData.name && formData.phone && formData.email) {
      const newCourier: Courier = {
        id: String(couriers.length + 1),
        ...formData,
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
      };
      setCouriers([...couriers, newCourier]);
      setFormData({ name: "", phone: "", email: "" });
      setShowForm(false);
    }
  };

  const handleDeleteCourier = (id: string) => {
    setCouriers(couriers.filter((c) => c.id !== id));
  };

  const filteredCouriers = couriers.filter(
    (courier) =>
      courier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      courier.phone.includes(searchTerm) ||
      courier.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Couriers</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your courier staff
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Courier
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-border">
            <h2 className="text-xl font-bold mb-4 text-foreground">
              Add New Courier
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddCourier}
                className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Save Courier
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-muted hover:bg-gray-300 text-foreground font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Couriers Table */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-gray-50 dark:bg-slate-800">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Join Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCouriers.map((courier) => (
                  <tr
                    key={courier.id}
                    className="border-b border-border hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground">
                      {courier.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {courier.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {courier.email}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          courier.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        }`}
                      >
                        {courier.status === "active"
                          ? "Active"
                          : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {new Date(courier.joinDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="text-primary hover:text-blue-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCourier(courier.id)}
                          className="text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredCouriers.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-lg border border-border">
            <p className="text-muted-foreground">No couriers found</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
