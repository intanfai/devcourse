import { useState, useEffect } from "react";
import InstructorLayout from "../../../../layouts/InstructorLayout";
import { FiUsers, FiBookOpen, FiDollarSign, FiClock, FiEye, FiEdit } from "react-icons/fi";
import InstructorCourseChart from "../../../../Components/Charts/InstructorCourseChart";
import InstructorEarningsChart from "../../../../Components/Charts/InstructorEarningsChart";
import axios from "../../../../axios";
import { Link } from "react-router-dom";

export default function InstructorDashboard() {
    const [dashboardData, setDashboardData] = useState({
        total_courses: 0,
        total_students: 0,
        pending_reviews: 0,
        total_earnings: 0,
    });
    const [myClasses, setMyClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [classesLoading, setClassesLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("/dashboard/instructor", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setDashboardData(res.data);
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    useEffect(() => {
        const fetchMyClasses = async () => {
            setClassesLoading(true);
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("/dashboard/instructor-classes", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setMyClasses(res.data.courses || []);
            } catch (err) {
                console.error("Failed to fetch my classes:", err);
            } finally {
                setClassesLoading(false);
            }
        };

        fetchMyClasses();
    }, []);

    const formatRupiah = (num) => {
        if (!num) return "Rp 0";
        return "Rp " + num.toLocaleString("id-ID");
    };

    return (
        <InstructorLayout>
            {/* OVERVIEW */}
            <div className="mb-10">
                <h3 className="text-2xl font-bold mb-6">Dashboard Overview</h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Total Courses */}
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-blue-100 rounded-xl text-blue-600">
                            <FiBookOpen className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Total Courses
                            </p>
                            <h3 className="text-xl font-bold">
                                {loading ? "-" : dashboardData.total_courses}
                            </h3>
                        </div>
                    </div>

                    {/* Students */}
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-green-100 rounded-xl text-green-600">
                            <FiUsers className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Total Students
                            </p>
                            <h3 className="text-xl font-bold">
                                {loading ? "-" : dashboardData.total_students}
                            </h3>
                        </div>
                    </div>

                    {/* Earnings */}
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-yellow-100 rounded-xl text-yellow-600">
                            <FiDollarSign className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Total Earnings
                            </p>
                            <h3 className="text-xl font-bold">
                                {loading ? "-" : formatRupiah(dashboardData.total_earnings)}
                            </h3>
                        </div>
                    </div>

                    {/* Pending Reviews */}
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-red-100 rounded-xl text-red-600">
                            <FiClock className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Pending Reviews
                            </p>
                            <h3 className="text-xl font-bold">
                                {loading ? "-" : dashboardData.pending_reviews}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="font-semibold border-l-4 pl-3 border-[#3C64EF]">
                        Course Performance
                    </p>
                    <InstructorCourseChart />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="font-semibold border-l-4 pl-3 border-[#3C64EF]">
                        Monthly Earnings
                    </p>
                    <InstructorEarningsChart />
                </div>
            </div>

            {/* MY CLASSES */}
            <div className="bg-white p-6 rounded-xl shadow-sm mb-12">
                <div className="flex justify-between items-center mb-6">
                    <p className="font-semibold border-l-4 pl-3 border-[#3C64EF] text-lg">
                        My Classes
                    </p>

                    <Link to="/instructor/classes" className="text-[#3C64EF] hover:underline flex items-center gap-1">
                        View All
                        <span>›</span>
                    </Link>
                </div>

                {classesLoading ? (
                    <div className="flex items-center justify-center h-48">
                        <p className="text-gray-400">Loading classes...</p>
                    </div>
                ) : myClasses.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">
                        No classes yet. Create your first class!
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="border-b text-gray-500">
                                    <th className="py-3">No</th>
                                    <th className="py-3">Title</th>
                                    <th className="py-3">Category</th>
                                    <th className="py-3">Students</th>
                                    <th className="py-3">Price</th>
                                    <th className="py-3">Status</th>
                                    <th className="py-3">Date</th>
                                    <th className="py-3 text-center">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {myClasses.slice(0, 5).map((cls, i) => (
                                    <tr
                                        key={cls.id}
                                        className="border-b hover:bg-gray-50"
                                    >
                                        <td className="py-3">{i + 1}</td>
                                        <td className="py-3 font-medium">
                                            {cls.title}
                                        </td>
                                        <td className="py-3">{cls.category}</td>
                                        <td className="py-3">{cls.students}</td>
                                        <td className="py-3">
                                            Rp {cls.price.toLocaleString("id-ID")}
                                        </td>

                                        {/* STATUS */}
                                        <td className="py-3">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-medium
                                                ${
                                                    cls.status === "Published"
                                                        ? "bg-green-100 text-green-700"
                                                        : cls.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : cls.status === "Draft"
                                                        ? "bg-gray-200 text-gray-700"
                                                        : cls.status === "Rejected"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-purple-100 text-purple-700"
                                                }`}
                                            >
                                                {cls.status}
                                            </span>
                                        </td>

                                        <td className="py-3">{cls.date}</td>

                                        {/* ACTION */}
                                        <td className="py-3 text-center flex justify-center gap-3">
                                            {/* VIEW */}
                                            <button
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <FiEye size={18} />
                                            </button>

                                            {/* EDIT */}
                                            <Link
                                                to={`/instructor/classes/edit/${cls.id}`}
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                <FiEdit size={18} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* RECENT ACTIVITY */}
            {/* <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <p className="font-semibold border-l-4 pl-3 border-[#3C64EF]">
                        Recent Activity
                    </p>

                    <button className="text-[#3C64EF] hover:underline flex items-center gap-1">
                        View All
                        <span>›</span>
                    </button>
                </div>

                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b text-gray-500">
                            <th className="py-3 w-12">#</th>
                            <th className="py-3">Activity</th>
                            <th className="py-3">Date</th>
                            <th className="py-3">Type</th>
                        </tr>
                    </thead>

                    <tbody>
                        {[
                            {
                                id: 1,
                                activity: "New student enrolled",
                                date: "21 Jan 2025",
                                type: "Enrollment",
                            },
                            {
                                id: 2,
                                activity: "Received feedback for React Basics",
                                date: "20 Jan 2025",
                                type: "Feedback",
                            },
                            {
                                id: 3,
                                activity: "Course UI/UX updated",
                                date: "19 Jan 2025",
                                type: "Course Update",
                            },
                            {
                                id: 4,
                                activity: "You received payment Rp 80.000",
                                date: "18 Jan 2025",
                                type: "Payment",
                            },
                        ].map((row) => (
                            <tr
                                key={row.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="py-4">{row.id}</td>
                                <td className="py-4">{row.activity}</td>
                                <td className="py-4">{row.date}</td>
                                <td className="py-4">{row.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}
        </InstructorLayout>
    );
}
