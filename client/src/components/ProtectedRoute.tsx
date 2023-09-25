import { FC, useEffect, useMemo, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactElement<any>;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Use useMemo to only check for token once, and not on every render. (since it could cause infinite loops)
  const tokenIsValid = useMemo(() => !!token, [token]);

  useEffect(() => {
    if (!tokenIsValid) {
      navigate("/login");
    }
    // Providing tokenIsValid in dependency array, so that useEffect will run again if token changes.
  }, [tokenIsValid, navigate]);

  return tokenIsValid ? children : null; // Ensure children fallback to null if it's undefined.
};

export default ProtectedRoute;
