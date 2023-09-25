import { useNavigate } from 'react-router-dom';
import React from "react";

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    if (!token) {
        navigate('/login');
        return null;  // Always return null instead of undefined for FC type.
    }

    return <>{children ?? null}</>;  // Ensure children fallback to null if it's undefined.
};

export default ProtectedRoute;
