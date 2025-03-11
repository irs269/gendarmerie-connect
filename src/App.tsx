
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TrafficViolations from "./pages/TrafficViolations";
import VehicleSearch from "./pages/VehicleSearch";
import WantedPersons from "./pages/WantedPersons";
import PaymentOptions from "./pages/PaymentOptions";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AppHeader from "./components/layout/AppHeader";
import AppBottomNav from "./components/layout/AppBottomNav";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <AppHeader />
          <main className="flex-1 app-container">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/traffic-violations" element={<TrafficViolations />} />
              <Route path="/vehicle-search" element={<VehicleSearch />} />
              <Route path="/wanted-persons" element={<WantedPersons />} />
              <Route path="/payment-options" element={<PaymentOptions />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <AppBottomNav />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
