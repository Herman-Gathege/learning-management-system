// frontend/src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";

// Public pages
import Home from "../pages/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

// Dashboards
import DashboardContent from "../features/dashboard/DashboardContent";
// import LearnerDashboard from "../features/dashboard/LearnerDashboard";
import DashboardDecision from "../features/dashboard/DashboardDecision";

// Route protection
import ProtectedRoute from "./ProtectedRoute";

// Dashboard layouts
import DashboardLayout from "../features/dashboard/layout/DashboardLayout";
import StaffLayout from "../features/dashboard/layout/StaffLayout";
import LearnerDashboard from "../features/dashboard/LearnerDashboard";
// import OwnerDashboard from "../features/dashboard/OwnerDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashboardDecision />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardContent />} />
        <Route path="courses" element={<div>Admin Courses Page</div>} />
        <Route path="courses/create" element={<div>Create Course Page</div>} />
      </Route>

      {/* ================= LEARNER ================= */}
      <Route
        path="/learner"
        element={
          <ProtectedRoute allowedRoles={["learner"]}>
            <StaffLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<LearnerDashboard/>} />
        <Route path="courses" element={<div>Learner Courses Page</div>} />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
