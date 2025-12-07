import { useParams, useNavigate } from "react-router-dom";
import StudentLayout from "../../../layouts/StudentLayout";
import {
    FiArrowLeft,
    FiPlayCircle,
    FiCheckCircle,
    FiHelpCircle,
} from "react-icons/fi";

export default function MaterialPage() {
    const { courseId, materialId } = useParams();
    const navigate = useNavigate();

    // Dummy data
    const course = {
        id: courseId,
        title: "React Fundamentals",
        finalQuiz: {
            id: 999,
            title: "Final Course Quiz",
            totalQuestions: 25,
            done: false,
        },
        chapters: [
            {
                id: 1,
                title: "Introduction to React",
                materials: [
                    {
                        id: 1,
                        title: "What is React?",
                        type: "text",
                        done: true,
                        content: `
React adalah library JavaScript yang digunakan untuk membangun UI
secara deklaratif dan efisien. Dengan React, UI dipecah menjadi komponen
kecil yang dapat digunakan kembali sehingga membuat development lebih cepat.`,
                    },
                    {
                        id: 2,
                        title: "Environment Setup",
                        type: "video",
                        done: true,
                        url: "https://www.youtube.com/embed/Tn6-PIqc4UM",
                        content: `
Cara setup React menggunakan Vite atau Create React App
dan memahami struktur folder.`,
                    },
                ],
                quiz: { id: 101, title: "Chapter 1 Quiz", done: true },
            },
            {
                id: 2,
                title: "Components & Props",
                materials: [
                    {
                        id: 3,
                        title: "Understanding Components",
                        type: "text",
                        done: false,
                        content: `
Komponen adalah fondasi utama React. Bisa berbentuk function atau class.`,
                    },
                    {
                        id: 4,
                        title: "Props Deep Dive",
                        type: "video",
                        done: false,
                        url: "https://www.youtube.com/embed/w7ejDZ8SWv8",
                        content: `
Props adalah data yang dikirim dari parent ke child component.`,
                    },
                ],
                quiz: { id: 102, title: "Chapter 2 Quiz", done: false },
            },
        ],
    };

    const chapter = course.chapters.find((ch) =>
        ch.materials.some((m) => m.id == materialId)
    );

    const material = chapter.materials.find((m) => m.id == materialId);

    return (
        <StudentLayout>
            <div className="pb-6 px-3 lg:px-1 w-full overflow-x-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                    {/* ================= LEFT CONTENT ================= */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow w-full">
                        <div className="flex items-center gap-4 mb-6">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                            >
                                <FiArrowLeft size={18} />
                            </button>

                            <h1 className="text-2xl font-bold">
                                {material.title}
                            </h1>
                        </div>

                        <div className="mb-4">
                            {/* VIDEO */}
                            {material.type === "video" && (
                                <div className="w-full aspect-video rounded-lg overflow-hidden mb-4">
                                    <iframe
                                        className="w-full h-full"
                                        src={material.url}
                                        title={material.title}
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}

                            {/* TEXT */}
                            {material.type === "text" && (
                                <p className="text-gray-700 text-sm leading-relaxed mb-4 whitespace-pre-line">
                                    {material.content}
                                </p>
                            )}

                            {/* Extra content */}
                            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                                {material.content}
                            </div>
                        </div>
                    </div>

                    {/* ================= RIGHT SIDEBAR CONTENT ================= */}
                    <div className="bg-white p-5 rounded-xl shadow h-fit w-full">
                        <h2 className="text-lg font-semibold mb-3 border-l-4 pl-3 border-[#3C64EF]">
                            Course Content
                        </h2>

                        <div className="space-y-5">
                            {course.chapters.map((ch) => (
                                <div
                                    key={ch.id}
                                    className="border rounded-lg p-4 bg-gray-50"
                                >
                                    <h3 className="font-semibold text-sm mb-2">
                                        {ch.title}
                                    </h3>

                                    <ul className="space-y-1">
                                        {ch.materials.map((m) => (
                                            <li
                                                key={m.id}
                                                onClick={() =>
                                                    navigate(
                                                        `/student/course/${course.id}/material/${m.id}`
                                                    )
                                                }
                                                className={`
                                                    p-2 rounded-lg flex justify-between items-start cursor-pointer
                                                    break-words
                                                    ${
                                                        m.id == materialId
                                                            ? "bg-blue-100"
                                                            : "bg-white"
                                                    }
                                                    hover:bg-gray-100 border
                                                `}
                                            >
                                                <p className="text-sm w-[80%] break-words">
                                                    {m.title}
                                                </p>

                                                {m.done ? (
                                                    <FiCheckCircle className="text-green-600 text-lg" />
                                                ) : (
                                                    <FiPlayCircle className="text-blue-600 text-lg" />
                                                )}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* QUIZ */}
                                    <div
                                        className="mt-3 p-3 bg-white rounded-lg border cursor-pointer hover:bg-gray-100 flex justify-between items-center"
                                        onClick={() =>
                                            navigate(
                                                `/student/course/${course.id}/quiz/${ch.quiz.id}`
                                            )
                                        }
                                    >
                                        <div className="flex items-center gap-2">
                                            <FiHelpCircle className="text-purple-500" />
                                            <p className="text-sm font-medium">
                                                {ch.quiz.title}
                                            </p>
                                        </div>

                                        {ch.quiz.done ? (
                                            <FiCheckCircle className="text-green-600" />
                                        ) : (
                                            <FiPlayCircle className="text-blue-600" />
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* FINAL QUIZ */}
                            <div
                                className="border rounded-xl p-4 bg-gray-50 cursor-pointer hover:bg-gray-100"
                                onClick={() =>
                                    navigate(
                                        `/student/course/${course.id}/final-quiz`
                                    )
                                }
                            >
                                <h3 className="font-semibold mb-2">
                                    Final Quiz
                                </h3>

                                <div className="flex justify-between items-center bg-white p-3 rounded-lg border">
                                    <div className="flex items-center gap-3">
                                        <FiHelpCircle className="text-blue-600" />
                                        <p>{course.finalQuiz.title}</p>
                                    </div>

                                    {course.finalQuiz.done ? (
                                        <FiCheckCircle className="text-green-600" />
                                    ) : (
                                        <FiPlayCircle className="text-blue-600" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
