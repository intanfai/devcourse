import { useParams, useNavigate } from "react-router-dom";
import StudentLayout from "../../../../layouts/StudentLayout";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

export default function QuizPage() {
    const { courseId, quizId } = useParams();
    const navigate = useNavigate();

    // ===== Dummy quiz data =====
    const quiz = {
        id: quizId,
        title: "Chapter 2 Quiz",
        questions: [
            {
                id: 1,
                question: "What are props in React?",
                options: [
                    "Internal component state",
                    "A method for rendering components",
                    "Data passed from parent to child components",
                    "React lifecycle events",
                ],
                correct: 2,
            },
            {
                id: 2,
                question: "Which keyword creates a functional component?",
                options: ["function", "component", "render", "const React :="],
                correct: 0,
            },
        ],
    };

    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);

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
                        onClick={() => navigate(-1)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button>

                    <h1 className="text-2xl font-bold">{quiz.title}</h1>
                </div>

                {/* ========== QUIZ CARD ========== */}
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
            </div>
        </StudentLayout>
    );
}
