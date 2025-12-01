import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../layouts/AdminLayout";
import ConfirmModal from "../../../../Components/ConfirmModal";
import { useState } from "react";
import {
    FiChevronDown,
    FiFlag,
    FiBookOpen,
    FiStar,
    FiUser,
    FiLayers,
    FiCreditCard,
    FiXCircle,
    FiArrowLeft,
} from "react-icons/fi";

export default function ClassDetail() {
    // ===== MODAL UNIVERSAL =====
    const [confirmModal, setConfirmModal] = useState({
        open: false,
        action: null,
        title: "",
        message: "",
    });

    const { classId } = useParams();
    const navigate = useNavigate();

    // ===== DUMMY DATA =====
    const [cls, setCls] = useState({
        id: classId,
        title: "React Basics",
        thumbnail: "/images/class-thumb.jpg",
        instructor: "John Doe",
        instructorEmail: "john@example.com",
        category: "Web Development",
        level: "Beginner",
        price: 150000,
        enrollment: 241,
        rating: 4.6,
        status: "Pending",
        description:
            "This course introduces the fundamentals of React including components, props, state management, and hooks.",
        learning: ["Understand JSX", "Manage State", "Use React Hooks"],
        chapters: [
            {
                id: 1,
                title: "Getting Started",
                materials: [
                    { id: 11, title: "What is React?", video: "10:20" },
                    { id: 12, title: "Installing Environment", video: "08:12" },
                ],
                quiz: {
                    id: 101,
                    title: "Chapter 1 Quiz",
                    questions: 5,
                    passing: 60,
                },
            },
        ],
        finalQuiz: {
            id: 999,
            title: "React Final Assessment",
            questions: 20,
            passing: 80,
        },
    });

    // ===== HANDLE CONFIRM ACTIONS =====
    const handleConfirmAction = () => {
        setCls((prev) => {
            if (confirmModal.action === "reject") {
                return { ...prev, status: "Rejected" };
            }
            if (confirmModal.action === "archive") {
                return { ...prev, status: "Archived" };
            }
            if (confirmModal.action === "restore") {
                return { ...prev, status: "Approved" };
            }
            return prev;
        });

        setConfirmModal({ open: false, action: null, title: "", message: "" });
    };

    return (
        <AdminLayout>
            <div className="px-1 pb-10">
                {/* BACK */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate("/admin/classes")}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition"
                    >
                        <FiArrowLeft size={18} />
                    </button>
                    <h1 className="text-2xl font-bold">Class Detail</h1>
                </div>

                {/* TOP CARD */}
                <div className="bg-white rounded-xl shadow p-6 flex gap-8">
                    <img
                        src={cls.thumbnail}
                        className="w-48 h-32 rounded-lg object-cover"
                    />

                    {/* INFO */}
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

                    {/* STATUS + ACTIONS */}
                    <div className="flex flex-col items-end gap-3">
                        {/* STATUS LABEL */}
                        <span
                            className={`px-4 py-1 text-sm rounded-full ${
                                cls.status === "Approved"
                                    ? "bg-green-100 text-green-700"
                                    : cls.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : cls.status === "Archived"
                                    ? "bg-gray-200 text-gray-700"
                                    : "bg-red-100 text-red-600"
                            }`}
                        >
                            {cls.status}
                        </span>

                        {/* PENDING */}
                        {cls.status === "Pending" && (
                            <div className="flex flex-col gap-2 w-40">
                                <button
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
                                    onClick={() =>
                                        setCls({ ...cls, status: "Approved" })
                                    }
                                >
                                    Approve
                                </button>

                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm flex items-center gap-2"
                                    onClick={() =>
                                        setConfirmModal({
                                            open: true,
                                            action: "reject",
                                            title: "Reject Class?",
                                            message:
                                                "Are you sure you want to reject this class?",
                                        })
                                    }
                                >
                                    <FiXCircle /> Reject
                                </button>
                            </div>
                        )}

                        {/* APPROVED → ARCHIVE */}
                        {cls.status === "Approved" && (
                            <button
                                className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 text-sm"
                                onClick={() =>
                                    setConfirmModal({
                                        open: true,
                                        action: "archive",
                                        title: "Archive Class?",
                                        message:
                                            "Archived classes are hidden from students.",
                                    })
                                }
                            >
                                Archive Class
                            </button>
                        )}

                        {/* ARCHIVED → RESTORE */}
                        {cls.status === "Archived" && (
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                                onClick={() =>
                                    setConfirmModal({
                                        open: true,
                                        action: "restore",
                                        title: "Restore Class?",
                                        message:
                                            "This class will become visible again.",
                                    })
                                }
                            >
                                Restore Class
                            </button>
                        )}
                    </div>
                </div>

                {/* COURSE MATERIALS */}
                <div className="mt-8 bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FiBookOpen className="text-blue-600" /> Course
                        Materials
                    </h3>

                    <div className="space-y-4">
                        {cls.chapters.map((chapter, index) => {
                            const [open, setOpen] = useState(false);
                            return (
                                <div
                                    key={chapter.id}
                                    className="border rounded-xl bg-gray-50"
                                >
                                    {/* CHAPTER HEADER */}
                                    <button
                                        onClick={() => setOpen(!open)}
                                        className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-100 transition"
                                    >
                                        <span className="font-semibold text-base">
                                            {index + 1}. {chapter.title}
                                        </span>
                                        <FiChevronDown
                                            className={`text-xl transition-transform ${
                                                open ? "rotate-180" : ""
                                            }`}
                                        />
                                    </button>

                                    {open && (
                                        <div className="px-6 pb-4 pt-1 space-y-3 text-gray-700 text-sm">
                                            {/* MATERIALS */}
                                            {chapter.materials.map((m) => (
                                                <div
                                                    key={m.id}
                                                    className="flex justify-between items-center py-1"
                                                >
                                                    <span>
                                                        • {m.title}{" "}
                                                        <span className="text-gray-500">
                                                            ({m.video})
                                                        </span>
                                                    </span>

                                                    <button
                                                        className="text-blue-600 hover:text-blue-800"
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/classes/${cls.id}/materials/${m.id}`
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </button>
                                                </div>
                                            ))}

                                            {/* CHAPTER QUIZ */}
                                            <div className="flex justify-between items-center pt-2 border-t">
                                                <span className="font-medium">
                                                    • {chapter.quiz.title}{" "}
                                                    <span className="text-gray-500">
                                                        (
                                                        {
                                                            chapter.quiz
                                                                .questions
                                                        }{" "}
                                                        Questions)
                                                    </span>
                                                </span>

                                                <button
                                                    className="text-blue-600 hover:text-blue-800"
                                                    onClick={() =>
                                                        navigate(
                                                            `/admin/classes/${cls.id}/quizzes/${chapter.quiz.id}`
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* FINAL QUIZ */}
                <div className="mt-6 bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FiFlag className="text-red-500" /> Final Quiz
                    </h3>

                    <div className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-gray-800">
                                {cls.finalQuiz.title}
                            </p>
                            <p className="text-gray-600 text-sm">
                                {cls.finalQuiz.questions} Questions — Passing
                                Score: {cls.finalQuiz.passing}%
                            </p>
                        </div>

                        <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() =>
                                navigate(
                                    `/admin/classes/${cls.id}/quizzes/${cls.finalQuiz.id}`
                                )
                            }
                        >
                            View
                        </button>
                    </div>
                </div>

                {/* INSTRUCTOR */}
                <div className="mt-6 bg-white p-6 rounded-xl shadow">
                    <h3 className="text-lg font-semibold mb-3">
                        Instructor Info
                    </h3>

                    <div className="flex gap-6">
                        <img
                            src="/images/avatar.png"
                            className="w-20 h-20 rounded-full border object-cover"
                        />

                        <div>
                            <p className="font-semibold">{cls.instructor}</p>
                            <p className="text-gray-500">
                                {cls.instructorEmail}
                            </p>

                            <p className="mt-2 text-sm text-gray-700">
                                4+ years of experience as Web Developer
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== MODAL ===== */}
            <ConfirmModal
                open={confirmModal.open}
                title={confirmModal.title}
                message={confirmModal.message}
                onConfirm={handleConfirmAction}
                onClose={() =>
                    setConfirmModal({
                        open: false,
                        action: null,
                        title: "",
                        message: "",
                    })
                }
            />
        </AdminLayout>
    );
}
