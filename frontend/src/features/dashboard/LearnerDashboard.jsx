// frontend/src/features/dashboard/LearnerDashboard.jsx
import { useAuth } from "../../context/AuthContext";

export default function LearnerDashboard() {
  const { user, organization } = useAuth();

  if (!user) return null;

  return (
    <div className="p-6">
      <div className="text-lg font-bold mb-md">
        Welcome,{" "}
        <span className="company-blue text-bold">
          {user.full_name}
        </span>{" "}
        👋
      </div>

      <div className="card">
        <h3 className="text-md text-bold mb-sm">Your Learning</h3>
        <p className="text-muted">
          You are enrolled in courses. Start learning from the courses section.
        </p>
      </div>
    </div>
  );
}