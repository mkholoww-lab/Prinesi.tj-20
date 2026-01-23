import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth, UserRole } from "./contexts/AuthContext";
import LoginPage from "./pages/Login";
import Index from "./pages/Index";
import CouriersPage from "./pages/Couriers";
import OnDutyPage from "./pages/OnDuty";
import DeliveriesPage from "./pages/Deliveries";
import PartnersPage from "./pages/Partners";
import ScootersPage from "./pages/Scooters";
import ReportsPage from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({
  element,
  requiredRoles,
}: {
  element: React.ReactNode;
  requiredRoles: UserRole[];
}) {
  const { isLoggedIn, hasAccess } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!hasAccess(requiredRoles)) {
    return <Navigate to="/" replace />;
  }

  return element;
}

function AppRoutes() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      {/* Admin routes */}
      <Route
        path="/couriers"
        element={<ProtectedRoute element={<CouriersPage />} requiredRoles={["admin", "manager"]} />}
      />
      <Route
        path="/on-duty"
        element={<ProtectedRoute element={<OnDutyPage />} requiredRoles={["admin"]} />}
      />
      {/* Operator + Admin routes */}
      <Route
        path="/deliveries"
        element={<ProtectedRoute element={<DeliveriesPage />} requiredRoles={["admin", "operator"]} />}
      />
      <Route
        path="/partners"
        element={<ProtectedRoute element={<PartnersPage />} requiredRoles={["admin", "operator"]} />}
      />
      {/* Admin only */}
      <Route
        path="/scooters"
        element={<ProtectedRoute element={<ScootersPage />} requiredRoles={["admin"]} />}
      />
      {/* All roles */}
      <Route
        path="/reports"
        element={<ProtectedRoute element={<ReportsPage />} requiredRoles={["admin", "operator", "manager"]} />}
      />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
