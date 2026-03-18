import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* ================= HERO ================= */}
      <section className="home-hero mt-lg">
        <div className="page-container home-hero-grid mt-lg">
          {/* LEFT */}
          <div className="home-hero-content">
            <h1>
              Learn smarter with{" "}
              <span className="company-blue">clarity</span> and structure
            </h1>

            <p className="text-muted">
              A simple Learning Management System that helps learners track
              progress and enables admins to manage courses with ease.
            </p>

            <div className="flex gap-md mt-md mb-md">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/register")}
              >
                Get Started
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </div>
          </div>

          {/* RIGHT */}
          <div className="home-hero-image hidden-on-mobile">
            <img src="/assets/hero.jpeg" alt="LMS dashboard preview" />
          </div>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section className="home-trust">
        <div className="page-container home-trust-content">
          <p className="trust-text text-center">
            Built for <strong>learners and educators</strong> who need a simple,
            effective way to manage and track learning progress.
          </p>

          <div className="home-trust-image">
            <img
              src="/assets/demo-dash.png"
              alt="LMS dashboard overview"
            />
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="home-features">
        <div className="page-container">
          <h2 className="text-center">
            Everything you need to manage learning
          </h2>

          <p className="text-center text-muted mb-lg">
            Designed to keep both admins and learners in control.
          </p>

          <div className="home-feature-grid">
            <div className="card">
              <h3>Course Management</h3>
              <p className="text-muted">
                Create and organize courses with structured lessons.
              </p>
            </div>

            <div className="card">
              <h3>Progress Tracking</h3>
              <p className="text-muted">
                Monitor lesson completion and overall progress.
              </p>
            </div>

            <div className="card">
              <h3>Simple Learning Experience</h3>
              <p className="text-muted">
                Clean interface focused on clarity and usability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="home-steps">
        <h2 className="text-center mb-md">Simple to start. Easy to use.</h2>

        <div className="home-step-grid">
          <div className="card text-center">
            <strong>1</strong>
            <p>Create your account</p>
          </div>

          <div className="card text-center">
            <strong>2</strong>
            <p>Browse or create courses</p>
          </div>

          <div className="card text-center">
            <strong>3</strong>
            <p>Track progress and complete lessons</p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="home-cta text-center">
        <h2>Start your learning journey today</h2>

        <p className="text-muted mb-md">
          Join users managing their learning with clarity and structure.
        </p>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/register")}
        >
          Create Your Account
        </button>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="home-footer text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} LMS Prototype
        </p>

        <p className="text-sm">
          Built by{" "}
          <span className="company-blue">Herman Gathege</span>
        </p>
      </footer>
    </div>
  );
}