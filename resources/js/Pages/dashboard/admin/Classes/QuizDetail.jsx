import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../layouts/AdminLayout";
import { useState } from "react";
import { FiArrowLeft, FiHelpCircle, FiList, FiCheck } from "react-icons/fi";

export default function QuizDetail() {
    const { classId, quizId } = useParams();
    const navigate = useNavigate();

    // ====== Dummy Quiz Data ======
    const [quiz] = useState({
        id: quizId,
        title: "React Components Quiz",
        questions: [
            {
                id: 1,
                question: "What is a React component?",
                options: [
                    "Reusable UI element",
                    "CSS class",
                    "JavaScript variable",
                    "Database schema",
                ],
                correct: 0,
            },
            {
                id: 2,
                question: "Which hook is used for state?",
                options: ["useFetch", "useState", "useEvent", "useForm"],
                correct: 1,
            },
            {
                id: 3,
                question: "Props are…",
                options: [
                    "Mutable data",
                    "Used to pass data",
                    "Only for styling",
                    "Database connection",
                ],
                correct: 1,
            },
        ],
        passing: 70,
    });

    return (
        <AdminLayout>
            <div className="px-1 pb-10">

                {/* BACK BUTTON */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition"
                    >
                        <FiArrowLeft size={18} />
                    </button>

                    <h1 className="text-2xl font-bold">Quiz Detail</h1>
                </div>

                {/* QUIZ HEADER */}
                <div className="bg-white rounded-xl shadow p-6 mb-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <FiHelpCircle className="text-blue-600" />
                        {quiz.title}
                    </h2>

                    <p className="mt-2 text-gray-600">
                        Total Questions: <strong>{quiz.questions.length}</strong>
                        <br />
                        Passing Score: <strong>{quiz.passing}%</strong>
                    </p>
                </div>

                {/* QUESTIONS LIST */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <FiList /> Questions
                    </h3>

                    <div className="space-y-6">
                        {quiz.questions.map((q, i) => (
                            <div key={q.id} className="border-b pb-4">
                                <p className="font-semibold mb-2">
                                    {i + 1}. {q.question}
                                </p>

                                {/* OPTIONS */}
                                <div className="ml-5 space-y-1">
                                    {q.options.map((opt, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex items-center gap-2 ${
                                                q.correct === idx
                                                    ? "text-green-700 font-semibold"
                                                    : "text-gray-700"
                                            }`}
                                        >
                                            {q.correct === idx && (
                                                <FiCheck className="text-green-600" />
                                            )}
                                            <span>{opt}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}
