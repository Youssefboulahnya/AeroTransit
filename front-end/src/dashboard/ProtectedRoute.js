import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("admin_email");

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
