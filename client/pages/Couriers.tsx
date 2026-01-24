import Layout from "@/components/Layout";
import { useState } from "react";
import { Plus, Edit, Trash2, Search, ChevronDown, ChevronUp, Camera, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Courier {
  id: string;
  name: string;
  phone: string;
  email: string;
  parentPhone: string;
  passportNumber: string;
  scooterNumber: string;
  govRegNumber: string;
  workStartTime: string;
  workEndTime: string;
  status: "active" | "inactive";
  joinDate: string;
  photo?: string;
  passportPhoto?: string;
}

export default function CouriersPage() {
  const [couriers, setCouriers] = useState<Courier[]>([
    {
      id: "1",
      name: "Ali Rahmani",
      phone: "+992 901 23 45 67",
      email: "ali@example.com",
      parentPhone: "+992 901 11 22 33",
      passportNumber: "ТЙ 123456",
      scooterNumber: "SCTR-001",
      govRegNumber: "ТЙ 12345 ТА",
      workStartTime: "08:00",
      workEndTime: "18:00",
      status: "active",
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Fatima Shodiev",
      phone: "+992 902 34 56 78",
      email: "fatima@example.com",
      parentPhone: "+992 902 22 33 44",
      passportNumber: "ТЙ 234567",
      scooterNumber: "SCTR-002",
      govRegNumber: "ТЙ 12346 ТА",
      workStartTime: "09:00",
      workEndTime: "19:00",
      status: "active",
      joinDate: "2024-02-20",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [expandedCourier, setExpandedCourier] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    parentPhone: "",
    passportNumber: "",
    scooterNumber: "",
    govRegNumber: "",
    workStartTime: "08:00",
    workEndTime: "18:00",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddCourier = () => {
    if (
      formData.name &&
      formData.phone &&
      formData.email &&
      formData.parentPhone &&
      formData.passportNumber &&
      formData.scooterNumber &&
      formData.govRegNumber
    ) {
      const newCourier: Courier = {
        id: String(couriers.length + 1),
        ...formData,
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
      };
      setCouriers([...couriers, newCourier]);
      setFormData({
        name: "",
        phone: "",
        email: "",
        parentPhone: "",
        passportNumber: "",
        scooterNumber: "",
        govRegNumber: "",
        workStartTime: "08:00",
        workEndTime: "18:00",
      });
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
              Manage and track your courier staff with detailed information
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
            <h2 className="text-xl font-bold mb-6 text-foreground">
              Add New Courier
            </h2>

            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    type="tel"
                    placeholder="Parent/Guardian Phone"
                    value={formData.parentPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, parentPhone: e.target.value })
                    }
                    className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Document Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Document Information
                </h3>
                <input
                  type="text"
                  placeholder="Passport Number (e.g. ТЙ 123456)"
                  value={formData.passportNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, passportNumber: e.target.value })
                  }
                  className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full"
                />
              </div>

              {/* Scooter Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Scooter Assignment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Scooter Number (e.g. SCTR-001)"
                    value={formData.scooterNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, scooterNumber: e.target.value })
                    }
                    className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Government Reg. Number (e.g. ТЙ 12345 ТА)"
                    value={formData.govRegNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, govRegNumber: e.target.value })
                    }
                    className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Working Hours */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Working Hours
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={formData.workStartTime}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          workStartTime: e.target.value,
                        })
                      }
                      className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={formData.workEndTime}
                      onChange={(e) =>
                        setFormData({ ...formData, workEndTime: e.target.value })
                      }
                      className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
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

        {/* Couriers List */}
        <div className="space-y-4">
          {filteredCouriers.map((courier) => (
            <div
              key={courier.id}
              className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-border overflow-hidden"
            >
              <div
                onClick={() =>
                  setExpandedCourier(
                    expandedCourier === courier.id ? null : courier.id
                  )
                }
                className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    {courier.name}
                  </h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>{courier.phone}</span>
                    <span>•</span>
                    <span>{courier.scooterNumber}</span>
                    <span>•</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        courier.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                      }`}
                    >
                      {courier.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCourier(courier.id);
                    }}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  {expandedCourier === courier.id ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>

              {expandedCourier === courier.id && (
                <div className="border-t border-border px-6 py-6 bg-gray-50 dark:bg-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Basic Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Email</p>
                          <p className="text-foreground">{courier.email}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Join Date</p>
                          <p className="text-foreground">
                            {new Date(courier.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Contact Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Phone</p>
                          <p className="text-foreground">{courier.phone}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Parent/Guardian Phone
                          </p>
                          <p className="text-foreground">
                            {courier.parentPhone}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Document */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Documents
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            Passport Number
                          </p>
                          <p className="text-foreground">
                            {courier.passportNumber}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Scooter Info */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Scooter Assignment
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            Scooter Number
                          </p>
                          <p className="text-foreground font-medium text-primary">
                            {courier.scooterNumber}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Gov. Registration
                          </p>
                          <p className="text-foreground">
                            {courier.govRegNumber}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Working Hours
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Shift</p>
                          <p className="text-foreground font-medium">
                            {courier.workStartTime} - {courier.workEndTime}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
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
