import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../../api/auth";

export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("learner");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [orgName, setOrgName] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const payload = {
      full_name: name,
      email,
      password,
      role,
      organization_name: orgName || null,
    };

    try {
      // ✅ 1. REGISTER
      await registerUser(payload);

      // ✅ 2. AUTO LOGIN
      const loginRes = await loginUser({
        email,
        password,
      });

      // ✅ 3. STORE TOKENS
      localStorage.setItem("access_token", loginRes.access_token);
      localStorage.setItem("refresh_token", loginRes.refresh_token);

      // ✅ 4. REDIRECT BASED ON ROLE
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/learner/dashboard");
      }

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card card form-stack" onSubmit={handleSubmit}>
        <h2 className="text-center">Create Account</h2>

        <select
          className="input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="learner">Learner</option>
          <option value="admin">Admin</option>
        </select>

        <input
          className="input"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className="input"
          placeholder={
            role === "admin"
              ? "Organization Name (required)"
              : "Organization Name (optional)"
          }
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
        />

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>

        {message && (
          <p className="text-center text-error mt-md">{message}</p>
        )}
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