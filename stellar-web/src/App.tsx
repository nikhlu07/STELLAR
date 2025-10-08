import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import Index from "./pages/Index";
import Connect from "./pages/Connect";
import FarmerDashboard from "./pages/FarmerDashboard";
import VerifierOperations from "./pages/VerifierOperations";
import LenderIntelligence from "./pages/LenderIntelligence";
import FarmProfile from "./pages/FarmProfile";
import CropMarketplace from "./pages/CropMarketplace";
import SellCrop from "./pages/SellCrop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/connect" element={<Connect />} />
            <Route path="/farmer" element={<FarmerDashboard />} />
            <Route path="/verifier" element={<VerifierOperations />} />
            <Route path="/lender" element={<LenderIntelligence />} />
            <Route path="/farm/:id" element={<FarmProfile />} />
            <Route path="/marketplace" element={<CropMarketplace />} />
            <Route path="/farmer/sell-crop" element={<SellCrop />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
