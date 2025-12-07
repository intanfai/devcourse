import { useParams, useNavigate } from "react-router-dom";
import {
    FiStar,
    FiUsers,
    FiPlayCircle,
    FiLock,
    FiArrowLeft,
    FiCheck,
} from "react-icons/fi";
import { useState } from "react";
import StudentLayout from "../../../layouts/StudentLayout";

export default function CoursePreviewPage() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [showVideo, setShowVideo] = useState(false);

    // Dummy Data
    const course = {
        id: courseId,
        title: "React Fundamentals",
        thumbnail: "/images/course-thumb.jpg",
        previewVideo: "https://www.youtube.com/embed/w7ejDZ8SWv8",
        category: "Web Development",
        level: "Beginner",
        rating: 4.8,
        reviews: 2589,
        students: 12800,
        price: 1,
        oldPrice: null,

        description:
            "Pelajari React dari dasar hingga mahir. Termasuk komponen, props, hooks, state management, hingga real-world projects.",
        requirements: [
            "Tidak perlu pengalaman coding sebelumnya.",
            "Laptop / PC dengan koneksi internet.",
            "Semangat belajar tinggi.",
        ],
        instructor: {
            name: "John Anderson",
            avatar: "/images/avatar.png",
            role: "Senior Frontend Engineer",
            bio: "Seorang engineer dengan 10+ tahun pengalaman membangun aplikasi React skala besar.",
        },
        learningPoints: [
            "Membuat komponen React dari nol",
            "Memahami props & state",
            "Menggunakan React Hooks",
            "State management modern",
            "Membangun aplikasi real-world",
        ],
        reviewsList: [
            {
                user: "Sarah L.",
                avatar: "/images/avatar.png",
                rating: 5,
                comment: "Kursus terbaik! Penjelasannya sangat mudah dipahami.",
            },
            {
                user: "Michael B.",
                avatar: "/images/avatar.png",
                rating: 4,
                comment: "Sangat membantu untuk memahami dasar React.",
            },
        ],
        chapters: [
            {
                id: 1,
                title: "Introduction to React",
                materials: [
                    { id: 1, title: "What is React?" },
                    { id: 2, title: "Environment Setup" },
                ],
            },
        ],
    };

    return (
        <StudentLayout>
            <div className="pb-6">
                {/* BACK BUTTON */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button>

                    <h1 className="text-2xl font-bold">{course.title}</h1>
                </div>

                {/* ================= HERO SECTION ================= */}
                <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Thumbnail */}
                        <div
                            className="lg:w-1/2 relative group cursor-pointer"
                            onClick={() => setShowVideo(true)}
                        >
                            <img
                                src={course.thumbnail}
                                onError={(e) =>
                                    (e.currentTarget.src =
                                        "/images/placeholder.png")
                                }
                                className="rounded-xl w-full h-64 object-cover shadow"
                            />

                            {/* PLAY ICON */}
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-xl">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                                    <FiPlayCircle
                                        size={40}
                                        className="text-blue-600"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT INFO */}
                        <div className="lg:w-1/2">
                            <h1 className="text-3xl font-bold text-gray-900 mb-3">
                                {course.title}
                            </h1>

                            <div className="flex items-center gap-3 text-sm mb-3">
                                <span className="text-yellow-500 flex items-center gap-1">
                                    <FiStar /> {course.rating}
                                </span>
                                <span className="text-gray-600">
                                    ({course.reviews.toLocaleString()} reviews)
                                </span>
                                <span className="flex items-center gap-1 text-gray-600">
                                    <FiUsers />{" "}
                                    {course.students.toLocaleString()} students
                                </span>
                                <span className="bg-blue-100 text-blue-600 px-3 py-1 text-xs rounded-full">
                                    {course.level}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {course.description}
                            </p>

                            {/* Lifetime Access Badge */}
                            <p className="text-xs text-green-600 font-semibold mb-4 flex items-center gap-2">
                                <FiCheck /> Lifetime access · Certificate
                                included
                            </p>

                            {/* PRICE CARD */}
                            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl w-fit mb-3">
                                <h2 className="text-3xl font-bold text-blue-700">
                                    Rp{" "}
                                    {Number(course.price).toLocaleString(
                                        "id-ID"
                                    )}
                                </h2>
                            </div>

                            <button
                                onClick={() =>
                                    navigate(`/student/checkout/${course.id}`)
                                }
                                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow transition"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= WHAT YOU’LL LEARN ================= */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-xl font-semibold mb-4">
                        What You'll Learn
                    </h2>

                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {course.learningPoints.map((p, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <FiCheck className="text-blue-600" /> {p}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ================= REQUIREMENTS ================= */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-xl font-semibold mb-4">Requirements</h2>

                    <ul className="space-y-2 text-sm text-gray-700">
                        {course.requirements.map((r, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <FiCheck className="text-green-600" /> {r}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* ================= INSTRUCTOR ================= */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-xl font-semibold mb-4">Instructor</h2>

                    <div className="flex items-center gap-4">
                        <img
                            src={course.instructor.avatar}
                            onError={(e) =>
                                (e.currentTarget.src = "/images/avatar.png")
                            }
                            className="w-16 h-16 rounded-full object-cover border"
                        />

                        <div>
                            <h3 className="font-semibold">
                                {course.instructor.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {course.instructor.role}
                            </p>
                            <p className="mt-2 text-gray-600 text-sm">
                                {course.instructor.bio}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ================= REVIEWS ================= */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-xl font-semibold mb-4">
                        Student Reviews
                    </h2>

                    {course.reviewsList.map((rev, i) => (
                        <div key={i} className="border-b py-4">
                            <div className="flex items-center gap-3 mb-2">
                                <img
                                    src={rev.avatar}
                                    className="w-10 h-10 rounded-full border object-cover"
                                />
                                <div>
                                    <p className="font-medium">{rev.user}</p>
                                    <p className="text-yellow-500 text-sm flex items-center gap-1">
                                        <FiStar /> {rev.rating}
                                    </p>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm">
                                {rev.comment}
                            </p>
                        </div>
                    ))}
                </div>

                {/* ================= VIDEO MODAL ================= */}
                {showVideo && (
                    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
                        <div className="bg-white p-4 rounded-xl shadow-xl w-full max-w-3xl relative">
                            <button
                                onClick={() => setShowVideo(false)}
                                className="absolute -top-3 -right-3 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center"
                            >
                                ✕
                            </button>

                            <iframe
                                width="100%"
                                height="400"
                                src={course.previewVideo}
                                className="rounded-xl"
                                allowFullScreen
                            />
                        </div>
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
