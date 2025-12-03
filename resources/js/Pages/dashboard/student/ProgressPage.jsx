import StudentLayout from "../../../layouts/StudentLayout";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function ProgressPage() {
    const navigate = useNavigate();

    const progress = 60; // contoh

    return (
        <StudentLayout>
            <div className="pb-6">

                {/* BACK BUTTON + TITLE */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Your Learning Progress
                    </h1>
                </div>

                {/* MAIN CARD */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">

                    <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        Hours Learned
                    </h2>

                    <p className="text-gray-600 mb-5">
                        Total hours this month:{" "}
                        <span className="font-bold text-gray-800">
                            15.2 hours
                        </span>
                    </p>

                    {/* PROGRESS BAR */}
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-600 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                        {progress}% of monthly goal reached
                    </p>

                    {/* MINI PROGRESS CIRCLE */}
                    <div className="flex justify-center mt-8">
                        <div className="relative w-24 h-24">
                            <svg className="w-24 h-24 transform -rotate-90">
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="40"
                                    stroke="#E5E7EB"
                                    strokeWidth="8"
                                    fill="transparent"
                                />
                                <circle
                                    cx="48"
                                    cy="48"
                                    r="40"
                                    stroke="#3B82F6"
                                    strokeWidth="8"
                                    fill="transparent"
                                    strokeDasharray={2 * Math.PI * 40}
                                    strokeDashoffset={
                                        2 * Math.PI * 40 -
                                        (progress / 100) *
                                            (2 * Math.PI * 40)
                                    }
                                    strokeLinecap="round"
                                    className="transition-all duration-700"
                                />
                            </svg>

                            <div className="absolute inset-0 flex items-center justify-center">
                                <p className="text-xl font-semibold text-gray-800">
                                    {progress}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StudentLayout>
    );
}
