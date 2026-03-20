//frontend/src/components/BottomNav.jsx
import { NavLink } from "react-router-dom";
import {
  FiBarChart2,
  FiBox,
  FiUsers,
  FiMenu,
  FiHome,
  FiBookOpen,
  FiPlusSquare
} from "react-icons/fi";
import { useState } from "react";

export default function BottomNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="bottom-nav hidden-desktop">

        <NavLink to="/admin/dashboard" end className="bottom-nav-item">
         <FiHome />
         <span>Home</span>
       </NavLink>

        <NavLink to="/admin/courses" className="bottom-nav-item">
          <FiBookOpen />
          <span>Courses</span>
        </NavLink>

        <NavLink to="/admin/courses/create" className="bottom-nav-item">
          <FiPlusSquare />
          <span>Create Course</span>
        </NavLink>

        {/* <NavLink to="/owner/customers/debtors" className="bottom-nav-item">
          <FiUsers />
          <span>Customers</span>
        </NavLink> */}

        

      </nav>

      
    </>
  );
}
