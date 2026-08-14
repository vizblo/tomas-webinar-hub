import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplitRoot from "./pages/SplitRoot";
import IndexB from "./pages/IndexB";
import AdminOptIn from "./pages/AdminOptIn";
import ThankYou from "./pages/ThankYou";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Repris from "./pages/Repris";
import Bokad from "./pages/Bokad";
import NotFound from "./pages/NotFound";
import { usePageViewTracking } from "@/hooks/usePageViewTracking";

const queryClient = new QueryClient();

const AppRoutes = () => {
  usePageViewTracking();
  return (
    <Routes>
      <Route path="/" element={<SplitRoot />} />
      <Route path="/b" element={<IndexB />} />
      <Route path="/admin/optin" element={<AdminOptIn />} />
      <Route path="/tack" element={<ThankYou />} />
      <Route path="/repris" element={<Repris />} />
      <Route path="/bokad" element={<Bokad />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
