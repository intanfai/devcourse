console.log("Admin dashboard loaded");
import AdminLayout from "../../../layouts/AdminLayout";
import UserGrowthChart from "../../../Components/Charts/UserGrowthChart";
import RevenueChart from "../../../Components/Charts/RevenueChart";
import { useEffect, useState } from "react";
import axios from "../../../axios";
import {
    FiUserCheck,
    FiUsers,
    FiBookOpen,
    FiDollarSign,
    FiLayers,
    FiClock,
} from "react-icons/fi";

export default function AdminDashboard() {
    console.log("Admin dashboard loaded");
    const [stats, setStats] = useState({
        students: 0,
        instructors: 0,
        courses: 0,
        enrollments: 0,
        pending_classes: 0,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        axios.get('/admin/stats', { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
                if (res.data) setStats(res.data);
            })
            .catch(err => {
                console.error('Failed to load admin stats', err);
            });
    }, []);

    return (
        <AdminLayout>
            <div className="mb-10">
                <h3 className="text-lg font-semibold mb-4 border-l-4 pl-3 border-blue-600">
                    Platform Overview
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-5 border-2 border-gray-100">
                        <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-xl text-green-600">
                            <FiUsers className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 font-medium">
                                Total Students
                            </p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.students}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-5 border-2 border-gray-100">
                        <div className="p-4 bg-gradient-to-br from-red-100 to-red-200 rounded-xl text-red-600">
                            <FiUserCheck className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 font-medium">
                                Total Instructors
                            </p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.instructors}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-5 border-2 border-gray-100">
                        <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl text-blue-600">
                            <FiLayers className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Classes</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.courses}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-5 border-2 border-gray-100">
                        <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl text-blue-600">
                            <FiBookOpen className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Enrollments</p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.enrollments}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-5 border-2 border-gray-100">
                        <div className="p-4 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl text-indigo-600">
                            <FiDollarSign className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 font-medium">Revenue</p>
                            <h3 className="text-2xl font-bold text-gray-800">1.200.000</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-5 border-2 border-gray-100">
                        <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-xl text-green-600">
                            <FiClock className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 font-medium">
                                Pending Classes
                            </p>
                            <h3 className="text-2xl font-bold text-gray-800">{stats.pending_classes}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100 hover:shadow-lg transition-all duration-300">
                    <p className="font-semibold border-l-4 pl-3 border-blue-600 mb-4">
                        User Growth Over Time
                    </p>
                    <UserGrowthChart instructors={stats.instructors} students={stats.students} />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100 hover:shadow-lg transition-all duration-300">
                    <p className="font-semibold border-l-4 pl-3 border-blue-600 mb-4">
                        Monthly Revenue Performance
                    </p>
                    <RevenueChart />
                </div>
            </div>
        </AdminLayout>
    );
}
