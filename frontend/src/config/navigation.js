import { FiHome, FiBookOpen, FiPlusSquare } from "react-icons/fi";

export const adminNavigation = [
  {
    label: "Dashboard",
    icon: FiHome,
    path: "/admin/dashboard",
  },
  {
    label: "Courses",
    icon: FiBookOpen,
    path: "/admin/courses",
  },
  {
    label: "Create Course",
    icon: FiPlusSquare,
    path: "/admin/courses/create",
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