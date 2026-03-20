// frontend/src/features/dashboard/layout/Sidebar.jsx
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import {
  adminNavigation,
  learnerNavigation,
} from "../../../config/navigation";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Sidebar component that displays role-based navigation.
 * 
 * Handles collapse state and persist it to local storage.
 * 
 * Active link styling is applied based on the current route.
 * 
 * @param {Object} user - Authenticated user object.
 * @param {Object} organization - Organization object associated with the user.
 * @param {Object} location - The current route location.
 */
/*******  aa49bb5b-63b6-4822-8cd7-e54238c38ecd  *******/export default function Sidebar() {
  const { user, organization } = useAuth();
  const location = useLocation();
  
  // ---------------------------
  // Dropdown state
  // ---------------------------
  const [openMenus, setOpenMenus] = useState({});

  // ---------------------------
  // Role-based navigation
  // ---------------------------
  const navigation = user?.role === "admin" ? adminNavigation : learnerNavigation;

  // Initialize dropdowns based on current path on mount
  useEffect(() => {
    const initialState = {};
    navigation.forEach((item) => {
      if (item.children && location.pathname.startsWith(item.path)) {
        initialState[item.label] = true;
      }
    });
    setOpenMenus(initialState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on load

  const toggleMenu = (label) => {
    setOpenMenus(prev => ({ ...prev, [label]: !prev[label] }));
  };

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
        {navigation.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isActiveParent = location.pathname.startsWith(item.path);
          const isMenuOpen = openMenus[item.label];

          if (hasChildren && !collapsed) {
            return (
              <div key={item.label} className="menu-group">
                <button 
                  type="button"
                  onClick={() => toggleMenu(item.label)}
                  className={`sidebar-link w-full ${isActiveParent ? "active" : ""}`}
                >
                  <item.icon />
                  <span>{item.label}</span>
                  <FiChevronDown 
                    className={`ml-auto transition-transform ${isMenuOpen ? "rotated" : ""}`} 
                  />
                </button>
                
                {isMenuOpen && (
                  <div className="sidebar-submenu pl-md flex flex-col gap-xs mt-sm">
                    {item.children.map((child) => (
                      <NavLink 
                        key={child.path} 
                        to={child.path} 
                        end 
                        className={({ isActive }) => `sidebar-link sub-link ${isActive ? "active" : ""}`}
                      >
                        <child.icon size={14} />
                        <span>{child.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // Regular link (no children)
          return (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
            >
              <item.icon />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
