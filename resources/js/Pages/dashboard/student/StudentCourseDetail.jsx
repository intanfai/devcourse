import { useParams, useNavigate } from "react-router-dom";
import StudentLayout from "../../../layouts/StudentLayout";
import {
    FiCheckCircle,
    FiPlayCircle,
    FiFileText,
    FiHelpCircle,
    FiStar,
    FiUsers,
    FiArrowLeft,
} from "react-icons/fi";
import { useEffect, useState } from "react";

export default function StudentCourseDetail() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    // =======================
    // DUMMY BASE STRUCTURE
    // =======================
    const baseCourse = {
        id: courseId,
        title: "React Fundamentals",
        category: "Web Development",
        level: "Beginner",
        description:
            "Master React from basics to advanced concepts. Learn components, props, hooks and build projects.",
        thumbnail: "/images/course-thumb.jpg",

        rating: 4.8,
        reviews: 560,
        studentsCount: 12880,

        instructor: {
            name: "John Anderson",
            avatar: "/images/avatar.png",
        },

        chapters: [
            {
                id: 1,
                title: "Introduction to React",
                materials: [
                    { id: 1, title: "What is React?", duration: "05:12" },
                    { id: 2, title: "Environment Setup", duration: "08:55" },
                ],
                quiz: { id: 101, title: "Chapter 1 Quiz" },
            },
            {
                id: 2,
                title: "Components & Props",
                materials: [
                    {
                        id: 3,
                        title: "Understanding Components",
                        duration: "10:14",
                    },
                    { id: 4, title: "Props Deep Dive", duration: "12:34" },
                ],
                quiz: { id: 102, title: "Chapter 2 Quiz" },
            },
            {
                id: 3,
                title: "React Hooks",
                materials: [
                    { id: 5, title: "useState Basics", duration: "09:18" },
                    { id: 6, title: "useEffect Explained", duration: "11:45" },
                ],
                quiz: { id: 103, title: "Chapter 3 Quiz" },
            },
        ],

        finalQuiz: {
            id: 999,
            title: "Final Course Quiz",
        },
    };

    // =============================
    // LOAD PROGRESS FROM LOCALSTORAGE
    // =============================
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const savedProgress = localStorage.getItem(`progress-${courseId}`);

        if (savedProgress) {
            setCourse(JSON.parse(savedProgress));
        } else {
            // Initialize with "done = false"
            const updated = {
                ...baseCourse,
                chapters: baseCourse.chapters.map((c) => ({
                    ...c,
                    materials: c.materials.map((m) => ({
                        ...m,
                        done: false,
                    })),
                    quiz: { ...c.quiz, done: false },
                })),
                finalQuiz: { ...baseCourse.finalQuiz, done: false },
            };

            setCourse(updated);
            localStorage.setItem(
                `progress-${courseId}`,
                JSON.stringify(updated)
            );
        }
    }, [courseId]);

    // Save on updates
    const saveProgress = (data) => {
        localStorage.setItem(`progress-${courseId}`, JSON.stringify(data));
        setCourse(data);
    };

    if (!course) return <div>Loading...</div>;

    // =============================
    // UNLOCK LOGIC
    // =============================

    // 1) Determine NEXT ITEM
    const getNextItem = () => {
        for (let ch of course.chapters) {
            for (let m of ch.materials) {
                if (!m.done)
                    return {
                        type: "material",
                        chapterId: ch.id,
                        item: m,
                        link: `/student/course/${course.id}/material/${m.id}`,
                    };
            }
            if (!ch.quiz.done)
                return {
                    type: "quiz",
                    chapterId: ch.id,
                    item: ch.quiz,
                    link: `/student/course/${course.id}/quiz/${ch.quiz.id}`,
                };
        }

        if (!course.finalQuiz.done)
            return {
                type: "finalQuiz",
                item: course.finalQuiz,
                link: `/student/course/${course.id}/final-quiz`,
            };

        return null;
    };

    const nextItem = getNextItem();

    // 2) Check if Final Quiz is unlocked
    const isFinalQuizUnlocked = course.chapters.every((ch) => {
        const allMaterials = ch.materials.every((m) => m.done);
        const quizDone = ch.quiz.done;
        return allMaterials && quizDone;
    });

    return (
        <StudentLayout>
            <div className="pb-6">
                {/* BACK BUTTON */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button>
                    <h1 className="text-2xl font-bold">{course.title}</h1>
                </div>

                {/* HEADER */}
                <div className="bg-white rounded-xl shadow p-6 mb-8 flex gap-6">
                    <div className="w-56 h-36 overflow-hidden rounded-xl bg-gray-200">
                        <img
                            src={course.thumbnail}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1 pr-10">
                        <h1 className="text-2xl font-bold mb-2">
                            {course.title}
                        </h1>

                        <div className="flex items-center gap-3 mb-3">
                            <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                                {course.level}
                            </span>
                            <span className="text-sm text-gray-500">
                                {course.category}
                            </span>
                        </div>

                        <div className="flex items-center gap-8 text-sm mb-4">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <FiStar /> {course.rating}
                                <span className="text-gray-500 ml-1">
                                    ({course.reviews} reviews)
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <FiUsers />
                                {course.studentsCount.toLocaleString()} students
                            </div>

                            <div className="flex items-center gap-2">
                                <img
                                    src={course.instructor.avatar}
                                    className="w-8 h-8 rounded-full border"
                                />
                                <span className="text-gray-700">
                                    {course.instructor.name}
                                </span>
                            </div>
                        </div>

                        {/* CONTINUE BUTTON */}
                        {nextItem ? (
                            <button
                                onClick={() => navigate(nextItem.link)}
                                className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition shadow-sm"
                            >
                                <FiPlayCircle />
                                Continue: {nextItem.item.title}
                            </button>
                        ) : (
                            <p className="mt-4 text-green-600 font-semibold">
                                🎉 Course Completed!
                            </p>
                        )}
                    </div>
                </div>

                {/* COURSE CONTENT */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4 border-l-4 pl-3 border-[#3C64EF]">
                        Course Content
                    </h2>

                    <div className="space-y-6">
                        {course.chapters.map((chapter) => {
                            const chapterIndex = course.chapters.findIndex(
                                (c) => c.id === chapter.id
                            );

                            return (
                                <div
                                    key={chapter.id}
                                    className="border rounded-xl p-4 bg-gray-50"
                                >
                                    <div className="flex justify-between mb-2">
                                        <h3 className="font-semibold">
                                            {chapter.title}
                                        </h3>

                                        <span
                                            className={`text-xs px-2 py-1 rounded-full ${
                                                chapter.materials.every(
                                                    (m) => m.done
                                                ) && chapter.quiz.done
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                            }`}
                                        >
                                            {chapter.materials.every(
                                                (m) => m.done
                                            ) && chapter.quiz.done
                                                ? "completed"
                                                : "in-progress"}
                                        </span>
                                    </div>

                                    {/* MATERIALS */}
                                    <ul className="space-y-2">
                                        {chapter.materials.map((m, index) => {
                                            const canOpen =
                                                index === 0 ||
                                                chapter.materials[index - 1]
                                                    .done;

                                            return (
                                                <li
                                                    key={m.id}
                                                    onClick={() =>
                                                        canOpen &&
                                                        navigate(
                                                            `/student/course/${course.id}/material/${m.id}`
                                                        )
                                                    }
                                                    className={`
                                                        flex justify-between items-center bg-white p-3 
                                                        border rounded-lg cursor-pointer
                                                        ${
                                                            canOpen
                                                                ? "hover:bg-gray-100"
                                                                : "opacity-50 cursor-not-allowed"
                                                        }
                                                    `}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <FiFileText className="text-gray-500" />
                                                        <p className="text-sm">
                                                            {m.title}
                                                        </p>
                                                    </div>

                                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                                        <span>
                                                            {m.duration}
                                                        </span>
                                                        {m.done ? (
                                                            <FiCheckCircle className="text-green-600" />
                                                        ) : (
                                                            <FiPlayCircle className="text-blue-600" />
                                                        )}
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>

                                    {/* QUIZ */}
                                    <div
                                        className={`mt-3 bg-white border rounded-lg p-3 flex items-center justify-between 
                                            ${
                                                chapter.materials.every(
                                                    (m) => m.done
                                                )
                                                    ? "cursor-pointer hover:bg-gray-100"
                                                    : "opacity-50 cursor-not-allowed"
                                            }`}
                                        onClick={() =>
                                            chapter.materials.every(
                                                (m) => m.done
                                            ) &&
                                            navigate(
                                                `/student/course/${course.id}/quiz/${chapter.quiz.id}`
                                            )
                                        }
                                    >
                                        <div className="flex items-center gap-3">
                                            <FiHelpCircle className="text-purple-500" />
                                            <p className="font-medium">
                                                {chapter.quiz.title}
                                            </p>
                                        </div>

                                        {chapter.quiz.done ? (
                                            <FiCheckCircle className="text-green-600" />
                                        ) : (
                                            <FiPlayCircle className="text-blue-600" />
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {/* FINAL QUIZ */}
                        <div
                            className={`border rounded-xl p-4 bg-gray-50 
                                ${
                                    isFinalQuizUnlocked
                                        ? "cursor-pointer hover:bg-gray-100"
                                        : "opacity-50 cursor-not-allowed"
                                }`}
                            onClick={() =>
                                isFinalQuizUnlocked &&
                                navigate(
                                    `/student/course/${course.id}/final-quiz`
                                )
                            }
                        >
                            <h3 className="font-semibold mb-2">Final Quiz</h3>

                            <div className="flex justify-between items-center bg-white p-3 rounded-lg border">
                                <div className="flex items-center gap-3">
                                    <FiHelpCircle
                                        className={`${
                                            isFinalQuizUnlocked
                                                ? "text-blue-600"
                                                : "text-gray-400"
                                        }`}
                                    />
                                    <p>{course.finalQuiz.title}</p>
                                </div>

                                <FiPlayCircle
                                    className={`${
                                        isFinalQuizUnlocked
                                            ? "text-blue-600"
                                            : "text-gray-400"
                                    }`}
                                />
                            </div>

                            {!isFinalQuizUnlocked && (
                                <p className="text-xs text-red-500 mt-2">
                                    Complete all chapters & quizzes to unlock
                                    the final quiz.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
