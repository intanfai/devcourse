import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// IMPORT DASHBOARD BERDASARKAN ROLE
import AdminDashboard from "./dashboard/admin/Dashboard";
import InstructorDashboard from "./dashboard/instructor/Dashboard";
import StudentDashboard from "./dashboard/student/Dashboard";

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
            navigate("/login");
            return;
        }

        setUser(JSON.parse(storedUser));
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div>
            {user.role === "admin" && <AdminDashboard />}
            {user.role === "instructor" && <InstructorDashboard />}
            {user.role === "student" && <StudentDashboard />}
        </div>
    );
}
