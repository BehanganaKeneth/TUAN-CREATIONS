import AboutPage from "../public/about/AboutPage";
import ManagementTeam from "../public/about/ManagementTeam";
import BlogPage from "../public/blog/BlogPage";
import ContactPage from "../public/contact/ContactPage";
import DivisionsPage from "../public/divisions/DivisionsPage";
import HomePage from "../public/home/HomePage";
import AuthPage from "../modules/auth/AuthPage";
import AdminLoginPage from "../modules/auth/AdminLoginPage";
import AcademyPage from "../modules/academy/AcademyPage";
import AnalyticsDashboard from "../modules/academy/AnalyticsDashboard";
import CertificatePage from "../modules/academy/CertificatePage";
import CourseManagement from "../modules/academy/CourseManagement";
import CoursePage from "../modules/academy/CoursePage";
import EnrolledCoursesPage from "../modules/academy/EnrolledCoursesPage";
import ForumPage from "../modules/academy/ForumPage";
import InstructorDashboard from "../modules/academy/InstructorDashboard";
import LiveSessionPage from "../modules/academy/LiveSessionPage";
import MentorshipFinder from "../modules/academy/MentorshipFinder";
import NotificationCenter from "../modules/academy/NotificationCenter";
import QuizPage from "../modules/academy/QuizPage";
import StudyGroupBrowser from "../modules/academy/StudyGroupBrowser";
import AdminPage from "../modules/admin/AdminPage";
import CollaborationPage from "../modules/collaboration/CollaborationPage";
import DashboardPage from "../modules/dashboard/DashboardPage";
import IotPage from "../modules/iot/IotPage";
import MarketplacePage from "../modules/marketplace/MarketplacePage";
import MediaPage from "../modules/media/MediaPage";

export const publicRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/about/management-team", element: <ManagementTeam /> },
  { path: "/divisions", element: <DivisionsPage /> },
  { path: "/blog", element: <BlogPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/auth", element: <AuthPage /> },
  { path: "/admin/login", element: <AdminLoginPage /> },
];

export const dashboardRoutes = [
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/academy", element: <AcademyPage /> },
  { path: "/academy/my-courses", element: <EnrolledCoursesPage /> },
  { path: "/course/:courseId", element: <CoursePage /> },
  { path: "/course/:courseId/forum", element: <ForumPage /> },
  { path: "/course/:courseId/quizzes", element: <QuizPage /> },
  { path: "/course/:courseId/study-groups", element: <StudyGroupBrowser /> },
  { path: "/certificates", element: <CertificatePage /> },
  { path: "/instructor-dashboard", element: <InstructorDashboard /> },
  { path: "/academy/create-course", element: <CourseManagement /> },
  { path: "/academy/edit-course/:courseId", element: <CourseManagement /> },
  { path: "/notifications", element: <NotificationCenter /> },
  { path: "/academy/mentorship", element: <MentorshipFinder /> },
  { path: "/admin/academy/analytics", element: <AnalyticsDashboard /> },
  { path: "/live-session", element: <LiveSessionPage /> },
  { path: "/marketplace", element: <MarketplacePage /> },
  { path: "/media", element: <MediaPage /> },
  { path: "/collaboration", element: <CollaborationPage /> },
  { path: "/iot", element: <IotPage /> },
  { path: "/admin", element: <AdminPage /> },
];