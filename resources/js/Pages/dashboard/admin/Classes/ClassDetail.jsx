import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../layouts/AdminLayout";
import ConfirmModal from "../../../../Components/ConfirmModal";
import axios from "../../../../axios";
import {
    FiArrowLeft,
    FiBookOpen,
    FiChevronDown,
    FiCreditCard,
    FiFlag,
    FiLayers,
    FiStar,
    FiUser,
    FiXCircle,
} from "react-icons/fi";

export default function ClassDetail() {
    const { classId, id } = useParams();
    const courseId = classId || id;
    const navigate = useNavigate();

    const [cls, setCls] = useState(null);
    const [instructor, setInstructor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openChapters, setOpenChapters] = useState({});
    const [confirmModal, setConfirmModal] = useState({
        open: false,
        action: null,
        title: "",
        message: "",
    });

    useEffect(() => {
        if (!courseId) return;

        const fetchCourse = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`/courses/${courseId}`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                });

                const course = res.data;
                console.log('Admin ClassDetail - Course data:', course);
                console.log('Materials:', course.chapters?.map(ch => ({
                    chapter: ch.title,
                    materials: ch.materials?.map(m => ({
                        title: m.title,
                        video_url: m.video_url,
                        video_url_type: typeof m.video_url,
                    }))
                })));

                const chapters = (course.chapters || []).map((ch) => ({
                    id: ch.id,
                    title: ch.title || "Untitled Chapter",
                    description: ch.description || null,
                    materials: (ch.materials || []).map((m) => {
                        // Clean video_url - handle null, empty string, or string "null"
                        const videoUrl = m.video_url && 
                                        m.video_url !== '' && 
                                        m.video_url !== 'null' && 
                                        String(m.video_url).trim().length > 0 
                                        ? m.video_url 
                                        : null;
                        return {
                            id: m.id,
                            title: m.title,
                            video: videoUrl ? "Video" : null,
                            videoUrl: videoUrl,
                        };
                    }),
                    quiz: ch.quiz
                        ? {
                              id: ch.quiz.id,
                              title: ch.quiz.title,
                              questions: (ch.quiz.questions || []).length,
                          }
                        : null,
                }));

                const finalQuizRaw = (course.quizzes || []).find((q) => !q.chapter_id);
                const finalQuiz = finalQuizRaw
                    ? {
                          id: finalQuizRaw.id,
                          title: finalQuizRaw.title,
                          questions: (finalQuizRaw.questions || []).length,
                          passing: finalQuizRaw.passing || null,
                      }
                    : null;

                setCls({
                    id: course.id,
                    title: course.title,
                    thumbnail: course.thumbnail ? `/${course.thumbnail}` : "/images/htmlcss.jpg",
                    instructor_id: course.instructor_id,
                    instructor: course.instructor?.name || "Unknown",
                    instructorEmail: course.instructor?.email || "",
                    category: course.category || "",
                    level: course.level || "",
                    price: course.price || 0,
                    enrollment: course.enrollments_count || 0,
                    rating: course.rating || 0,
                    status: course.status || "Pending",
                    description: course.description || "",
                    learning: course.learning || [],
                    chapters,
                    finalQuiz,
                });

                // Fetch instructor profile
                if (course.instructor_id) {
                    try {
                        const instructorRes = await axios.get(
                            `/instructors/${course.instructor_id}/profile`,
                            { headers: token ? { Authorization: `Bearer ${token}` } : {} }
                        );
                        setInstructor(instructorRes.data);
                    } catch (err) {
                        console.error("Failed to fetch instructor profile:", err);
                        // Fallback ke data dari course
                        setInstructor({
                            id: course.instructor_id,
                            name: course.instructor?.name || "Unknown",
                            avatar: course.instructor?.avatar || "", // Empty string fallback to generated avatar
                            bio: course.instructor?.bio || "Experienced instructor",
                            email: course.instructor?.email || "",
                        });
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    const handleConfirmAction = async () => {
        const token = localStorage.getItem("token");
        let newStatus = cls.status;

        if (confirmModal.action === "approve") {
            newStatus = "Published";
        } else if (confirmModal.action === "reject") {
            newStatus = "Rejected";
        } else if (confirmModal.action === "archive") {
            newStatus = "Archived";
        } else if (confirmModal.action === "restore") {
            newStatus = "Approved";
        }

        // Update status via API
        try {
            const response = await axios.patch(`/courses/${cls.id}`, { status: newStatus }, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            console.log("Update response:", response.data);
            setCls((prev) => (prev ? { ...prev, status: newStatus } : prev));
            alert("Status berhasil diubah");
        } catch (err) {
            console.error("Failed to update status:", err);
            console.error("Error response:", err.response?.data);
            alert(`Gagal mengubah status class: ${err.response?.data?.message || err.message}`);
        }

        setConfirmModal({ open: false, action: null, title: "", message: "" });
    };

    if (loading || !cls) {
        return (
            <AdminLayout>
                <div className="p-6">Loading...</div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="px-1 pb-10">
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate("/admin/classes")}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition"
                    >
                        <FiArrowLeft size={18} />
                    </button>
                    <h1 className="text-2xl font-bold">Class Detail</h1>
                </div>

                <div className="bg-white rounded-xl shadow p-6 flex gap-8">
                    <img 
                        src={cls.thumbnail} 
                        onError={(e) => {
                            e.target.src = "/images/htmlcss.jpg";
                        }}
                        className="w-48 h-32 rounded-lg object-cover" 
                    />

                    <div className="flex-1">
                        <h2 className="text-2xl font-bold">{cls.title}</h2>
                        <p className="text-gray-500">{cls.category}</p>

                        <div className="flex gap-6 mt-2 text-sm text-gray-700">
                            <div className="flex items-center gap-2">
                                <FiLayers className="text-blue-600" />
                                {cls.level}
                            </div>
                            <div className="flex items-center gap-2">
                                <FiUser className="text-purple-600" />
                                {cls.enrollment} Students
                            </div>
                            <div className="flex items-center gap-2">
                                <FiStar className="text-yellow-500" />
                                {cls.rating}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <FiCreditCard className="text-green-600" />
                            Rp {cls.price.toLocaleString("id-ID")}
                        </div>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        <span
                            className={`px-4 py-1 text-sm rounded-full ${
                                cls.status === "Published"
                                    ? "bg-green-100 text-green-700"
                                    : cls.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : cls.status === "Approved"
                                    ? "bg-blue-100 text-blue-700"
                                    : cls.status === "Archived"
                                    ? "bg-gray-200 text-gray-700"
                                    : "bg-red-100 text-red-600"
                            }`}
                        >
                            {cls.status}
                        </span>

                        {cls.status === "Pending" && (
                            <div className="flex flex-col gap-2 w-40">
                                <button
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm text-center"
                                    onClick={() =>
                                        setConfirmModal({
                                            open: true,
                                            action: "approve",
                                            title: "Approve Class?",
                                            message: "Apakah Anda yakin ingin menerima class ini?",
                                        })
                                    }
                                >
                                    Approve
                                </button>

                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm text-center"
                                    onClick={() =>
                                        setConfirmModal({
                                            open: true,
                                            action: "reject",
                                            title: "Reject Class?",
                                            message: "Apakah Anda yakin ingin menolak class ini?",
                                        })
                                    }
                                >
                                    Reject
                                </button>
                            </div>
                        )}

                        {cls.status === "Published" && (
                            <button
                                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 text-sm"
                                onClick={() =>
                                    setConfirmModal({
                                        open: true,
                                        action: "archive",
                                        title: "Archive Class?",
                                        message: "Class yang diarsipkan akan tersembunyi dari siswa.",
                                    })
                                }
                            >
                                Archive Class
                            </button>
                        )}

                        {cls.status === "Archived" && (
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                                onClick={() =>
                                    setConfirmModal({
                                        open: true,
                                        action: "restore",
                                        title: "Restore Class?",
                                        message: "Class ini akan kembali terlihat.",
                                    })
                                }
                            >
                                Restore Class
                            </button>
                        )}
                    </div>
                </div>

                <div className="mt-8 bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FiBookOpen className="text-blue-600" /> Course Materials
                    </h3>

                    <div className="space-y-4">
                        {cls.chapters.map((chapter, index) => {
                            const open = !!openChapters[chapter.id];
                            return (
                                <div key={chapter.id} className="border rounded-xl bg-gray-50">
                                    <button
                                        onClick={() =>
                                            setOpenChapters((prev) => ({
                                                ...prev,
                                                [chapter.id]: !prev[chapter.id],
                                            }))
                                        }
                                        className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-100 transition"
                                    >
                                        <span className="font-semibold text-base">
                                            {index + 1}. {chapter.title}
                                        </span>
                                        <FiChevronDown
                                            className={`text-xl transition-transform ${open ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {open && (
                                        <div className="px-6 pb-4 pt-1 space-y-3 text-gray-700 text-sm">
                                            {chapter.materials.map((m) => {
                                                console.log(`Material "${m.title}": video="${m.video}", videoUrl="${m.videoUrl}"`);
                                                return (
                                                    <div key={m.id} className="flex justify-between items-center py-2 px-2 hover:bg-gray-100 rounded">
                                                        <span>
                                                            {m.video ? (
                                                                <span className="text-blue-600 font-medium">
                                                                    📹 {m.title} <span className="text-gray-500 font-normal">(Video)</span>
                                                                </span>
                                                            ) : (
                                                                <span>
                                                                    📄 {m.title} <span className="text-gray-500">(Text)</span>
                                                                </span>
                                                            )}
                                                        </span>
                                                        <button
                                                            className="text-blue-600 hover:text-blue-800 font-medium"
                                                            onClick={() => navigate(`/admin/classes/${cls.id}/materials/${m.id}`)}
                                                        >
                                                            View
                                                        </button>
                                                    </div>
                                                );
                                            })}

                                            {chapter.quiz && (
                                                <div className="flex justify-between items-center pt-2 border-t">
                                                    <span className="font-medium">
                                                        • {chapter.quiz.title} <span className="text-gray-500">({chapter.quiz.questions} Questions)</span>
                                                    </span>
                                                    <button
                                                        className="text-blue-600 hover:text-blue-800"
                                                        onClick={() => navigate(`/admin/classes/${cls.id}/quizzes/${chapter.quiz.id}`)}
                                                    >
                                                        View
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-6 bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FiFlag className="text-red-500" /> Final Quiz
                    </h3>

                    {!cls.finalQuiz ? (
                        <div>—</div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-gray-800">{cls.finalQuiz.title}</p>
                                <p className="text-gray-600 text-sm">{cls.finalQuiz.questions} Questions</p>
                            </div>

                            <button
                                className="text-blue-600 hover:text-blue-800"
                                onClick={() => navigate(`/admin/classes/${cls.id}/quizzes/${cls.finalQuiz.id}`)}
                            >
                                View
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-6 bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-4">Instructor Info</h3>

                    {instructor ? (
                        <div className="flex gap-6 items-start">
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
                                className="w-20 h-20 rounded-full border object-cover flex-shrink-0"
                            />

                            <div className="flex-1">
                                <p className="font-semibold text-lg">{instructor.name}</p>
                                <p className="text-gray-600 text-sm">{instructor.bio || "Professional Instructor"}</p>
                                <p className="text-gray-500 text-xs mt-2">{instructor.email}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-500">Loading instructor info...</div>
                    )}
                </div>
            </div>

            <ConfirmModal
                open={confirmModal.open}
                title={confirmModal.title}
                message={confirmModal.message}
                onConfirm={handleConfirmAction}
                onClose={() => setConfirmModal({ open: false, action: null, title: "", message: "" })}
            />
        </AdminLayout>
    );
}
