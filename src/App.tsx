import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import AboutPage from "./pages/AboutPage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import PublicationsPage from "./pages/PublicationsPage";
import EducationPage from "./pages/EducationPage";
import ExperiencePage from "./pages/ExperiencePage";
import ContactPage from "./pages/ContactPage";
import CertificationsPage from "./pages/CertificationsPage";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Use shared layout for all pages, including landing */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/certifications" element={<CertificationsPage />} />
            <Route path="/education" element={<EducationPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Admin and fallback */}
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
