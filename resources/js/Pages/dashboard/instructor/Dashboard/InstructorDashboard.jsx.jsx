import InstructorLayout from "../../../../layouts/InstructorLayout";
import { FiUsers, FiBookOpen, FiDollarSign, FiClock } from "react-icons/fi";
import InstructorCourseChart from "../../../../Components/Charts/InstructorCourseChart";
import InstructorEarningsChart from "../../../../Components/Charts/InstructorEarningsChart";   

export default function InstructorDashboard() {
    return (
        <InstructorLayout>
            {/* OVERVIEW */}
            <div className="mb-10">
                <h3 className="text-lg font-semibold mb-4 border-l-4 pl-3 border-[#3C64EF]">
                    Dashboard Overview
                </h3>

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
                            <h3 className="text-xl font-bold">12</h3>
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
                            <h3 className="text-xl font-bold">327</h3>
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
                            <h3 className="text-xl font-bold">Rp 12.300.000</h3>
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
                            <h3 className="text-xl font-bold">5</h3>
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

            {/* RECENT ACTIVITY */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
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
            </div>
        </InstructorLayout>
    );
}
