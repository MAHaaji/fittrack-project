import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import WorkoutLogPage from "./pages/WorkoutLogPage";
import DashboardPage from "./pages/DashboardPage";
import MainLayout from "./layouts/MainLayout";
import CategoryPage from "./pages/CategoryPage";
import ActivityDetailPage from "./pages/ActivityDetailPage";
import SearchPage from "./pages/SearchPage";
import PricingPage from "./pages/PricingPage";
import CompetitionsPage from "./pages/CompetitionsPage";
import FAQPage from "./pages/FAQPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentCancelPage from "./pages/PaymentCancelPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function StartRoute() {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<StartRoute />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/activities/:categoryName" element={<CategoryPage />} />
          <Route path="/activities/:categoryName/:activityName" element={<ActivityDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/competitions" element={<CompetitionsPage />} />
          <Route path="/faq" element={<FAQPage />} />

          {/* Stripe redirects the browser to these after Checkout */}
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route path="/payment-cancelled" element={<PaymentCancelPage />} />

          <Route path="/workout-log" element={
            <ProtectedRoute><WorkoutLogPage /></ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          } />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
