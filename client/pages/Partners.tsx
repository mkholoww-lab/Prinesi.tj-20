import Layout from "@/components/Layout";
import { useState } from "react";
import { Plus, Edit, Trash2, Search, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Partner {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  city: string;
  joinDate: string;
  monthlySpend: number;
}

export default function PartnersPage() {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return (
      <Layout>
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-medium">
            Only administrators can access this page
          </p>
        </div>
      </Layout>
    );
  }

  const [partners, setPartners] = useState<Partner[]>([
    {
      id: "1",
      name: "TechStore",
      contact: "John Smith",
      phone: "+992 901 23 45 67",
      email: "contact@techstore.tj",
      city: "Dushanbe",
      joinDate: "2023-06-15",
      monthlySpend: 2500,
    },
    {
      id: "2",
      name: "FashionHub",
      contact: "Maria Garcia",
      phone: "+992 902 34 56 78",
      email: "info@fashionhub.tj",
      city: "Dushanbe",
      joinDate: "2023-08-20",
      monthlySpend: 1800,
    },
    {
      id: "3",
      name: "GroceryMart",
      contact: "Alibek Atayev",
      phone: "+992 903 45 67 89",
      email: "support@grocerymart.tj",
      city: "Khujand",
      joinDate: "2023-09-10",
      monthlySpend: 3200,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    phone: "",
    email: "",
    city: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddPartner = () => {
    if (
      formData.name &&
      formData.contact &&
      formData.phone &&
      formData.email &&
      formData.city
    ) {
      const newPartner: Partner = {
        id: String(partners.length + 1),
        ...formData,
        joinDate: new Date().toISOString().split("T")[0],
        monthlySpend: 0,
      };
      setPartners([...partners, newPartner]);
      setFormData({ name: "", contact: "", phone: "", email: "", city: "" });
      setShowForm(false);
    }
  };

  const handleDeletePartner = (id: string) => {
    setPartners(partners.filter((p) => p.id !== id));
  };

  const filteredPartners = partners.filter(
    (partner) =>
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Partners</h1>
            <p className="text-muted-foreground mt-1">
              Manage delivery partner accounts
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Partner
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Total Partners</p>
            <p className="text-3xl font-bold text-primary">{partners.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">
              Total Monthly Volume
            </p>
            <p className="text-3xl font-bold text-green-500">
              {partners.reduce((sum, p) => sum + p.monthlySpend, 0).toLocaleString()} сомони
            </p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow-sm border border-border">
            <p className="text-sm text-muted-foreground mb-1">Avg. Monthly</p>
            <p className="text-3xl font-bold text-primary">
              {(
                partners.reduce((sum, p) => sum + p.monthlySpend, 0) /
                partners.length
              ).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Add Form */}
        {showForm && (
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-border">
            <h2 className="text-xl font-bold mb-4 text-foreground">
              Add New Partner
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Partner Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Contact Person"
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
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
              <input
                type="text"
                placeholder="City"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="px-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddPartner}
                className="bg-primary hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Save Partner
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
            placeholder="Search by partner name, contact, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Contact: {partner.contact}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="text-primary hover:text-blue-600 transition-colors p-2">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePartner(partner.id)}
                    className="text-red-500 hover:text-red-600 transition-colors p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 mb-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Phone</span>
                  <span className="text-sm font-medium text-foreground">
                    {partner.phone}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email</span>
                  <span className="text-sm font-medium text-foreground break-all">
                    {partner.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">City</span>
                  <span className="text-sm font-medium text-foreground">
                    {partner.city}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Monthly Volume
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {partner.monthlySpend.toLocaleString()} сомони
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-1">
                      Joined
                    </p>
                    <p className="text-sm text-foreground">
                      {new Date(partner.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPartners.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-lg border border-border">
            <p className="text-muted-foreground">No partners found</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
