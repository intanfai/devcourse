console.log("Admin dashboard loaded");
import AdminLayout from "../../../layouts/AdminLayout";
import UserGrowthChart from "../../../Components/Charts/UserGrowthChart";
import RevenueChart from "../../../Components/Charts/RevenueChart";
import {
    FiUserCheck,
    FiUsers,
    FiBookOpen,
    FiDollarSign,
    FiTrendingUp,
    FiBarChart2,
    FiLayers,
    FiClock,
} from "react-icons/fi";

export default function AdminDashboard() {
    return (
        <AdminLayout>
            {/* PLATFORM OVERVIEW */}
            <div className="mb-10">
                <h3 className="text-lg font-semibold mb-4 border-l-4 pl-3 border-[#3C64EF]">
                    Platform Overview
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1 */}
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

                    {/* Card 2 */}
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

                    {/* Card 3 */}
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-blue-100 rounded-xl text-blue-600">
                            <FiLayers className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Classes</p>
                            <h3 className="text-xl font-bold">$12,400</h3>
                        </div>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-blue-100 rounded-xl text-blue-600">
                            <FiBookOpen className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Enrollments</p>
                            <h3 className="text-xl font-bold">100</h3>
                        </div>
                    </div>

                    {/* Card 5 */}
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-indigo-100 rounded-xl text-indigo-600">
                            <FiDollarSign className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Revenue</p>
                            <h3 className="text-xl font-bold">1.110.000</h3>
                        </div>
                    </div>

                    {/* Card 6 */}
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
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="font-semibold border-l-4 pl-3 border-[#3C64EF]">
                        User Growth Over Time
                    </p>
                    <UserGrowthChart />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="font-semibold border-l-4 pl-3 border-[#3C64EF]">
                        Monthly Revenue Performance
                    </p>
                    <RevenueChart />
                </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-10">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                        <p className="font-semibold border-l-4 pl-3 border-[#3C64EF]">
                            Recent Activity
                        </p>
                    </div>

                    <button className="text-[#3C64EF] hover:underline flex items-center gap-1">
                        See all activity
                        <span>›</span>
                    </button>
                </div>

                {/* TABLE */}
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-gray-500 border-b">
                            <th className="py-3">#</th>
                            <th className="py-3">Transaction ID</th>
                            <th className="py-3">Activity</th>
                            <th className="py-3">Email</th>
                            <th className="py-3">Date</th>
                            <th className="py-3">Type</th>
                            <th className="py-3">Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {[1, 2, 3, 4, 5].map((row) => (
                            <tr className="border-b hover:bg-gray-50" key={row}>
                                <td className="py-3">{row}</td>
                                <td className="py-3 text-[#3C64EF] font-medium">
                                    #12345678
                                </td>
                                <td className="py-3">
                                    New instructor registered
                                </td>
                                <td className="py-3">rina@gmail.com</td>
                                <td className="py-3">01/12/2024 - 10:30 AM</td>
                                <td className="py-3">User</td>
                                <td className="py-3">
                                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs">
                                        Failed
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}
