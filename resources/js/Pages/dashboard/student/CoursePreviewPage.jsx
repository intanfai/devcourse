import { useParams, useNavigate } from "react-router-dom";
import {
    FiStar,
    FiUsers,
    FiPlayCircle,
    FiLock,
    FiArrowLeft,
    FiCheck,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import StudentLayout from "../../../layouts/StudentLayout";
import axios from "../../../axios";

export default function CoursePreviewPage() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const [showVideo, setShowVideo] = useState(false);
    const [course, setCourse] = useState(null);
    const [instructor, setInstructor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);

    // Fetch course data from backend
    useEffect(() => {
        fetchCourseDetail();
        checkEnrollmentStatus();
    }, [courseId]);

    const fetchCourseDetail = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`/courses/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Course detail:", res.data);
            
            // Clean thumbnail path
            let thumbnailPath = res.data.thumbnail;
            if (!thumbnailPath || thumbnailPath === 'null' || thumbnailPath.trim() === '') {
                thumbnailPath = "/images/course-thumb.jpg";
            } else if (!thumbnailPath.startsWith('/') && !thumbnailPath.startsWith('http')) {
                // Add leading slash if not present
                thumbnailPath = '/' + thumbnailPath;
            }
            
            // Transform backend data to match frontend structure
            const courseData = {
                id: res.data.id,
                title: res.data.title,
                thumbnail: thumbnailPath,
                previewVideo: null, // Add if you have preview video in backend
                category: res.data.category,
                level: res.data.level,
                rating: 0, // Will be calculated from reviews
                reviews: 0,
                students: res.data.enrollments_count || 0,
                price: res.data.price,
                oldPrice: null,
                description: res.data.description,
                requirements: [], // Add if you have requirements field
                instructor_id: res.data.instructor_id,
                learningPoints: [], // Add if you have learning points field
                reviewsList: [], // Will be populated from reviews
                chapters: res.data.chapters?.map(chapter => ({
                    id: chapter.id,
                    title: chapter.title,
                    materials: chapter.materials?.map(mat => ({
                        id: mat.id,
                        title: mat.title,
                        duration: mat.duration,
                        video_url: mat.video_url,
                    })) || [],
                })) || [],
            };
            
            setCourse(courseData);

            // Fetch instructor profile
            if (res.data.instructor_id) {
                try {
                    const instructorRes = await axios.get(
                        `/instructors/${res.data.instructor_id}/profile`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    setInstructor(instructorRes.data);
                } catch (err) {
                    console.error("Failed to fetch instructor profile:", err);
                    // Fallback ke data dari course
                    setInstructor({
                        id: res.data.instructor_id,
                        name: res.data.instructor?.name || "Unknown",
                        avatar: res.data.instructor?.avatar || "", // Empty string fallback to generated avatar
                        bio: res.data.instructor?.bio || "Experienced instructor",
                        email: res.data.instructor?.email || "",
                    });
                }
            }
        } catch (err) {
            console.error("Failed to fetch course:", err);
        } finally {
            setLoading(false);
        }
    };

    const checkEnrollmentStatus = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("/enrollments", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const enrollments = res.data.enrollments || [];
            const alreadyEnrolled = enrollments.some(e => e.course_id === parseInt(courseId));
            setIsEnrolled(alreadyEnrolled);
        } catch (err) {
            console.error("Failed to check enrollment:", err);
        }
    };

    if (loading) {
        return (
            <StudentLayout>
                <div className="flex items-center justify-center py-12">
                    <p className="text-gray-500">Loading course...</p>
                </div>
            </StudentLayout>
        );
    }

    if (!course) {
        return (
            <StudentLayout>
                <div className="flex items-center justify-center py-12">
                    <p className="text-gray-500">Course not found</p>
                </div>
            </StudentLayout>
        );
    }

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
                            onClick={() => course.previewVideo && setShowVideo(true)}
                        >
                            <img
                                src={course.thumbnail}
                                alt={course.title}
                                onError={(e) => {
                                    e.currentTarget.src = "/images/course-thumb.jpg";
                                }}
                                className="rounded-xl w-full h-64 object-cover shadow"
                            />

                            {/* PLAY ICON - Only show if preview video exists */}
                            {course.previewVideo && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-xl">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                                        <FiPlayCircle
                                            size={40}
                                            className="text-blue-600"
                                        />
                                    </div>
                                </div>
                            )}
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
                                onClick={() => {
                                    if (isEnrolled) {
                                        alert("You have already enrolled in this course");
                                    } else {
                                        navigate(`/student/checkout/${course.id}`);
                                    }
                                }}
                                className={`px-8 py-3 rounded-xl font-semibold shadow transition ${
                                    isEnrolled
                                        ? "bg-gray-400 text-white cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 text-white"
                                }`}
                            >
                                {isEnrolled ? "Already Enrolled" : "Buy Now"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ================= WHAT YOU'LL LEARN ================= */}
                {course.learningPoints && course.learningPoints.length > 0 && (
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
                )}

                {/* ================= REQUIREMENTS ================= */}
                {course.requirements && course.requirements.length > 0 && (
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
                )}

                {/* ================= INSTRUCTOR ================= */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-xl font-semibold mb-4">Instructor</h2>

                    {instructor ? (
                        <div>
                            <div className="flex items-center gap-4">
                                <img
                                    src={
                                        (instructor.avatar && instructor.avatar.trim() !== '' && instructor.avatar !== 'null')
                                            ? instructor.avatar
                                            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                instructor.name
                                            )}&background=0D8ABC&color=fff&size=150`
                                    }
                                    onError={(e) => {
                                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                            instructor.name || 'User'
                                        )}&background=0D8ABC&color=fff&size=150`;
                                    }}
                                    className="w-16 h-16 rounded-full object-cover border"
                                />

                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">
                                        {instructor.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {instructor.bio || "Professional Instructor"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-500">Loading instructor info...</div>
                    )}
                </div>

                {/* ================= COURSE CURRICULUM ================= */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-xl font-semibold mb-4">Course Curriculum</h2>

                    {course.chapters && course.chapters.length > 0 ? (
                        <div className="space-y-4">
                            {course.chapters.map((chapter, idx) => (
                                <div key={chapter.id} className="border rounded-lg overflow-hidden">
                                    <div className="bg-gray-50 px-4 py-3 border-b">
                                        <h3 className="font-semibold text-gray-800">
                                            Chapter {idx + 1}: {chapter.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {chapter.materials?.length || 0} materials
                                        </p>
                                    </div>

                                    <div className="p-3">
                                        {chapter.materials && chapter.materials.length > 0 ? (
                                            <ul className="space-y-2">
                                                {chapter.materials.map((mat) => (
                                                    <li key={mat.id} className="flex items-center gap-3 text-sm text-gray-700">
                                                        <FiLock className="text-gray-400" size={16} />
                                                        <span>{mat.title}</span>
                                                        {mat.duration > 0 && (
                                                            <span className="ml-auto text-gray-500 text-xs">
                                                                {mat.duration} min
                                                            </span>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-gray-500">No materials available</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No curriculum available</p>
                    )}
                </div>

                {/* ================= REVIEWS ================= */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-xl font-semibold mb-4">
                        Student Reviews
                    </h2>

                    {course.reviewsList && course.reviewsList.length > 0 ? (
                        course.reviewsList.map((rev, i) => (
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
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No reviews yet. Be the first to review this course!</p>
                    )}
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
