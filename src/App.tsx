import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ThankYou from "./pages/ThankYou";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Repris from "./pages/Repris";
import Bokad from "./pages/Bokad";
import NotFound from "./pages/NotFound";
import { usePageViewTracking } from "@/hooks/usePageViewTracking";
import PageViewTracker from "@/components/PageViewTracker";

const PkIndexA = lazy(() => import("./pages/PkIndexA"));
const PkIndexB = lazy(() => import("./pages/PkIndexB"));
const PkAdminOptIn = lazy(() => import("./pages/PkAdminOptIn"));
const PkReplay = lazy(() => import("./pages/PkReplay"));
const PkConfirmed = lazy(() => import("./pages/PkConfirmed"));

const queryClient = new QueryClient();

const AppRoutes = () => {
  usePageViewTracking();
  return (
    <Suspense fallback={null}>
      <PageViewTracker />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/a" element={<PkIndexA />} />
        <Route path="/b" element={<PkIndexB />} />
        <Route path="/admin/optin" element={<PkAdminOptIn />} />
        <Route path="/replay" element={<PkReplay />} />
        <Route path="/confirmed" element={<PkConfirmed />} />
        <Route path="/tack" element={<ThankYou />} />
        <Route path="/repris" element={<Repris />} />
        <Route path="/bokad" element={<Bokad />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
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
