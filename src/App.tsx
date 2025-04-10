import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import ResumeAssistant from "./pages/ResumeAssistant";
import AnalyticsPage from "./pages/Analytics";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <VercelAnalytics />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/sign-in"
              element={
                isSignedIn ? <Navigate to="/dashboard" replace /> : <Auth />
              }
            />
            <Route
              path="/sign-up"
              element={
                isSignedIn ? <Navigate to="/dashboard" replace /> : <Auth />
              }
            />
            
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                isSignedIn ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route
              path="/dashboard"
              element={
                isSignedIn ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route
              path="/applications"
              element={
                isSignedIn ? (
                  <Applications />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route
              path="/resume-assistant"
              element={
                isSignedIn ? (
                  <ResumeAssistant />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route
              path="/analytics"
              element={
                isSignedIn ? (
                  <AnalyticsPage />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route
              path="/settings"
              element={
                isSignedIn ? (
                  <Settings />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isSignedIn ? (
                  <Profile />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
