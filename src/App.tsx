import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./public/home/HomePage";
import AboutPage from "./public/about/AboutPage";
import DivisionsPage from "./public/divisions/DivisionsPage";
import BlogPage from "./public/blog/BlogPage";
import ContactPage from "./public/contact/ContactPage";
import AuthPage from "./modules/auth/AuthPage";
import DashboardPage from "./modules/dashboard/DashboardPage";
import AcademyPage from "./modules/academy/AcademyPage";
import MarketplacePage from "./modules/marketplace/MarketplacePage";
import MediaPage from "./modules/media/MediaPage";
import CollaborationPage from "./modules/collaboration/CollaborationPage";
import IotPage from "./modules/iot/IotPage";
import { useAuth } from "./store/auth";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
}

function RedirectIfAuthenticated() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/divisions" element={<DivisionsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/auth" element={<RedirectIfAuthenticated />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/academy" element={<AcademyPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/collaboration" element={<CollaborationPage />} />
          <Route path="/iot" element={<IotPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
