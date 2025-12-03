import StudentLayout from "../../../../layouts/StudentLayout";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function MyCoursesPage() {
    const navigate = useNavigate();

    const courses = [
        {
            id: 1,
            title: "React Fundamentals",
            progress: 60,
            thumbnail: "/images/htmlcss.jpg",
            category: "Web Development",
            lastOpened: "Module 3",
        },
        {
            id: 2,
            title: "Laravel Basics",
            progress: 40,
            thumbnail: "/images/jsessentials.jpg",
            category: "Backend",
            lastOpened: "Module 1",
        },
    ];

    return (
        <StudentLayout>
            <div className="pb-6">
                {/* BACK BUTTON + TITLE */}
                <div className="flex items-center gap-4 mb-8">
                    {/* <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button> */}

                    <h1 className="text-2xl font-bold text-gray-900">
                        Active Courses
                    </h1>
                </div>

                {/* COURSE LIST */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((c) => (
                        <Link
                            key={c.id}
                            to={`/student/course/${c.id}`}
                            className="
                                bg-white rounded-2xl border border-gray-200
                                shadow-sm hover:shadow-xl transition-all 
                                hover:-translate-y-1 overflow-hidden
                            "
                        >
                            {/* Thumbnail */}
                            <img
                                src={c.thumbnail}
                                className="w-full h-44 object-cover"
                                alt={c.title}
                            />

                            <div className="p-5">
                                {/* Title */}
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {c.title}
                                </h3>

                                {/* Category + Last Opened */}
                                <p className="text-sm text-gray-500 mt-1">
                                    {c.category} • Last opened: {c.lastOpened}
                                </p>

                                {/* Progress Bar */}
                                <div className="mt-4">
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 rounded-full transition-all"
                                            style={{ width: `${c.progress}%` }}
                                        ></div>
                                    </div>

                                    <p className="text-xs text-gray-500 mt-1">
                                        {c.progress}% completed
                                    </p>
                                </div>

                                {/* Continue Button */}
                                <button
                                    className="
                                        mt-4 w-full py-2 rounded-lg 
                                        bg-blue-600 text-white font-medium 
                                        hover:bg-blue-700 transition
                                    "
                                >
                                    Continue
                                </button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </StudentLayout>
    );
}
