// frontend/src/components/StaffBottomNav.jsx
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiLock,
  FiBookOpen
} from "react-icons/fi";

export default function StaffBottomNav() {
  const linkClass = ({ isActive }) =>
    `bottom-nav-link bottom-nav-item ${isActive ? "active" : ""}`;

  return (
    <nav className="bottom-nav show-mobile">
      <NavLink to="/learner/dashboard" end className={linkClass}>
        <FiHome />
        <span>Home</span>
      </NavLink>

      <NavLink to="/learner/courses" className={linkClass}>
        <FiBookOpen />
        <span>Courses</span>
      </NavLink>

      {/* <NavLink to="/staff/password" className={linkClass}>
        <FiLock />
        <span>Password</span>
      </NavLink> */}
    </nav>
  );
}
