import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import GeometricBackground from "@/components/GeometricBackground";
import Index from "./pages/Index";
import About from "./pages/About";
import Programming from "./pages/Programming";
import Science from "./pages/Science";
import Join from "./pages/Join";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import TownHall from "./pages/TownHall";
import Noticeboard from "./pages/Noticeboard";
import LocalNoticeboard from "./pages/LocalNoticeboard";
import Contact from "./pages/Contact";
import Governance from "./pages/Governance";
import SocialLab from "./pages/SocialLab";
import PersonalityTest from "./pages/PersonalityTest";
import PersonalityResult from "./pages/PersonalityResult";
import CultureTest from "./pages/CultureTest";
import CultureResult from "./pages/CultureResult";
import Democracy from "./pages/Democracy";
import ProposalDetail from "./pages/ProposalDetail";
import Research from "./pages/Research";
import Profile from "./pages/Profile";
import SuggestedConnects from "./pages/SuggestedConnects";
import NotFound from "./pages/NotFound";
import Chatbot from "@/components/Chatbot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GeometricBackground />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/programming" element={<Programming />} />
          <Route path="/science" element={<Science />} />
          <Route path="/join" element={<Join />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/town-hall" element={<TownHall />} />
          <Route path="/noticeboard" element={<Noticeboard />} />
          <Route path="/local/noticeboard" element={<LocalNoticeboard />} />
          <Route path="/social-lab" element={<SocialLab />} />
          <Route path="/social-lab/test" element={<PersonalityTest />} />
          <Route path="/social-lab/result" element={<PersonalityResult />} />
          <Route path="/culture-test" element={<CultureTest />} />
          <Route path="/culture-result" element={<CultureResult />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/democracy" element={<Democracy />} />
          <Route path="/democracy/proposals/:id" element={<ProposalDetail />} />
          <Route path="/research" element={<Research />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/suggested-connects" element={<SuggestedConnects />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
