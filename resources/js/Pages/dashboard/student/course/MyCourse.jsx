    import StudentLayout from "../../../../layouts/StudentLayout";
    import { Link, useNavigate } from "react-router-dom";
    import { useEffect, useState } from "react";
    import axios from "../../../../axios";

    export default function MyCoursesPage() {
        const navigate = useNavigate();
        const [enrollments, setEnrollments] = useState([]);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            fetchEnrollments();
        }, []);

        const fetchEnrollments = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get("/enrollments", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setEnrollments(res.data.enrollments || []);
            } catch (err) {
                console.error("Failed to fetch enrollments:", err);
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            return (
                <StudentLayout>
                    <div className="flex items-center justify-center py-12">
                        <p className="text-gray-500">Loading your courses...</p>
                    </div>
                </StudentLayout>
            );
        }

        return (
            <StudentLayout>
                <div className="pb-6">
                    <div className="flex items-center gap-4 mb-8">
                        <h1 className="text-2xl font-bold text-gray-900">Active Courses</h1>
                    </div>

                    {enrollments.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
                            <Link
                                to="/student/explore"
                                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Explore Courses
                            </Link>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {enrollments.map((enrollment) => {
                            const course = enrollment.course;
                            if (!course) return null;

                            let thumbnailPath = course.thumbnail;
                            if (!thumbnailPath || thumbnailPath === 'null' || thumbnailPath.trim() === '') {
                                thumbnailPath = '/images/default-course.jpg';
                            } else if (thumbnailPath.startsWith('http')) {
                                // use as-is
                            } else if (thumbnailPath.startsWith('/')) {
                                // already absolute
                            } else if (thumbnailPath.startsWith('storage/')) {
                                thumbnailPath = `/${thumbnailPath}`;
                            } else {
                                thumbnailPath = `/storage/${thumbnailPath}`;
                            }

                            const progressRaw = enrollment.progress_percentage ?? 0;
                            const progress = Math.max(0, Math.min(100, Number(progressRaw) || 0));

                            const paymentStatus = enrollment.payment?.status || 'pending';
                            const isPaid = paymentStatus === 'completed' || paymentStatus === 'success' || paymentStatus === 'settlement';

                            const statusLabel = progress >= 100 ? 'Completed' : 'On Progress';
                            const statusStyle = progress >= 100
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-blue-50 text-blue-700 border-blue-200';

                            return (
                                <Link
                                    key={enrollment.id}
                                    to={`/student/course/${course.id}`}
                                    className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
                                >
                                    <img
                                        src={thumbnailPath}
                                        className="w-full h-44 object-cover"
                                        alt={course.title}
                                        onError={(e) => { e.currentTarget.src = '/images/default-course.jpg'; }}
                                    />

                                    <div className="p-5">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{course.category || 'Course'}</p>
                                            </div>
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full border ${statusStyle}`}
                                            >
                                                {statusLabel}
                                            </span>
                                        </div>

                                        <div className="mt-4">
                                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-blue-600 rounded-full transition-all"
                                                    style={{ width: `${progress}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">{progress}% completed</p>
                                        </div>

                                        <button className="mt-4 w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                                            Continue
                                        </button>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </StudentLayout>
        );
    }
