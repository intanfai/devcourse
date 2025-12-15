import { useParams, useNavigate } from "react-router-dom";
import StudentLayout from "../../../../layouts/StudentLayout";
import { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import axios from "../../../../axios";

export default function QuizPage() {
    const { courseId, quizId } = useParams();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        fetchQuiz();
    }, [quizId]);

    const fetchQuiz = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`/quizzes/${quizId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = res.data;
            const quiz = {
                id: data.id,
                title: data.title,
                passing: data.passing || 60,
                questions: (data.questions || []).map((q) => ({
                    id: q.id,
                    question: q.question,
                    options: [
                        q.option_a,
                        q.option_b,
                        q.option_c,
                        q.option_d,
                    ].filter((opt) => opt),
                    correct: getCorrectIndex(
                        [q.option_a, q.option_b, q.option_c, q.option_d],
                        q.correct_answer
                    ),
                })),
            };

            setQuiz(quiz);
        } catch (err) {
            console.error("Failed to fetch quiz:", err);
        } finally {
            setLoading(false);
        }
    };

    const getCorrectIndex = (options, correctAnswer) => {
        const map = { A: 0, B: 1, C: 2, D: 3 };
        return map[correctAnswer] ?? 0;
    };

    const handleSelect = (qId, index) => {
        if (submitted) return;
        setAnswers({ ...answers, [qId]: index });
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    return (
        <StudentLayout>
            <div className="pb-10 px-1">
                {/* ========== BACK BUTTON + TITLE (SEJARIS) ========== */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(`/student/course/${courseId}`)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button>

                    <h1 className="text-2xl font-bold">{quiz?.title || "Loading..."}</h1>
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-gray-500">Loading quiz...</p>
                    </div>
                )}

                {!loading && !quiz && (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-gray-500">Quiz not found</p>
                    </div>
                )}

                {!loading && quiz && (
                    <div className="bg-white p-6 rounded-xl shadow space-y-10">
                        {quiz.questions.map((q, qIndex) => {
                            const userAnswer = answers[q.id];
                            const correctAnswer = q.correct;

                            return (
                                <div key={q.id} className="space-y-3">
                                    <h3 className="font-semibold text-lg">
                                        {qIndex + 1}. {q.question}
                                    </h3>

                                    <div className="space-y-3">
                                        {q.options.map((opt, i) => {
                                            const isCorrect =
                                                submitted && i === correctAnswer;
                                            const isWrong =
                                                submitted &&
                                                userAnswer === i &&
                                                i !== correctAnswer;

                                            return (
                                                <label
                                                    key={i}
                                                    className={`
                                                        flex items-center gap-3 p-3 rounded-lg border cursor-pointer
                                                        transition
                                                        ${
                                                            isCorrect
                                                                ? "bg-green-100 border-green-500"
                                                                : isWrong
                                                                ? "bg-red-100 border-red-500"
                                                                : "bg-gray-50 hover:bg-gray-100"
                                                        }
                                                    `}
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`q-${q.id}`}
                                                        disabled={submitted}
                                                        checked={userAnswer === i}
                                                        onChange={() =>
                                                            handleSelect(q.id, i)
                                                        }
                                                    />
                                                    <span>{opt}</span>
                                                </label>
                                            );
                                        })}
                                    </div>

                                    {/* Show correct answer text */}
                                    {submitted && (
                                        <p className="text-green-600 text-sm font-medium mt-2">
                                            ✔ Correct answer:{" "}
                                            {q.options[correctAnswer]}
                                        </p>
                                    )}
                                </div>
                            );
                        })}

                        {/* SUBMIT / TRY AGAIN BUTTONS */}
                        <div className="flex gap-4 pt-4">
                            {!submitted ? (
                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                                >
                                    Submit Answers
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            setAnswers({});
                                            setSubmitted(false);
                                        }}
                                        className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold"
                                    >
                                        Try Again
                                    </button>

                                    <button
                                        onClick={() => navigate(-1)}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                                    >
                                        Finish
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
