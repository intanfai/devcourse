console.log("Admin dashboard loaded");
import AdminLayout from "../../../layouts/AdminLayout";
import UserGrowthChart from "../../../Components/Charts/UserGrowthChart";
import RevenueChart from "../../../Components/Charts/RevenueChart";
import {
    FiUserCheck,
    FiUsers,
    FiBookOpen,
    FiDollarSign,
    FiLayers,
    FiClock,
} from "react-icons/fi";

export default function AdminDashboard() {
    return (
        <AdminLayout>
            <div className="px-1 pb-10">
                {/* PAGE TITLE */}
                <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

                {/* TOP STAT CARDS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {/* Students */}
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-green-100 rounded-xl text-green-600">
                            <FiUsers className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Total Students
                            </p>
                            <h3 className="text-xl font-bold">852</h3>
                        </div>
                    </div>

                    {/* Instructors */}
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-red-100 rounded-xl text-red-600">
                            <FiUserCheck className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Total Instructors
                            </p>
                            <h3 className="text-xl font-bold">85</h3>
                        </div>
                    </div>

                    {/* Classes */}
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-blue-100 rounded-xl text-blue-600">
                            <FiLayers className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Classes</p>
                            <h3 className="text-xl font-bold">120</h3>
                        </div>
                    </div>

                    {/* Enrollments */}
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-yellow-100 rounded-xl text-yellow-600">
                            <FiBookOpen className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Enrollments</p>
                            <h3 className="text-xl font-bold">100</h3>
                        </div>
                    </div>

                    {/* Revenue */}
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-indigo-100 rounded-xl text-indigo-600">
                            <FiDollarSign className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Revenue</p>
                            <h3 className="text-xl font-bold">Rp 1.110.000</h3>
                        </div>
                    </div>

                    {/* Pending Classes */}
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-green-100 rounded-xl text-green-600">
                            <FiClock className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Pending Classes
                            </p>
                            <h3 className="text-xl font-bold">20</h3>
                        </div>
                    </div>
                </div>

                {/* CHARTS */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white p-6 rounded-xl shadow h-[400px]">
                        <p className="font-semibold border-l-4 pl-3 border-[#3C64EF] mb-5">
                            User Growth Over Time
                        </p>
                        <UserGrowthChart />
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow h-[400px]">
                        <p className="font-semibold border-l-4 pl-3 border-[#3C64EF] mb-5">
                            Monthly Revenue Performance
                        </p>
                        <RevenueChart />
                    </div>
                </div>

                {/* RECENT ACTIVITY */}
                <div className="bg-white rounded-xl shadow p-6">
                    <div className="flex justify-between items-center mb-4">
                        <p className="font-semibold border-l-4 pl-3 border-[#3C64EF]">
                            Recent Activity
                        </p>
                        <button className="text-[#3C64EF] hover:underline flex items-center gap-1">
                            See all activity <span>›</span>
                        </button>
                    </div>

                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b text-gray-500">
                                <th className="py-3 px-3 text-left w-12">No</th>
                                <th className="py-3 px-3 text-left">
                                    Transaction ID
                                </th>
                                <th className="py-3 px-3 text-left">
                                    Activity
                                </th>
                                <th className="py-3 px-3 text-left">Email</th>
                                <th className="py-3 px-3 text-left">Date</th>
                                <th className="py-3 px-3 text-left">Type</th>
                                <th className="py-3 px-3 text-left">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {[1, 2, 3, 4, 5].map((row) => (
                                <tr
                                    key={row}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="py-3 px-3">{row}</td>
                                    <td className="py-3 px-3 font-mono text-blue-600 font-semibold">
                                        #12345678
                                    </td>
                                    <td className="py-3 px-3">
                                        New instructor registered
                                    </td>
                                    <td className="py-3 px-3">
                                        rina@gmail.com
                                    </td>
                                    <td className="py-3 px-3">
                                        01/12/2024 - 10:30 AM
                                    </td>
                                    <td className="py-3 px-3">User</td>
                                    <td className="py-3 px-3">
                                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                                            Failed
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
