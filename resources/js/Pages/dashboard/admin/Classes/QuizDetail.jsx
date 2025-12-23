import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../layouts/AdminLayout";
import { useState, useEffect } from "react";
import { FiArrowLeft, FiHelpCircle, FiList, FiCheck } from "react-icons/fi";
import axios from "../../../../axios";

export default function QuizDetail() {
    const { classId, quizId } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                
                const res = await axios.get(`/quizzes/${quizId}`, { headers });
                const quizData = res.data;

                // Transform questions data to match UI expectations
                const formattedQuestions = (quizData.questions || []).map((q) => ({
                    id: q.id,
                    question: q.question,
                    options: [q.option_a, q.option_b, q.option_c, q.option_d].filter(Boolean),
                    correct: q.correct_answer, // This should be the correct answer text or index
                }));

                setQuiz({
                    id: quizData.id,
                    title: quizData.title,
                    passing: quizData.passing || 60,
                    questions: formattedQuestions,
                });
            } catch (err) {
                console.error("Failed to fetch quiz:", err);
            } finally {
                setLoading(false);
            }
        };

        if (quizId) {
            fetchQuiz();
        }
    }, [quizId]);

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500">Loading quiz...</p>
                </div>
            </AdminLayout>
        );
    }

    if (!quiz) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500">Quiz not found</p>
                </div>
            </AdminLayout>
        );
    }

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
                                    {q.options.map((opt, idx) => {
                                        const isCorrect = opt === q.correct;
                                        return (
                                            <div
                                                key={idx}
                                                className={`flex items-center gap-2 ${
                                                    isCorrect
                                                        ? "text-green-700 font-semibold"
                                                        : "text-gray-700"
                                                }`}
                                            >
                                                {isCorrect && (
                                                    <FiCheck className="text-green-600" />
                                                )}
                                                <span>{opt}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}
