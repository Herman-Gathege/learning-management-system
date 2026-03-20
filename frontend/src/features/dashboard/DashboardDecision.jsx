//frontend/src/features/dashboard/DashboardDecision.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DashboardDecision() {
  const { user, loading } = useAuth();

  // Wait until auth is resolved
  if (loading) return <p>Loading dashboard...</p>;

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Role-based routing
  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user.role === "learner") {
    return <Navigate to="/learner/dashboard" replace />;
  }

  // fallback
  return <Navigate to="/login" replace />;
}