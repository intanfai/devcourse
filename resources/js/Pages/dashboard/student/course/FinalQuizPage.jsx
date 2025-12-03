import { useNavigate, useParams } from "react-router-dom";
import StudentLayout from "../../../../layouts/StudentLayout";
import { FiArrowLeft } from "react-icons/fi";
import { useState } from "react";

export default function FinalQuizPage() {
    const navigate = useNavigate();
    const { courseId } = useParams();

    // FINAL QUIZ DATA (dummy – nanti API)
    const finalQuiz = {
        id: 999,
        title: "Final Course Quiz",
        questions: [
            {
                id: 1,
                question: "What does React primarily help developers build?",
                options: [
                    "Database systems",
                    "User interfaces",
                    "Operating systems",
                    "Backend APIs",
                ],
                correct: 1,
            },
            {
                id: 2,
                question: "Which hook is used to manage local state?",
                options: ["useContext", "useEffect", "useState", "useRef"],
                correct: 2,
            },
            {
                id: 3,
                question: "Props in React are...",
                options: [
                    "Mutable values",
                    "Used to update state",
                    "Passed from parent to child",
                    "Always numbers",
                ],
                correct: 2,
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
        if (Object.keys(answers).length !== finalQuiz.questions.length) {
            alert("Please answer all questions.");
            return;
        }
        setSubmitted(true);
    };

    const handleRetry = () => {
        setAnswers({});
        setSubmitted(false);
    };

    const countCorrect = () => {
        return finalQuiz.questions.filter(
            (q) => answers[q.id] === q.correct
        ).length;
    };

    return (
        <StudentLayout>
            <div className="pb-8 px-2">

                {/* HEADER */}
                <div className="bg-white p-6 rounded-xl shadow mb-6">
                    <div className="flex items-center gap-4 mb-3">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                        >
                            <FiArrowLeft size={18} />
                        </button>

                        <h1 className="text-2xl font-bold text-gray-800">
                            {finalQuiz.title}
                        </h1>
                    </div>

                    <p className="text-gray-500 text-sm">
                        Answer all questions and submit your final exam.
                    </p>
                </div>

                {/* QUIZ BODY */}
                <div className="bg-white rounded-xl shadow p-6">
                    {finalQuiz.questions.map((q, index) => (
                        <div key={q.id} className="mb-10">
                            <h2 className="font-semibold mb-4 text-lg">
                                {index + 1}. {q.question}
                            </h2>

                            <div className="space-y-3">
                                {q.options.map((opt, i) => {
                                    const isSelected = answers[q.id] === i;
                                    const isCorrect = q.correct === i;

                                    // Coloring
                                    let optionStyle = "border";

                                    if (submitted) {
                                        if (isCorrect)
                                            optionStyle =
                                                "border-green-500 bg-green-50";
                                        else if (isSelected && !isCorrect)
                                            optionStyle =
                                                "border-red-500 bg-red-50";
                                    } else if (isSelected) {
                                        optionStyle =
                                            "border-blue-500 bg-blue-50";
                                    }

                                    return (
                                        <div
                                            key={i}
                                            onClick={() =>
                                                handleSelect(q.id, i)
                                            }
                                            className={`cursor-pointer p-3 rounded-lg ${optionStyle}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    checked={isSelected}
                                                    readOnly
                                                />
                                                <span>{opt}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* BUTTONS */}
                    {!submitted ? (
                        <button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Submit Quiz
                        </button>
                    ) : (
                        <>
                            {/* ===== FINAL SCORE AT BOTTOM ===== */}
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <p className="text-xl font-bold text-blue-700">
                                    Final Score: {countCorrect()} /{" "}
                                    {finalQuiz.questions.length}
                                </p>
                            </div>

                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={handleRetry}
                                    className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400"
                                >
                                    Try Again
                                </button>

                                <button
                                    onClick={() =>
                                        navigate(`/student/course/${courseId}`)
                                    }
                                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                                >
                                    Back to Course
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </StudentLayout>
    );
}
