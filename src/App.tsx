import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudioPage from "./pages/StudioPage";
import OneBHKPage from "./pages/OneBHKPage";
import TwoBHKPage from "./pages/TwoBHKPage";
import GalleryPage from "./pages/GalleryPage";
import ThankYouPage from "./pages/ThankYouPage";
import TermsPrivacyPage from "./pages/TermsPrivacyPage";
import CancellationPolicyPage from "./pages/CancellationPolicyPage";
import NotFound from "./pages/NotFound";
import RoomTypeSelector from "./components/accommodations/RoomSelector";
import BookingSummaryPage from "./pages/BookingSummaryPage";
import BookNowPage from "./pages/BookNowPage";
import GoogleAdsLandingPage from "./pages/GoogleAdsLandingPage";
import BookingEngineStylePage from "./pages/BookingEngineStylePage";
import { RoomType } from "./types/accommodation";
import BookSummary from "./pages/BookSummary";
import SocialBar from "./components/SocialBar"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SocialBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/studio" element={<StudioPage />} />
          <Route path="/1bhk" element={<OneBHKPage />} />
          <Route path="/2bhk" element={<TwoBHKPage />} />
          <Route path="/book-now" element={<BookNowPage />} />
          <Route path="/booking" element={<BookingEngineStylePage />} />
          <Route path="/book-summary" element={<BookSummary />} />
          <Route path="/book-summary/:roomId" element={<BookSummary />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/privacy-policy" element={<TermsPrivacyPage />} />
          <Route path="/terms-privacy" element={<TermsPrivacyPage />} />
          <Route path="/live-at-eden" element={<GoogleAdsLandingPage />} />
          <Route
            path="/cancellation-policy"
            element={<CancellationPolicyPage />}
          />
          <Route
            path="/"
            element={
              <RoomTypeSelector
                onSelect={function (roomType: RoomType): void {
                  throw new Error("Function not implemented.");
                }}
              />
            }
          />
          <Route
            path="/booking-summary/:roomId"
            element={<BookingSummaryPage />}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
