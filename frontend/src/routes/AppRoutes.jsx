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
import CreateCourse from "../features/courses/CreateCourse";
// import OwnerDashboard from "../features/dashboard/OwnerDashboard";
import AdminCourses from "../features/courses/AdminCourses";
import AddCourseContent from "../features/courses/AddCourseContent";
import CourseDetails from "../features/courses/CourseDetails";

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
        <Route path="courses" element={<AdminCourses />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route
          path="courses/:courseId/content"
          element={<AddCourseContent />}
        />
        <Route path="courses/:courseId" element={<CourseDetails />} />
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
        <Route path="dashboard" element={<LearnerDashboard />} />
        <Route path="courses" element={<div>Learner Courses Page</div>} />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
