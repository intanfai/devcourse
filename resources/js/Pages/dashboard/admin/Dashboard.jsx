console.log("Admin dashboard loaded");
import { useEffect, useState } from "react";
import { FaUsers, FaChalkboardTeacher, FaBook, FaCog } from "react-icons/fa";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        users: 120,
        instructors: 12,
        courses: 45,
    });

    return (
        <section className="min-h-screen bg-gray-100 flex">
            {/* SIDEBAR */}
            <aside className="w-64 bg-white shadow-md p-6">
                <h2 className="text-2xl font-bold text-blue-600 mb-8">
                    Admin Panel
                </h2>

                <nav className="space-y-4">
                    <a className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
                        <FaUsers /> Users
                    </a>
                    <a className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
                        <FaChalkboardTeacher /> Instructors
                    </a>
                    <a className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
                        <FaBook /> Courses
                    </a>
                    <a className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition">
                        <FaCog /> Settings
                    </a>
                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-10">
                <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="p-6 bg-white rounded-xl shadow flex items-center gap-4">
                        <div className="p-4 bg-blue-100 text-blue-500 rounded-xl">
                            <FaUsers size={28} />
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Total Users</p>
                            <h2 className="text-2xl font-bold">
                                {stats.users}
                            </h2>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow flex items-center gap-4">
                        <div className="p-4 bg-green-100 text-green-500 rounded-xl">
                            <FaChalkboardTeacher size={28} />
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Instructors</p>
                            <h2 className="text-2xl font-bold">
                                {stats.instructors}
                            </h2>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow flex items-center gap-4">
                        <div className="p-4 bg-purple-100 text-purple-500 rounded-xl">
                            <FaBook size={28} />
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Courses</p>
                            <h2 className="text-2xl font-bold">
                                {stats.courses}
                            </h2>
                        </div>
                    </div>
                </div>

                {/* RECENT ACTIVITY */}
                <div className="bg-white shadow rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Recent Activity
                    </h2>

                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">User</th>
                                <th className="p-2">Activity</th>
                                <th className="p-2">Time</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-b">
                                <td className="p-2">John Doe</td>
                                <td className="p-2">
                                    Enrolled in React Course
                                </td>
                                <td className="p-2">2 hours ago</td>
                            </tr>

                            <tr className="border-b">
                                <td className="p-2">Sarah Smith</td>
                                <td className="p-2">Created a new course</td>
                                <td className="p-2">5 hours ago</td>
                            </tr>

                            <tr>
                                <td className="p-2">Michael Brown</td>
                                <td className="p-2">Uploaded new material</td>
                                <td className="p-2">1 day ago</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </section>
    );
}
