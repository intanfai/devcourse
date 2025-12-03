import StudentLayout from "../../../layouts/StudentLayout";
import { FiBookOpen, FiAward, FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function StudentDashboard() {
    const user = {
        name: "Intan",
        avatar: "/images/anita.jpg",
    };

    const hour = new Date().getHours();
    const greet =
        hour < 12
            ? "Good morning"
            : hour < 18
            ? "Good afternoon"
            : "Good evening";

    const continueCourses = [
        {
            id: 1,
            title: "React Fundamentals",
            category: "Web Development",
            lessons: 18,
            progress: 60,
            thumbnail: "/images/htmlcss.jpg",
        },
        {
            id: 2,
            title: "Laravel Basics",
            category: "Backend",
            lessons: 22,
            progress: 40,
            thumbnail: "/images/jsessentials.jpg",
        },
        {
            id: 3,
            title: "UI/UX Design Starter",
            category: "Design",
            lessons: 12,
            progress: 75,
            thumbnail: "/images/node.png",
        },
    ];

    const recommended = [
        {
            id: 10,
            title: "TailwindCSS Mastery",
            category: "Frontend",
            level: "Beginner",
            instructor: "Michael Ross",
            students: 8200,
            rating: 4.7,
            thumbnail: "/images/course-thumb.jpg",
        },
        {
            id: 11,
            title: "JavaScript Advanced Patterns",
            category: "Programming",
            level: "Intermediate",
            instructor: "Sarah Mitchell",
            students: 10400,
            rating: 4.8,
            thumbnail: "/images/course-thumb.jpg",
        },
        {
            id: 12,
            title: "Figma UI/UX Complete Guide",
            category: "Design",
            level: "All Levels",
            instructor: "Daniel Kim",
            students: 6700,
            rating: 4.6,
            thumbnail: "/images/course-thumb.jpg",
        },
    ];

    const overallProgress = 68; // contoh progress, nanti bisa dibuat dynamic

    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeOffset =
        circumference - (overallProgress / 100) * circumference;

    return (
        <StudentLayout>
            <div className="px-3 pb-10">
                {/* ===================== COMPACT PREMIUM GREETING ===================== */}
                <div
                    className="
    w-full mb-10 p-4 md:p-5 rounded-2xl shadow-sm
    bg-gradient-to-br from-blue-50 to-blue-100/40
    border border-blue-200/40
    flex flex-col md:flex-row items-center justify-between gap-4
"
                >
                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-4">
                        <img
                            src={user.avatar}
                            alt="avatar"
                            className="w-14 h-14 rounded-full border shadow object-cover"
                        />

                        <div>
                            <h1 className="text-xl font-semibold text-gray-800">
                                {greet}, {user.name}! 👋
                            </h1>
                            <p className="text-gray-600 mt-0.5 text-xs">
                                Ready to continue your learning journey today?
                                🌱✨
                            </p>
                        </div>
                    </div>

                    {/* RIGHT SIDE – SMALL RING */}
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
                                <p className="text-lg font-semibold text-gray-800">
                                    {overallProgress}%
                                </p>
                            </div>
                        </div>

                        <p className="text-[10px] text-gray-600 mt-1">
                            Overall Progress
                        </p>
                    </div>
                </div>

                {/* ===================== CONTINUE LEARNING ===================== */}
                <div className="mb-12">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Continue Learning
                        </h2>

                        <button className="text-blue-600 font-medium hover:underline">
                            View All
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {continueCourses.map((course) => (
                            <Link
                                key={course.id}
                                to={`/student/course/${course.id}`}
                                className="
                                    bg-white rounded-2xl border border-gray-200 
                                    shadow-sm hover:shadow-xl transition-all 
                                    hover:-translate-y-1 overflow-hidden
                                "
                            >
                                <img
                                    src={course.thumbnail}
                                    className="w-full h-44 object-cover"
                                    alt={course.title}
                                />

                                <div className="p-5">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {course.title}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {course.category} · {course.lessons}{" "}
                                        lessons
                                    </p>

                                    {/* Progress Bar */}
                                    <div className="mt-4">
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div
                                                className="h-2 bg-blue-600 rounded-full transition-all"
                                                style={{
                                                    width: `${course.progress}%`,
                                                }}
                                            />
                                        </div>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {course.progress}% completed
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ===================== LEARNING STATS ===================== */}
                <h2 className="text-2xl font-semibold mb-5 text-gray-900">
                    Your Learning Stats
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                    {[
                        {
                            icon: <FiBookOpen className="text-3xl" />,
                            label: "Active Courses",
                            value: continueCourses.length,
                            gradient: "from-blue-400 to-blue-600",
                            link: "/student/my-courses",
                        },
                        {
                            icon: <FiClock className="text-3xl" />,
                            label: "Hours Learned",
                            value: "15.2 h",
                            gradient: "from-yellow-400 to-yellow-600",
                            link: "/student/progress",
                        },
                        {
                            icon: <FiAward className="text-3xl" />,
                            label: "Certificates Earned",
                            value: 2,
                            gradient: "from-green-400 to-green-700",
                            link: "/student/certificates", // 👈 ini yg kamu mau
                        },
                    ].map((c, i) => (
                        <Link
                            key={i}
                            to={c.link}
                            className="
            bg-white p-6 rounded-2xl border border-gray-200
            shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all
            flex items-center gap-5 cursor-pointer
            "
                        >
                            <div
                                className={`p-4 rounded-xl bg-gradient-to-br ${c.gradient} text-white shadow`}
                            >
                                {c.icon}
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    {c.label}
                                </p>
                                <h3 className="text-3xl font-bold text-gray-800">
                                    {c.value}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* ===================== RECOMMENDED ===================== */}
                <h2 className="text-2xl font-semibold mb-5 text-gray-900">
                    Recommended For You
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {recommended.map((course) => (
                        <Link
                            key={course.id}
                            to={`/student/course/${course.id}/preview`}
                            className="
                                bg-white rounded-2xl border border-gray-200 
                                shadow-sm hover:shadow-xl hover:-translate-y-1
                                transition-all overflow-hidden
                            "
                        >
                            <div className="h-44 bg-gray-200">
                                <img
                                    src={course.thumbnail}
                                    className="w-full h-full object-cover"
                                    alt={course.title}
                                />
                            </div>

                            <div className="p-5">
                                <p className="text-xs text-gray-500">
                                    by{" "}
                                    <span className="text-blue-600 font-medium">
                                        {course.instructor}
                                    </span>
                                </p>

                                <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                    {course.level}
                                </span>

                                <h3 className="mt-3 font-semibold text-lg text-gray-900 leading-snug">
                                    {course.title}
                                </h3>

                                <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                                    <span>
                                        👥 {course.students.toLocaleString()}
                                    </span>
                                    <span className="text-yellow-500">
                                        ⭐ {course.rating}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </StudentLayout>
    );
}
