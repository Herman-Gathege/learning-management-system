// frontend/src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";

// Public pages
import Home from "../pages/Home";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";

// Dashboards
import DashboardContent from "../features/dashboard/DashboardContent";
import StudentDashboard from "../features/dashboard/StudentDashboard";

// Route protection
import ProtectedRoute from "./ProtectedRoute";

// Dashboard layouts
import DashboardLayout from "../features/dashboard/layout/DashboardLayout";
// import OwnerDashboard from "../features/dashboard/OwnerDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="dashboard"
          element={<DashboardContent roleLabel="Admin" />}
        />
      </Route>

      {/* ================= LEARNER ================= */}
      <Route
        path="/learner/dashboard"
        element={
          <ProtectedRoute allowedRoles={["learner"]}>
            <StudentDashboard roleLabel="Learner" />
          </ProtectedRoute>
        }
      />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
