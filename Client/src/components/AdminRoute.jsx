import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin" && user.role !== "superadmin") {
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;