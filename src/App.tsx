import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ThankYou from "./pages/ThankYou";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Bokad from "./pages/Bokad";
import NotFound from "./pages/NotFound";
import PageViewTracker from "@/components/PageViewTracker";

const PkIndexA = lazy(() => import("./pages/PkIndexA"));
const PkAdminOptIn = lazy(() => import("./pages/PkAdminOptIn"));
const PkReplay = lazy(() => import("./pages/PkReplay"));
const PkConfirmed = lazy(() => import("./pages/PkConfirmed"));

const queryClient = new QueryClient();

const SPLIT_KEY = 'ol_split_target';

const SplitTestRoot = () => {
  let target = '/a';
  try {
    const stored = localStorage.getItem(SPLIT_KEY);
    if (stored === '/a' || stored === '/b') {
      target = stored;
    } else {
      target = Math.random() < 0.5 ? '/a' : '/b';
      localStorage.setItem(SPLIT_KEY, target);
    }
  } catch {
    target = Math.random() < 0.5 ? '/a' : '/b';
  }
  return <Navigate to={`${target}${window.location.search}`} replace />;
};

const AppRoutes = () => {
  return (
    <Suspense fallback={null}>
      <PageViewTracker />
      <Routes>
        <Route path="/" element={<SplitTestRoot />} />
        <Route path="/a" element={<Index />} />
        <Route path="/b" element={<PkIndexA />} />
        <Route path="/admin/optin" element={<PkAdminOptIn />} />
        <Route path="/replay" element={<PkReplay />} />
        <Route path="/confirmed" element={<PkConfirmed />} />
        <Route path="/tack" element={<ThankYou />} />
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
