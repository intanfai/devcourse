import { FiAlertTriangle } from "react-icons/fi";

export default function ConfirmModal({ open, title, message, onConfirm, onClose }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
            <div className="bg-white w-[340px] rounded-xl p-6 shadow-xl border border-gray-200 animate-fadeIn">
                <div className="flex items-center gap-2 mb-3">
                    <FiAlertTriangle className="text-red-500 text-xl" />
                    <h2 className="text-lg font-semibold text-gray-800">
                        {title || "Are you sure?"}
                    </h2>
                </div>

                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    {message ||
                        "This action cannot be undone. Please confirm your decision."}
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
