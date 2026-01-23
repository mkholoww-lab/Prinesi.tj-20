import Layout from "@/components/Layout";
import { useState } from "react";
import { Plus, Trash2, Search, ChevronDown, ChevronUp } from "lucide-react";

interface EquipmentStatus {
  key: boolean;
  documents: boolean;
  helmet: boolean;
  gloves: boolean;
  jacket: boolean;
  shorts: boolean;
}

interface Scooter {
  id: string;
  scooterNumber: string;
  govRegNumber: string;
  assignedCourier: string;
  model: string;
  purchaseDate: string;
  currentMileage: number;
  equipment: EquipmentStatus;
  problems: string;
  notes: string;
  lastCheckDate: string;
  status: "good" | "maintenance" | "damaged";
}

export default function ScootersPage() {
  const [scooters, setScooters] = useState<Scooter[]>([
    {
      id: "1",
      scooterNumber: "SCTR-001",
      govRegNumber: "ТЙ 12345 ТА",
      assignedCourier: "Ali Rahmani",
      model: "Yamaha Jog 50cc",
      purchaseDate: "2023-06-15",
      currentMileage: 5420,
      equipment: {
        key: true,
        documents: true,
        helmet: true,
        gloves: true,
        jacket: true,
        shorts: true,
      },
      problems: "Minor scratches on left side panel",
      notes: "Regular maintenance done. Tire replacement due in 500km",
      lastCheckDate: "2024-01-10",
      status: "good",
    },
    {
      id: "2",
      scooterNumber: "SCTR-002",
      govRegNumber: "ТЙ 12346 ТА",
      assignedCourier: "Fatima Shodiev",
      model: "Yamaha Jog 50cc",
      purchaseDate: "2023-08-20",
      currentMileage: 4850,
      equipment: {
        key: true,
        documents: true,
        helmet: false,
        gloves: true,
        jacket: true,
        shorts: false,
      },
      problems: "Brake pads need replacement",
      notes: "New uniform needed - shorts were lost",
      lastCheckDate: "2024-01-08",
      status: "maintenance",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [expandedScooter, setExpandedScooter] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    scooterNumber: "",
    govRegNumber: "",
    assignedCourier: "",
    model: "",
    purchaseDate: "",
    currentMileage: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddScooter = () => {
    if (
      formData.scooterNumber &&
      formData.govRegNumber &&
      formData.assignedCourier &&
      formData.model &&
      formData.purchaseDate &&
      formData.currentMileage
    ) {
      const newScooter: Scooter = {
        id: String(scooters.length + 1),
        ...formData,
        currentMileage: parseInt(formData.currentMileage),
        equipment: {
          key: true,
          documents: true,
          helmet: true,
          gloves: true,
          jacket: true,
          shorts: true,
        },
        problems: "",
        notes: "",
        lastCheckDate: new Date().toISOString().split("T")[0],
        status: "good",
      };
      setScooters([...scooters, newScooter]);
      setFormData({
        scooterNumber: "",
        govRegNumber: "",
        assignedCourier: "",
        model: "",
        purchaseDate: "",
        currentMileage: "",
      });
      setShowForm(false);
    }
  };

  const handleDeleteScooter = (id: string) => {
    setScooters(scooters.filter((s) => s.id !== id));
  };

  const handleEquipmentToggle = (scooterId: string, equipment: keyof EquipmentStatus) => {
    setScooters(
      scooters.map((s) =>
        s.id === scooterId
          ? {
              ...s,
              equipment: {
                ...s.equipment,
                [equipment]: !s.equipment[equipment],
              },
            }
          : s
      )
    );
  };

  const handleUpdateProblems = (id: string, problems: string) => {
    setScooters(
      scooters.map((s) => (s.id === id ? { ...s, problems } : s))
    );
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    setScooters(
      scooters.map((s) => (s.id === id ? { ...s, notes } : s))
    );
  };

  const filteredScooters = scooters.filter(
    (scooter) =>
      scooter.scooterNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scooter.assignedCourier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scooter.govRegNumber.includes(searchTerm)
  );

  const equipmentLabels: Record<keyof EquipmentStatus, string> = {
    key: "Key",
    documents: "Documents",
    helmet: "Helmet",
    gloves: "Gloves",
    jacket: "Jacket",
    shorts: "Shorts",
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Scooters</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track scooter fleet with monthly maintenance
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Scooter
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Total Scooters</p>
            <p className="text-3xl font-bold text-primary">{scooters.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">In Good Condition</p>
            <p className="text-3xl font-bold text-green-500">
              {scooters.filter((s) => s.status === "good").length}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Needs Maintenance</p>
            <p className="text-3xl font-bold text-orange-500">
              {scooters.filter((s) => s.status === "maintenance").length}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Damaged</p>
            <p className="text-3xl font-bold text-red-500">
              {scooters.filter((s) => s.status === "damaged").length}
            </p>
          </div>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-border">
            <h2 className="text-xl font-bold mb-6 text-foreground">
              Add New Scooter
            </h2>

            <div className="space-y-6">
              {/* Scooter Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Scooter Information
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
                  <input
                    type="text"
                    placeholder="Model (e.g. Yamaha Jog 50cc)"
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                    className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) =>
                      setFormData({ ...formData, purchaseDate: e.target.value })
                    }
                    className="px-4 py-2 border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Assignment */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Courier Assignment
                </h3>
                <input
                  type="text"
                  placeholder="Assigned Courier Name"
                  value={formData.assignedCourier}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      assignedCourier: e.target.value,
                    })
                  }
                  className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full"
                />
              </div>

              {/* Mileage */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Initial Mileage
                </h3>
                <input
                  type="number"
                  placeholder="Current Mileage (km)"
                  value={formData.currentMileage}
                  onChange={(e) =>
                    setFormData({ ...formData, currentMileage: e.target.value })
                  }
                  className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleAddScooter}
                className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Save Scooter
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
            placeholder="Search by scooter number, courier, or registration..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Scooters List */}
        <div className="space-y-4">
          {filteredScooters.map((scooter) => (
            <div
              key={scooter.id}
              className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-border overflow-hidden"
            >
              <div
                onClick={() =>
                  setExpandedScooter(
                    expandedScooter === scooter.id ? null : scooter.id
                  )
                }
                className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-bold text-foreground">
                      {scooter.scooterNumber}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        scooter.status === "good"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : scooter.status === "maintenance"
                          ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {scooter.status === "good"
                        ? "Good"
                        : scooter.status === "maintenance"
                        ? "Maintenance"
                        : "Damaged"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {scooter.assignedCourier} • {scooter.model} •{" "}
                    {scooter.currentMileage} km
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteScooter(scooter.id);
                    }}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  {expandedScooter === scooter.id ? (
                    <ChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>

              {expandedScooter === scooter.id && (
                <div className="border-t border-border px-6 py-6 bg-gray-50 dark:bg-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Scooter Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">
                            Registration Number
                          </p>
                          <p className="text-foreground font-medium">
                            {scooter.govRegNumber}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Model</p>
                          <p className="text-foreground">{scooter.model}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Purchase Date</p>
                          <p className="text-foreground">
                            {new Date(scooter.purchaseDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Current Mileage
                          </p>
                          <p className="text-foreground font-medium">
                            {scooter.currentMileage} km
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Assignment */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Courier Assignment
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">Assigned To</p>
                          <p className="text-foreground font-medium">
                            {scooter.assignedCourier}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">
                            Last Check Date
                          </p>
                          <p className="text-foreground">
                            {new Date(scooter.lastCheckDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Equipment Status */}
                  <div className="mt-6">
                    <h4 className="font-semibold text-foreground mb-3">
                      Equipment Status
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {(Object.keys(scooter.equipment) as Array<keyof EquipmentStatus>).map(
                        (equipment) => (
                          <button
                            key={equipment}
                            onClick={() =>
                              handleEquipmentToggle(scooter.id, equipment)
                            }
                            className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                              scooter.equipment[equipment]
                                ? "bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200"
                                : "bg-red-100 border-red-300 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-200"
                            }`}
                          >
                            {equipmentLabels[equipment]}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Issues and Notes */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Scooter Problems
                      </h4>
                      <textarea
                        value={scooter.problems}
                        onChange={(e) =>
                          handleUpdateProblems(scooter.id, e.target.value)
                        }
                        placeholder="List any issues with the scooter..."
                        className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        rows={4}
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-3">
                        Notes
                      </h4>
                      <textarea
                        value={scooter.notes}
                        onChange={(e) => handleUpdateNotes(scooter.id, e.target.value)}
                        placeholder="Additional notes for the scooter..."
                        className="w-full px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredScooters.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-lg border border-border">
            <p className="text-muted-foreground">No scooters found</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
