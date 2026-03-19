// frontend/src/features/dashboard/Dashboard.jsx

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user, loading } = useAuth();

  // While auth state is resolving
  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based decision
  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user.role === "learner") {
    return <Navigate to="/learner/dashboard" replace />;
  }

  // Fallback (should never happen)
  return <Navigate to="/login" replace />;
}
