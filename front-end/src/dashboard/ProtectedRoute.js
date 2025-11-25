import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("admin_email");

  if (!isAuthenticated) {
    sessionStorage.setItem(
      "auth_error",
      "Vous devez vous connecter pour accéder au dashboard."
    );

    // Redirect to home page
    return <Navigate to="/" replace />;
  }

  return children;
}
