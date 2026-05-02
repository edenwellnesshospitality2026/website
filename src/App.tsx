import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import StudioPage from "./pages/StudioPage";
import OneBHKPage from "./pages/OneBHKPage";
import TwoBHKPage from "./pages/TwoBHKPage";
import PresidentialSuitePage from "./pages/PresidentialSuitePage";
import GalleryPage from "./pages/GalleryPage";
import ThankYouPage from "./pages/ThankYouPage";
import TermsPrivacyPage from "./pages/TermsPrivacyPage";
import CancellationPolicyPage from "./pages/CancellationPolicyPage";
import NotFound from "./pages/NotFound";
import BookingSummaryPage from "./pages/BookingSummaryPage";
import BookNowPage from "./pages/BookNowPage";
import GoogleAdsLandingPage from "./pages/GoogleAdsLandingPage";
import BookingEngineStylePage from "./pages/BookingEngineStylePage";
import BookSummary from "./pages/BookSummary";
import SocialBar from "./components/SocialBar"
import DashboardLoginPage from "./dashboard/pages/DashboardLoginPage";
import DashboardBookingsPage from "./dashboard/pages/DashboardBookingsPage";
import { AuthProvider } from "./dashboard/auth/AuthContext";
import { ProtectedRoute } from "./dashboard/auth/ProtectedRoute";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const location = useLocation();
  const isAdminArea =
    location.pathname === "/admin" || location.pathname.startsWith("/dashboard");
  const showSocialBar = !isAdminArea;
  return (
    <>
      {showSocialBar ? <SocialBar /> : null}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/studio" element={<StudioPage />} />
        <Route path="/1bhk" element={<OneBHKPage />} />
        <Route path="/2bhk" element={<TwoBHKPage />} />
        <Route path="/presidential" element={<PresidentialSuitePage />} />
        <Route path="/book-now" element={<BookNowPage />} />
        <Route path="/booking" element={<BookingEngineStylePage />} />
        <Route path="/book-summary" element={<BookSummary />} />
        <Route path="/book-summary/:roomId" element={<BookSummary />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/privacy-policy" element={<TermsPrivacyPage />} />
        <Route path="/terms-privacy" element={<TermsPrivacyPage />} />
        <Route path="/live-at-eden" element={<GoogleAdsLandingPage />} />
        <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
        <Route
          path="/booking-summary/:roomId"
          element={<BookingSummaryPage />}
        />

        <Route path="/admin" element={<DashboardLoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard/bookings" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/bookings"
          element={
            <ProtectedRoute>
              <DashboardBookingsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

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

export default App;
