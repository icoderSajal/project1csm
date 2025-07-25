// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const RoleBaseRoutes = ({ children, requireRole }) => {
//   const { user, loading } = useAuth();
//   const userRole = ["admin", "voyager", "manager", "headcook", "supervisor"]
//   const roleRoutes = {
//     admin: "/admin-dashboard",
//     voyager: "/voyager-dashboard",
//     manager: "/manager-dashboard",
//     headcook: "/headcook-dashboard",
//     supervisor: "/supervisor-dashboard",
//   };
//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   if (!requireRole.includes(user.role)) {
//     <Navigate to="/unautorized" />;
//   }

//   return user ? children : <Navigate to="/login" />;
// };

// export default RoleBaseRoutes;


import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleBaseRoutes = ({ children, requireRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  const roleRoutes = {
    admin: "/admin-dashboard",
    voyager: "/voyager-dashboard",
    manager: "/manager-dashboard",
    headcook: "/headcook-dashboard",
    supervisor: "/supervisor-dashboard",
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold text-gray-700">Loading...</div>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Admin has full access
  if (user.role === "admin") {
    return children;
  }

  // For other roles, check if allowed
  if (requireRole.includes(user.role)) {
    return children;
  }

  // Unauthorized access
  return <Navigate to="/unautorized" state={{ message: "You are not authorized to access this page." }} replace />;
};

export default RoleBaseRoutes;
