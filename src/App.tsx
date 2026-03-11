import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import PageLayout from "@/components/PageLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Programming from "./pages/Programming";
import Science from "./pages/Science";
import Join from "./pages/Join";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
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

// Admin imports
import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminLeads from "@/pages/admin/AdminLeads";
import AdminPages from "@/pages/admin/AdminPages";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminMedia from "@/pages/admin/AdminMedia";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminSettings from "@/pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin routes - outside PageLayout (no navbar/footer) */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <AdminGuard>
                <AdminLayout />
              </AdminGuard>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="pages" element={<AdminPages />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="users" element={<AdminGuard requiredRole="admin"><AdminUsers /></AdminGuard>} />
            <Route path="settings" element={<AdminGuard requiredRole="admin"><AdminSettings /></AdminGuard>} />
          </Route>

          {/* Public routes - with PageLayout */}
          <Route element={<PageLayout><Index /></PageLayout>} path="/" />
          <Route path="/about" element={<PageLayout><About /></PageLayout>} />
          <Route path="/programming" element={<PageLayout><Programming /></PageLayout>} />
          <Route path="/science" element={<PageLayout><Science /></PageLayout>} />
          <Route path="/join" element={<PageLayout><Join /></PageLayout>} />
          <Route path="/register" element={<PageLayout><Register /></PageLayout>} />
          <Route path="/login" element={<PageLayout><Login /></PageLayout>} />
          <Route path="/forgot-password" element={<PageLayout><ForgotPassword /></PageLayout>} />
          <Route path="/reset-password" element={<PageLayout><ResetPassword /></PageLayout>} />
          <Route path="/onboarding" element={<PageLayout><Onboarding /></PageLayout>} />
          <Route path="/town-hall" element={<PageLayout><TownHall /></PageLayout>} />
          <Route path="/noticeboard" element={<PageLayout><Noticeboard /></PageLayout>} />
          <Route path="/local/noticeboard" element={<PageLayout><LocalNoticeboard /></PageLayout>} />
          <Route path="/social-lab" element={<PageLayout><SocialLab /></PageLayout>} />
          <Route path="/social-lab/test" element={<PageLayout><PersonalityTest /></PageLayout>} />
          <Route path="/social-lab/result" element={<PageLayout><PersonalityResult /></PageLayout>} />
          <Route path="/culture-test" element={<PageLayout><CultureTest /></PageLayout>} />
          <Route path="/culture-result" element={<PageLayout><CultureResult /></PageLayout>} />
          <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
          <Route path="/governance" element={<PageLayout><Governance /></PageLayout>} />
          <Route path="/democracy" element={<PageLayout><Democracy /></PageLayout>} />
          <Route path="/democracy/proposals/:id" element={<PageLayout><ProposalDetail /></PageLayout>} />
          <Route path="/research" element={<PageLayout><Research /></PageLayout>} />
          <Route path="/profile" element={<PageLayout><Profile /></PageLayout>} />
          <Route path="/suggested-connects" element={<PageLayout><SuggestedConnects /></PageLayout>} />
          <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
