import { AiFillStar } from "react-icons/ai";
import { useState } from "react";
import axios from "../axios";

export default function ReviewModal({
    open,
    onClose,
    courseId,
    onReviewSubmitted,
}) {
    const [rating, setRating] = useState(5);
    const [text, setText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    if (!open) return null;

    const submitReview = async () => {
        if (!text.trim()) return alert("Please write something.");

        setSubmitting(true);

        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `/courses/${courseId}/review`,
                {
                    rating,
                    review: text,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Save to localStorage as well
            const data = {
                rating,
                text,
                date: new Date().toISOString(),
            };
            localStorage.setItem(
                `review-course-${courseId}`,
                JSON.stringify(data)
            );

            alert("Thank you for your review!");

            // Call the callback to update parent component
            if (onReviewSubmitted) {
                onReviewSubmitted();
            }

            onClose();
        } catch (error) {
            console.error("Failed to submit review:", error);
            alert("Failed to submit review. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow-lg animate-fadeIn">
                <h2 className="text-xl font-bold mb-3">Leave a Review</h2>

                {/* STAR RATING */}
                <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((n) => (
                        <button
                            key={n}
                            onClick={() => setRating(n)}
                            className="text-3xl transition-all duration-200"
                        >
                            <AiFillStar
                                className={`
                    transition-all duration-200 
                    ${n <= rating ? "text-yellow-400" : "text-gray-300"}
                `}
                            />
                        </button>
                    ))}
                </div>

                {/* TEXTAREA */}
                <textarea
                    className="w-full border p-2 rounded h-24"
                    placeholder="Share your learning experience…"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>

                {/* BUTTONS */}
                <div className="flex justify-end gap-3 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={submitReview}
                        disabled={submitting}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {submitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </div>
        </div>
    );
}
