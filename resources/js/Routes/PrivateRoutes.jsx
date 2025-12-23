import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes({ allowedRoles = [] }) {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const userRole = user?.role_id;

    // Jika tidak ada token, redirect ke login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Jika ada allowedRoles dan user role tidak termasuk, redirect sesuai role
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        // Redirect berdasarkan role user
        if (userRole === 1) return <Navigate to="/admin/dashboard" replace />;
        if (userRole === 2) return <Navigate to="/instructor/dashboard" replace />;
        if (userRole === 3) return <Navigate to="/student/dashboard" replace />;
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
