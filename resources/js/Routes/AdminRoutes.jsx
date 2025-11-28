import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../Pages/admin/AdminDashboard";
import Users from "../Pages/dashboard/admin/Users";

export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<Users />} />
        </Routes>
    );
}
