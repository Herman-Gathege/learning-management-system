import { FiHome, FiBookOpen, FiPlusSquare } from "react-icons/fi";

// frontend/src/config/navigation.js
export const adminNavigation = [
  {
    label: "Dashboard",
    icon: FiHome,
    path: "/admin/dashboard",
  },
  {
    label: "Courses",
    icon: FiBookOpen,
    path: "/admin/courses", // Parent path
    children: [
      { label: "All Courses", path: "/admin/courses", icon: FiBookOpen },
      { label: "Create Course", path: "/admin/courses/create", icon: FiPlusSquare },
    ],
  },
];


export const learnerNavigation = [
  {
    label: "Dashboard",
    icon: FiHome,
    path: "/learner/dashboard",
  },
  {
    label: "Courses",
    icon: FiBookOpen,
    path: "/learner/courses",
  },
];