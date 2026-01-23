import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CouriersPage from "./pages/Couriers";
import OnDutyPage from "./pages/OnDuty";
import DeliveriesPage from "./pages/Deliveries";
import PartnersPage from "./pages/Partners";
import ScootersPage from "./pages/Scooters";
import ReportsPage from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/couriers" element={<CouriersPage />} />
          <Route path="/on-duty" element={<OnDutyPage />} />
          <Route path="/deliveries" element={<DeliveriesPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/scooters" element={<ScootersPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
