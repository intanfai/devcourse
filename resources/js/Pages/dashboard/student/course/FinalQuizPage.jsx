import { useNavigate, useParams } from "react-router-dom";
import StudentLayout from "../../../../layouts/StudentLayout";
import { FiArrowLeft, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "../../../../axios";

export default function FinalQuizPage() {
    const navigate = useNavigate();
    const { courseId } = useParams();

    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        fetchFinalQuiz();
    }, [courseId]);

    const fetchFinalQuiz = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`/courses/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = res.data;
            // Find final quiz (quiz without chapter_id)
            const finalQuizData = (data.quizzes || []).find(
                (q) => !q.chapter_id
            );

            if (!finalQuizData) {
                setLoading(false);
                return;
            }

            const quizFormatted = {
                id: finalQuizData.id,
                title: finalQuizData.title || "Final Course Quiz",
                passing: finalQuizData.passing || 60,
                questions: (finalQuizData.questions || []).map((q) => ({
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

            setQuiz(quizFormatted);

            // Check if quiz has any saved result
            const savedQuizResult = localStorage.getItem(
                `final-quiz-result-${courseId}`
            );
            if (savedQuizResult) {
                try {
                    const result = JSON.parse(savedQuizResult);
                    setAnswers(result.answers || {});
                    setAttempts(result.attempts || 1);
                    setSubmitted(true);
                    setShowSummary(true);
                } catch (e) {
                    console.warn("Failed to load final quiz result", e);
                }
            }
        } catch (err) {
            console.error("Failed to fetch final quiz:", err);
        } finally {
            setLoading(false);
        }
    };

    const getCorrectIndex = (options, correctAnswer) => {
        const index = options.findIndex((opt) => opt === correctAnswer);
        return index !== -1 ? index : 0;
    };

    const handleSelect = (qId, index) => {
        if (submitted) return;
        setAnswers({ ...answers, [qId]: index });
    };

    const calculateScore = () => {
        if (!quiz) return 0;
        const correct = quiz.questions.filter(
            (q) => answers[q.id] === q.correct
        ).length;
        return Math.round((correct / quiz.questions.length) * 100);
    };

    const getWrongQuestions = () => {
        if (!quiz) return [];
        return quiz.questions.filter((q) => answers[q.id] !== q.correct);
    };

    const handleSubmit = () => {
        if (Object.keys(answers).length !== quiz.questions.length) {
            alert("Harap jawab semua pertanyaan!");
            return;
        }

        const newAttempts = attempts + 1;
        setSubmitted(true);
        setShowSummary(true);
        setAttempts(newAttempts);

        const score = calculateScore();

        // Always save quiz result
        const quizResult = {
            answers: answers,
            attempts: newAttempts,
            score: score,
            timestamp: new Date().toISOString(),
        };
        localStorage.setItem(
            `final-quiz-result-${courseId}`,
            JSON.stringify(quizResult)
        );

        // Save to progress only if passed
        if (score >= quiz.passing) {
            const savedProgress = localStorage.getItem(`progress-${courseId}`);
            if (savedProgress) {
                try {
                    const progress = JSON.parse(savedProgress);
                    progress.finalQuiz = { id: quiz.id, done: true };
                    localStorage.setItem(
                        `progress-${courseId}`,
                        JSON.stringify(progress)
                    );
                } catch (e) {
                    console.warn("Failed to save final quiz progress", e);
                }
            }
        }
    };

    const handleTryAgain = () => {
        // Clear saved quiz result to start fresh
        localStorage.removeItem(`final-quiz-result-${courseId}`);

        setAnswers({});
        setSubmitted(false);
        setShowSummary(false);
        setShowReview(false);
    };

    const handleSeeReview = () => {
        setShowReview(true);
        setShowSummary(false);
    };

    const handleFinish = () => {
        navigate(`/student/course/${courseId}`);
    };

    return (
        <StudentLayout>
            <div className="pb-10 px-1">
                {/* BACK BUTTON + TITLE */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(`/student/course/${courseId}`)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button>

                    <h1 className="text-2xl font-bold">
                        {quiz?.title || "Loading..."}
                    </h1>
                </div>

                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-gray-500">Loading final quiz...</p>
                    </div>
                )}

                {!loading && !quiz && (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-gray-500">Final quiz not found</p>
                    </div>
                )}

                {/* SUMMARY PAGE */}
                {!loading && quiz && showSummary && !showReview && (
                    <div className="bg-white p-8 rounded-xl shadow max-w-2xl mx-auto">
                        {calculateScore() >= quiz.passing && (
                            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-center">
                                <p className="text-sm text-blue-800">
                                    <strong>✓ Final Quiz Completed</strong> -
                                    You have already passed the final quiz.
                                </p>
                            </div>
                        )}

                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold mb-2">
                                Final Quiz Summary
                            </h2>
                            <p className="text-gray-600">
                                Passing Score: {quiz.passing}
                            </p>
                        </div>

                        {/* Score Display */}
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-8 mb-6 text-center">
                            <p className="text-lg mb-2">Your Score</p>
                            <p className="text-6xl font-bold">
                                {calculateScore()}
                            </p>
                            <p className="mt-2 text-blue-100">
                                {
                                    quiz.questions.filter(
                                        (q) => answers[q.id] === q.correct
                                    ).length
                                }{" "}
                                / {quiz.questions.length} correct
                            </p>
                        </div>

                        {/* Pass/Fail Status */}
                        <div
                            className={`p-4 rounded-lg mb-6 ${
                                calculateScore() >= quiz.passing
                                    ? "bg-green-100 border border-green-300"
                                    : "bg-red-100 border border-red-300"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                {calculateScore() >= quiz.passing ? (
                                    <>
                                        <FiCheckCircle className="text-green-600 text-2xl" />
                                        <div>
                                            <p className="font-semibold text-green-800">
                                                Congratulations! You Passed!
                                            </p>
                                            <p className="text-sm text-green-700">
                                                You've successfully completed
                                                the final quiz.
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <FiXCircle className="text-red-600 text-2xl" />
                                        <div>
                                            <p className="font-semibold text-red-800">
                                                Not Passed
                                            </p>
                                            <p className="text-sm text-red-700">
                                                You need score {quiz.passing} to
                                                pass. Attempts: {attempts}/2
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Wrong Questions Summary */}
                        {getWrongQuestions().length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-semibold text-lg mb-3">
                                    Questions You Got Wrong:
                                </h3>
                                <div className="space-y-2">
                                    {getWrongQuestions().map((q) => {
                                        const qIndex = quiz.questions.findIndex(
                                            (question) => question.id === q.id
                                        );
                                        return (
                                            <div
                                                key={q.id}
                                                className="p-3 bg-red-50 border border-red-200 rounded-lg"
                                            >
                                                <p className="text-sm text-red-800">
                                                    Question {qIndex + 1}:{" "}
                                                    {q.question}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleSeeReview}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                            >
                                See Detailed Review
                            </button>

                            {calculateScore() < 100 && attempts < 2 && (
                                <button
                                    onClick={handleTryAgain}
                                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold"
                                >
                                    {calculateScore() >= quiz.passing
                                        ? `Try Again for Perfect Score (${
                                              2 - attempts
                                          } attempts left)`
                                        : `Try Again (${
                                              2 - attempts
                                          } attempts left)`}
                                </button>
                            )}

                            <button
                                onClick={handleFinish}
                                disabled={
                                    calculateScore() < quiz.passing &&
                                    attempts < 2
                                }
                                className={`w-full py-3 rounded-lg font-semibold ${
                                    calculateScore() >= quiz.passing ||
                                    attempts >= 2
                                        ? "bg-green-600 hover:bg-green-700 text-white"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                            >
                                Finish
                            </button>
                        </div>
                    </div>
                )}

                {/* REVIEW PAGE */}
                {!loading && quiz && showReview && (
                    <div className="bg-white p-6 rounded-xl shadow space-y-10">
                        {quiz.questions.map((q, qIndex) => {
                            const userAnswer = answers[q.id];
                            const correctAnswer = q.correct;
                            const isCorrectAnswer =
                                userAnswer === correctAnswer;

                            return (
                                <div key={q.id} className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <h3 className="font-semibold text-lg flex-1">
                                            {qIndex + 1}. {q.question}
                                        </h3>
                                        {isCorrectAnswer ? (
                                            <FiCheckCircle className="text-green-600 text-xl mt-1" />
                                        ) : (
                                            <FiXCircle className="text-red-600 text-xl mt-1" />
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        {q.options.map((opt, i) => {
                                            const isCorrect =
                                                i === correctAnswer;
                                            const isUserAnswer =
                                                userAnswer === i;

                                            return (
                                                <div
                                                    key={i}
                                                    className={`
                                                        flex items-center gap-3 p-3 rounded-lg border
                                                        ${
                                                            isCorrectAnswer &&
                                                            isCorrect
                                                                ? "bg-green-100 border-green-500"
                                                                : isUserAnswer &&
                                                                  !isCorrectAnswer
                                                                ? "bg-red-100 border-red-500"
                                                                : "bg-gray-50"
                                                        }
                                                    `}
                                                >
                                                    <input
                                                        type="radio"
                                                        checked={isUserAnswer}
                                                        disabled
                                                        readOnly
                                                    />
                                                    <span className="flex-1">
                                                        {opt}
                                                    </span>
                                                    {isCorrectAnswer &&
                                                        isCorrect && (
                                                            <span className="text-green-600 text-sm font-medium">
                                                                ✓ Correct
                                                            </span>
                                                        )}
                                                    {isUserAnswer &&
                                                        !isCorrectAnswer && (
                                                            <span className="text-red-600 text-sm font-medium">
                                                                ✗ Your answer
                                                            </span>
                                                        )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => {
                                    setShowReview(false);
                                    setShowSummary(true);
                                }}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold"
                            >
                                Back to Summary
                            </button>

                            {calculateScore() < 100 && attempts < 2 && (
                                <button
                                    onClick={handleTryAgain}
                                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold"
                                >
                                    Try Again
                                </button>
                            )}

                            <button
                                onClick={handleFinish}
                                disabled={
                                    calculateScore() < quiz.passing &&
                                    attempts < 2
                                }
                                className={`flex-1 py-3 rounded-lg font-semibold ${
                                    calculateScore() >= quiz.passing ||
                                    attempts >= 2
                                        ? "bg-green-600 hover:bg-green-700 text-white"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                            >
                                Finish
                            </button>
                        </div>
                    </div>
                )}

                {/* QUIZ QUESTIONS - Only show before submission */}
                {!loading && quiz && !submitted && (
                    <div className="bg-white p-6 rounded-xl shadow space-y-10">
                        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                                <strong>Instructions:</strong> Answer all
                                questions. Passing score: {quiz.passing}. You
                                have 2 attempts.
                            </p>
                        </div>

                        {quiz.questions.map((q, qIndex) => {
                            const userAnswer = answers[q.id];

                            return (
                                <div key={q.id} className="space-y-3">
                                    <h3 className="font-semibold text-lg">
                                        {qIndex + 1}. {q.question}
                                    </h3>

                                    <div className="space-y-3">
                                        {q.options.map((opt, i) => {
                                            return (
                                                <label
                                                    key={i}
                                                    className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                                                >
                                                    <input
                                                        type="radio"
                                                        name={`q-${q.id}`}
                                                        checked={
                                                            userAnswer === i
                                                        }
                                                        onChange={() =>
                                                            handleSelect(
                                                                q.id,
                                                                i
                                                            )
                                                        }
                                                    />
                                                    <span>{opt}</span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}

                        {/* SUBMIT BUTTON */}
                        <div className="pt-4">
                            <button
                                onClick={handleSubmit}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                            >
                                Submit Final Quiz
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
