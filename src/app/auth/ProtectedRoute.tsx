import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./AuthContext";

/**
 * Pathless layout route: redirects to /login if the user is not
 * authenticated. Preserves the original location in state so the
 * login screen can send the user back where they came from after
 * a successful sign-in.
 */
export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
