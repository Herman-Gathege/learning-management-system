//frontend/src/features/dashboard/DashboardDecision.jsx
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DashboardDecision() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/login", { replace: true });
        return;
      }

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else if (user.role === "learner") {
        navigate("/learner/dashboard", { replace: true });
      } else if (user.role === "super_admin") {
      navigate("/super-admin/dashboard", { replace: true });    
      } else {
        // Unknown role fallback
        navigate("/login", { replace: true });
      }
    }
  }, [user, loading, navigate]);

  return <p>Loading dashboard...</p>;
}
