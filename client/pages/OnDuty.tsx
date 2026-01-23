import Layout from "@/components/Layout";
import { useState } from "react";
import { Clock, MapPin, Phone, LogOut, LogIn } from "lucide-react";

interface OnDutyCourier {
  id: string;
  name: string;
  phone: string;
  startTime: string;
  currentLocation: string;
  deliveriesCount: number;
  kmCovered: number;
  status: "on-duty" | "break";
}

export default function OnDutyPage() {
  const [couriers, setCouriers] = useState<OnDutyCourier[]>([
    {
      id: "1",
      name: "Ali Rahmani",
      phone: "+992 901 23 45 67",
      startTime: "08:00 AM",
      currentLocation: "Rudaki Avenue, Dushanbe",
      deliveriesCount: 8,
      kmCovered: 34.5,
      status: "on-duty",
    },
    {
      id: "2",
      name: "Fatima Shodiev",
      phone: "+992 902 34 56 78",
      startTime: "09:30 AM",
      currentLocation: "Somoni Avenue, Dushanbe",
      deliveriesCount: 5,
      kmCovered: 21.3,
      status: "on-duty",
    },
    {
      id: "3",
      name: "Nadir Khujambayev",
      phone: "+992 905 12 34 56",
      startTime: "08:30 AM",
      currentLocation: "Miroj Street, Dushanbe",
      deliveriesCount: 3,
      kmCovered: 15.8,
      status: "break",
    },
  ]);

  const handleToggleStatus = (id: string) => {
    setCouriers(
      couriers.map((c) =>
        c.id === id
          ? {
              ...c,
              status: c.status === "on-duty" ? "break" : "on-duty",
            }
          : c,
      ),
    );
  };

  const handleLogOut = (id: string) => {
    setCouriers(couriers.filter((c) => c.id !== id));
  };

  const activeCouriers = couriers.filter((c) => c.status === "on-duty");
  const onBreak = couriers.filter((c) => c.status === "break");

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              On-Duty Tracking
            </h1>
            <p className="text-muted-foreground mt-1">
              Monitor active couriers in real-time
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{couriers.length}</p>
            <p className="text-sm text-muted-foreground">Total on shift</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">
              Active Couriers
            </p>
            <p className="text-3xl font-bold text-green-500">
              {activeCouriers.length}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">On Break</p>
            <p className="text-3xl font-bold text-orange-500">
              {onBreak.length}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Total Distance</p>
            <p className="text-3xl font-bold text-primary">
              {couriers.reduce((sum, c) => sum + c.kmCovered, 0).toFixed(1)} km
            </p>
          </div>
        </div>

        {/* Active Couriers */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white">
              Active Couriers ({activeCouriers.length})
            </h2>
          </div>
          <div className="divide-y divide-border">
            {activeCouriers.length > 0 ? (
              activeCouriers.map((courier) => (
                <div
                  key={courier.id}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-slate-800"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {courier.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Phone className="w-4 h-4" />
                        {courier.phone}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Started at {courier.startTime}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">
                          Current Location
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          {courier.currentLocation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Deliveries Today
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {courier.deliveriesCount}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Distance Covered
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {courier.kmCovered} km
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleStatus(courier.id)}
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Take Break
                    </button>
                    <button
                      onClick={() => handleLogOut(courier.id)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      End Shift
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                No couriers on duty
              </div>
            )}
          </div>
        </div>

        {/* On Break */}
        {onBreak.length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-border overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">
                On Break ({onBreak.length})
              </h2>
            </div>
            <div className="divide-y divide-border">
              {onBreak.map((courier) => (
                <div
                  key={courier.id}
                  className="p-4 hover:bg-gray-50 dark:hover:bg-slate-800"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">
                        {courier.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {courier.phone}
                      </p>
                    </div>
                    <button
                      onClick={() => handleToggleStatus(courier.id)}
                      className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <LogIn className="w-4 h-4" />
                      Resume Duty
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
