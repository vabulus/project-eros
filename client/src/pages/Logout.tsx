import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For react-router v6

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/login"); // Navigates to login page after logout
  }, [navigate]);

  // Render nothing, or a loading spinner, or any other placeholder
  return null;
};

export default Logout;
