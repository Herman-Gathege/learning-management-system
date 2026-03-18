// src/features/auth/Login.jsx
import { useState } from "react";
import { loginUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";

// import styles from "./AuthForm.module.css"; // CSS module for styling

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ HERE (top level)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await loginUser({ email, password });

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("refresh", data.refresh_token);

      const token = data.access_token;
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role;

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "learner") {
        navigate("/learner/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card card form-stack" onSubmit={handleSubmit}>
        <h2 className="text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
          autoComplete="current-password"
        />

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="text-error text-center">{error}</p>}
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-link">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
}
   