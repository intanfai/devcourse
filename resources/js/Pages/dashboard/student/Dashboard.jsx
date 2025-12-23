import { FiBookOpen, FiAward, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../../axios";
import StudentLayout from "../../../layouts/StudentLayout";

export default function StudentDashboard() {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [dashboardData, setDashboardData] = useState({
        first_name: "",
        active_courses: 0,
        hours_learned: 0,
        certificates_earned: 0,
        recommended_courses: [],
    });
    const [loading, setLoading] = useState(true);

    // Calculate overall progress based on hours learned and certificates
    const calculateProgress = () => {
        const maxHours = 100;
        const maxCertificates = 10;
        const hoursProgress = (dashboardData.hours_learned / maxHours) * 50;
        const certProgress =
            (dashboardData.certificates_earned / maxCertificates) * 50;
        return Math.min(100, Math.round(hoursProgress + certProgress));
    };

    const overallProgress = calculateProgress();

    // Fetch dashboard data from API
    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("/dashboard/student", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Dashboard data received:", res.data);
            console.log("Recommended courses:", res.data.recommended_courses);
            setDashboardData(res.data);
        } catch (err) {
            console.error("Failed to fetch dashboard data:", err);
            console.error("Error details:", err.response);
        } finally {
            setLoading(false);
        }
    };

    const hour = new Date().getHours();
    const greet =
        hour < 12
            ? "Good morning"
            : hour < 18
            ? "Good afternoon"
            : "Good evening";

    const recommended = dashboardData.recommended_courses || [];

    if (!user) return <div className="p-6">Loading...</div>;

    return (
        <StudentLayout>
            <div className="pb-10 px-3 sm:px-0">
                {/* GREETING */}
                <div
                    className="
                        w-full mb-10 p-4 md:p-6 rounded-2xl shadow-sm
                        bg-gradient-to-br from-blue-50 to-blue-100/40
                        border border-blue-200/40
                        flex flex-col md:flex-row items-center justify-between
                        gap-6 text-center md:text-left
                    "
                >
                    <div className="flex items-center gap-4">
                        <img
                            src={user.avatar || "/images/avatar.jpg"}
                            className="w-14 h-14 rounded-full border shadow object-cover"
                        />
                        <div>
                            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
                                {greet},{" "}
                                {dashboardData.first_name || user?.name}! 👋
                            </h1>
                            <p className="text-gray-600 mt-1 text-xs md:text-sm">
                                Ready to continue your learning journey today?
                            </p>
                        </div>
                    </div>

                    {/* PROGRESS CIRCLE */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-20 h-20">
                            <svg className="w-20 h-20 transform -rotate-90">
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="#E5E7EB"
                                    strokeWidth="8"
                                    fill="transparent"
                                />
                                <circle
                                    cx="40"
                                    cy="40"
                                    r="32"
                                    stroke="url(#grad)"
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 32}
                                    strokeDashoffset={
                                        2 * Math.PI * 32 -
                                        (overallProgress / 100) *
                                            (2 * Math.PI * 32)
                                    }
                                    strokeLinecap="round"
                                    className="transition-all duration-700"
                                />
                                <defs>
                                    <linearGradient
                                        id="grad"
                                        x1="0"
                                        y1="0"
                                        x2="1"
                                        y2="1"
                                    >
                                        <stop offset="0%" stopColor="#3B82F6" />
                                        <stop
                                            offset="100%"
                                            stopColor="#6366F1"
                                        />
                                    </linearGradient>
                                </defs>
                            </svg>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-lg font-bold text-gray-800">
                                    {overallProgress}%
                                </p>
                            </div>
                        </div>
                        <p className="text-[11px] text-gray-600 mt-1">
                            Overall Progress
                        </p>
                    </div>
                </div>

                {/* LEARNING STATS */}
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">
                    Your Learning Stats
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
                    {[
                        {
                            icon: <FiBookOpen className="text-3xl" />,
                            label: "Active Courses",
                            value: dashboardData.active_courses || 0,
                            gradient: "from-blue-500 to-blue-700",
                            bg: "from-blue-100 to-blue-200",
                            link: "/student/courses",
                        },
                        {
                            icon: <FiClock className="text-3xl" />,
                            label: "Hours Learned",
                            value: `${dashboardData.hours_learned || 0} h`,
                            gradient: "from-yellow-500 to-yellow-700",
                            bg: "from-yellow-100 to-yellow-200",
                            link: "/student/progress",
                        },
                        {
                            icon: <FiAward className="text-3xl" />,
                            label: "Certificates Earned",
                            value: dashboardData.certificates_earned || 0,
                            gradient: "from-green-500 to-green-700",
                            bg: "from-green-100 to-green-200",
                            link: "/student/certificates",
                        },
                    ].map((c, i) => (
                        <Link
                            key={i}
                            to={c.link}
                            className="
                                bg-white p-4 sm:p-6 rounded-2xl border-2 border-gray-100
                                shadow-md hover:shadow-xl transition-all duration-300
                                hover:-translate-y-2 flex flex-col sm:flex-row
                                items-center gap-5 cursor-pointer group
                                text-center sm:text-left
                            "
                        >
                            <div
                                className={`p-4 rounded-xl bg-gradient-to-br ${c.bg} text-${c.gradient.split('-')[1]}-600 shadow-md group-hover:scale-110 transition-transform duration-300`}
                            >
                                {c.icon}
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-medium">
                                    {c.label}
                                </p>
                                <h3 className="text-2xl font-bold text-gray-800">
                                    {c.value}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* RECOMMENDED */}
                <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">
                    Recommended For You
                </h2>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-gray-500">
                            Loading recommendations...
                        </p>
                    </div>
                ) : recommended.length === 0 ? (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-gray-500">
                            No courses available yet
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {recommended.map((course) => (
                            <Link
                                key={course.id}
                                to={`/student/course/${course.id}/preview`}
                                className="
                                bg-white rounded-2xl border border-gray-200 shadow-sm
                                hover:shadow-xl hover:-translate-y-1 transition-all
                                overflow-hidden
                            "
                            >
                                <img
                                    src={course.thumbnail}
                                    className="w-full h-40 md:h-44 object-cover"
                                />

                                <div className="p-4 md:p-5">
                                    <p className="text-xs text-gray-500">
                                        by{" "}
                                        <span className="text-blue-600 font-medium">
                                            {course.instructor}
                                        </span>
                                    </p>

                                    <span className="mt-2 inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                        {course.level}
                                    </span>

                                    <h3 className="mt-3 font-semibold text-lg text-gray-900">
                                        {course.title}
                                    </h3>

                                    <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                                        <span>
                                            👥{" "}
                                            {course.students.toLocaleString()}
                                        </span>
                                        <span className="text-yellow-500">
                                            ⭐ {course.rating}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
