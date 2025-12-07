import React from "react";
import { FiXCircle } from "react-icons/fi";

export default function PaymentFailedModal({ open, onRetry, onClose }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-center">

                <FiXCircle className="text-red-500 mx-auto" size={60} />

                <h2 className="mt-4 text-2xl font-bold text-red-600">
                    Payment Failed
                </h2>

                <p className="text-gray-600 mt-2">
                    Something went wrong. Please try again.
                </p>

                <div className="flex gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition"
                    >
                        Close
                    </button>

                    <button
                        onClick={onRetry}
                        className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        </div>
    );
}
