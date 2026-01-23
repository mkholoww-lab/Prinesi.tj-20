import Layout from "@/components/Layout";
import { useState } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";

interface Delivery {
  id: string;
  orderNumber: string;
  partner: string;
  courier: string;
  pointA: string;
  pointB: string;
  distance: number;
  notes: string;
  status: "pending" | "in-transit" | "completed";
  date: string;
}

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      partner: "TechStore",
      courier: "Ali Rahmani",
      pointA: "TechStore Main, Rudaki Ave",
      pointB: "Customer Home, Somoni St",
      distance: 12.5,
      notes: "Fragile - Handle with care",
      status: "completed",
      date: "2024-01-15",
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      partner: "FashionHub",
      courier: "Fatima Shodiev",
      pointA: "FashionHub Warehouse, Varzob Rd",
      pointB: "Customer Office, Miroj St",
      distance: 8.3,
      notes: "",
      status: "in-transit",
      date: "2024-01-15",
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      partner: "GroceryMart",
      courier: "Rustam Mirzoev",
      pointA: "GroceryMart Distribution, Airport Rd",
      pointB: "Restaurant, Bohtar St",
      distance: 15.7,
      notes: "Perishable goods - Keep cool",
      status: "pending",
      date: "2024-01-15",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    orderNumber: "",
    partner: "",
    courier: "",
    pointA: "",
    pointB: "",
    distance: "",
    notes: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddDelivery = () => {
    if (
      formData.orderNumber &&
      formData.partner &&
      formData.courier &&
      formData.pointA &&
      formData.pointB &&
      formData.distance
    ) {
      const newDelivery: Delivery = {
        id: String(deliveries.length + 1),
        ...formData,
        distance: parseFloat(formData.distance),
        status: "pending",
        date: new Date().toISOString().split("T")[0],
      };
      setDeliveries([...deliveries, newDelivery]);
      setFormData({
        orderNumber: "",
        partner: "",
        courier: "",
        pointA: "",
        pointB: "",
        distance: "",
        notes: "",
      });
      setShowForm(false);
    }
  };

  const handleDeleteDelivery = (id: string) => {
    setDeliveries(deliveries.filter((d) => d.id !== id));
  };

  const handleUpdateStatus = (id: string, newStatus: Delivery["status"]) => {
    setDeliveries(
      deliveries.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
  };

  const filteredDeliveries = deliveries.filter(
    (delivery) =>
      delivery.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.courier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Deliveries</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage all deliveries
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Log Delivery
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Total Deliveries</p>
            <p className="text-3xl font-bold text-primary">{deliveries.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-500">
              {deliveries.filter((d) => d.status === "completed").length}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Total Distance</p>
            <p className="text-3xl font-bold text-primary">
              {deliveries.reduce((sum, d) => sum + d.distance, 0).toFixed(1)} km
            </p>
          </div>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-border">
            <h2 className="text-xl font-bold mb-4 text-foreground">
              Log New Delivery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Order Number (e.g. ORD-2024-001)"
                value={formData.orderNumber}
                onChange={(e) =>
                  setFormData({ ...formData, orderNumber: e.target.value })
                }
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Partner Name"
                value={formData.partner}
                onChange={(e) =>
                  setFormData({ ...formData, partner: e.target.value })
                }
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Courier Name"
                value={formData.courier}
                onChange={(e) =>
                  setFormData({ ...formData, courier: e.target.value })
                }
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="number"
                placeholder="Distance (km)"
                value={formData.distance}
                onChange={(e) =>
                  setFormData({ ...formData, distance: e.target.value })
                }
                step="0.1"
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Point A (Pickup Location)"
                value={formData.pointA}
                onChange={(e) =>
                  setFormData({ ...formData, pointA: e.target.value })
                }
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Point B (Delivery Location)"
                value={formData.pointB}
                onChange={(e) =>
                  setFormData({ ...formData, pointB: e.target.value })
                }
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <textarea
              placeholder="Notes (optional)"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddDelivery}
                className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Save Delivery
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
            placeholder="Search by order number, partner, or courier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Deliveries List */}
        <div className="space-y-4">
          {filteredDeliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {delivery.orderNumber}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {delivery.partner} → {delivery.courier}
                  </p>
                </div>
                <div className="text-right">
                  <select
                    value={delivery.status}
                    onChange={(e) =>
                      handleUpdateStatus(
                        delivery.id,
                        e.target.value as Delivery["status"]
                      )
                    }
                    className={`px-3 py-1 rounded-lg text-sm font-medium border-none cursor-pointer ${
                      delivery.status === "completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : delivery.status === "in-transit"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-transit">In Transit</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 dark:bg-slate-800 rounded-lg p-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Pickup Location
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {delivery.pointA}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Delivery Location
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {delivery.pointB}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Distance
                  </p>
                  <p className="text-lg font-bold text-primary">
                    {delivery.distance} km
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Date</p>
                  <p className="text-sm text-foreground">
                    {new Date(delivery.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {delivery.notes && (
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-1">Notes</p>
                  <p className="text-sm text-foreground italic">
                    {delivery.notes}
                  </p>
                </div>
              )}

              <div className="flex gap-2 justify-end">
                <button className="text-primary hover:text-blue-600 transition-colors p-2">
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteDelivery(delivery.id)}
                  className="text-red-500 hover:text-red-600 transition-colors p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDeliveries.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-lg border border-border">
            <p className="text-muted-foreground">No deliveries found</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
