import StudentLayout from "../../../layouts/StudentLayout";
import { FiBookOpen, FiPlayCircle, FiAward, FiClock } from "react-icons/fi";

export default function StudentDashboard() {
    return (
        <StudentLayout>
            <div className="px-1 pb-10">
                {/* ===== SUMMARY CARDS ===== */}
                <h3 className="text-lg font-semibold mb-4 border-l-4 pl-3 border-[#3C64EF]">
                    Learning Summary
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Active Courses */}
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-blue-100 rounded-xl text-blue-600">
                            <FiBookOpen className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Active Courses
                            </p>
                            <h3 className="text-xl font-bold">3</h3>
                        </div>
                    </div>

                    {/* Hours Learned */}
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-yellow-100 rounded-xl text-yellow-600">
                            <FiClock className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Hours Learned
                            </p>
                            <h3 className="text-xl font-bold">15.2 h</h3>
                        </div>
                    </div>

                    {/* Certificates Earned */}
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-green-100 rounded-xl text-green-600">
                            <FiAward className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">
                                Certificates Earned
                            </p>
                            <h3 className="text-xl font-bold">2</h3>
                        </div>
                    </div>
                </div>

                {/* ===== CONTINUE LEARNING ===== */}
                <div className="bg-white p-6 rounded-xl shadow mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold border-l-4 pl-3 border-[#3C64EF]">
                            Continue Learning
                        </h2>
                        <button className="text-blue-600 hover:underline">
                            View All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((c) => (
                            <div
                                key={c}
                                className="border rounded-xl p-4 bg-gray-50 hover:shadow transition"
                            >
                                <img
                                    src="/images/course-thumb.jpg"
                                    className="w-full h-32 object-cover rounded-lg mb-3"
                                />

                                <h3 className="font-semibold text-lg">
                                    React Fundamentals
                                </h3>
                                <p className="text-sm text-gray-500 mb-2">
                                    Web Development · 18 Lessons
                                </p>

                                {/* Progress Bar */}
                                <div className="mt-3">
                                    <div className="h-2 bg-gray-200 rounded-full">
                                        <div className="h-2 bg-blue-600 rounded-full w-[60%]"></div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        60% Completed
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===== RECENT ACTIVITY ===== */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold border-l-4 pl-3 border-[#3C64EF]">
                            Recent Activity
                        </h2>
                        <button className="text-blue-600 hover:underline">
                            See All
                        </button>
                    </div>

                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b text-gray-500">
                                <th className="py-3 text-left">Activity</th>
                                <th className="py-3 text-left">Course</th>
                                <th className="py-3 text-left">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {[
                                {
                                    act: "Completed Lesson",
                                    course: "React Fundamentals",
                                    date: "12 Jan 2025",
                                },
                                {
                                    act: "Earned Certificate",
                                    course: "UI/UX Basics",
                                    date: "08 Jan 2025",
                                },
                                {
                                    act: "Started New Course",
                                    course: "Laravel API Mastery",
                                    date: "04 Jan 2025",
                                },
                            ].map((a, i) => (
                                <tr
                                    key={i}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="py-3">{a.act}</td>
                                    <td className="py-3">{a.course}</td>
                                    <td className="py-3">{a.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </StudentLayout>
    );
}
