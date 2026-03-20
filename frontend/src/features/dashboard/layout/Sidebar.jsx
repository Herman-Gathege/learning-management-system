import { NavLink } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import {
  adminNavigation,
  learnerNavigation,
} from "../../../config/navigation";

export default function Sidebar() {
  const { user, organization } = useAuth();

  // ---------------------------
  // Collapse state (persisted)
  // ---------------------------
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem("sidebarCollapsed") === "true";
  });

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed);
  }, [collapsed]);

  if (!user) return null;

  // ---------------------------
  // Role-based navigation
  // ---------------------------
  const navigation =
    user?.role === "admin" ? adminNavigation : learnerNavigation;

  // ---------------------------
  // Active link styling
  // ---------------------------
  const linkClass = ({ isActive }) =>
    `sidebar-link ${isActive ? "active" : ""}`;

  return (
    <aside
      className={`sidebar hidden-mobile ${
        collapsed ? "sidebar-collapsed" : ""
      }`}
    >
      {/* ================= HEADER ================= */}
      <div className="sidebar-header">
        {!collapsed && (
          <h2 className="sidebar-logo text-lg font-bold company-blue">
            {organization?.name || "LMS Platform"}
          </h2>
        )}

        <button
          type="button"
          className="sidebar-collapse-btn mr-sm"
          onClick={() => setCollapsed((c) => !c)}
        >
          <FiChevronDown className={collapsed ? "rotated" : ""} />
        </button>
      </div>

      {/* ================= NAV ================= */}
      <nav className="sidebar-nav flex flex-col gap-sm p-sm">
        {navigation.map((item) => (
          <NavLink key={item.path} to={item.path} className={linkClass}>
            <item.icon />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}