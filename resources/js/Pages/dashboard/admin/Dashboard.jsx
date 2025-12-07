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
                <h3 className="text-lg font-semibold mb-4 border-l-4 pl-3 border-[#3C64EF]">
                    Platform Overview
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-green-100 rounded-xl text-green-600">
                            <FiUsers className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Total Students
                            </p>
                            <h3 className="text-xl font-bold">{stats.students}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-red-100 rounded-xl text-red-600">
                            <FiUserCheck className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Total Instructors
                            </p>
                            <h3 className="text-xl font-bold">{stats.instructors}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-blue-100 rounded-xl text-blue-600">
                            <FiLayers className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Classes</p>
                            <h3 className="text-xl font-bold">{stats.courses}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-blue-100 rounded-xl text-blue-600">
                            <FiBookOpen className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Enrollments</p>
                            <h3 className="text-xl font-bold">{stats.enrollments}</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-indigo-100 rounded-xl text-indigo-600">
                            <FiDollarSign className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Revenue</p>
                            <h3 className="text-xl font-bold">1.200.000</h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-green-100 rounded-xl text-green-600">
                            <FiClock className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Pending Classes
                            </p>
                            <h3 className="text-xl font-bold">{stats.pending_classes}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="font-semibold border-l-4 pl-3 border-[#3C64EF]">
                        User Growth Over Time
                    </p>
                    <UserGrowthChart instructors={stats.instructors} students={stats.students} />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="font-semibold border-l-4 pl-3 border-[#3C64EF]">
                        Monthly Revenue Performance
                    </p>
                    <RevenueChart />
                </div>
            </div>
        </AdminLayout>
    );
}
