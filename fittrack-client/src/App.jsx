import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/activities/:categoryName" element={<CategoryPage />} />
          <Route path="/activities/:categoryName/:activityName" element={<ActivityDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
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