// frontend/src/features/dashboard/layout/StaffLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import StaffBottomNav from "../../../components/StaffBottomNav";

export default function StaffLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Navbar />
        <div className="dashboard-content">
          <Outlet /> {/* 🔥 THIS FIXES EVERYTHING */}
        </div>
        <StaffBottomNav />
      </div>
    </div>
  );
}