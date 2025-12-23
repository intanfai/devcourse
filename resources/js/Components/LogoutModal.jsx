import { FiAlertTriangle } from "react-icons/fi";

export default function LogoutModal({ open, onClose, onConfirm }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white w-[340px] p-6 rounded-xl shadow-xl border animate-fadeIn">
                
                <div className="flex items-center gap-2 mb-4">
                    <FiAlertTriangle className="text-red-500" size={22} />
                    <h2 className="text-lg font-semibold">Logout?</h2>
                </div>

                <p className="text-gray-600 text-sm mb-6">
                    Are you sure you want to logout?
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
