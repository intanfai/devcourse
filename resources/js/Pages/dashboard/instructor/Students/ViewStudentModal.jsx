import { FiX } from "react-icons/fi";

export default function ViewStudentModal({ open, data, close }) {
    if (!open || !data) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white w-[380px] rounded-xl p-6 shadow-xl relative">
                <button
                    onClick={close}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    <FiX size={20} />
                </button>

                <h2 className="text-lg font-semibold mb-4">Student Detail</h2>

                <p className="text-sm mb-2">
                    <strong>Name:</strong> {data.name}
                </p>
                <p className="text-sm mb-2">
                    <strong>Email:</strong> {data.email}
                </p>
                <p className="text-sm mb-2">
                    <strong>Class:</strong> {data.course}
                </p>
                <p className="text-sm mb-2">
                    <strong>Status:</strong>{" "}
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                            data.status === "Active"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                        }`}
                    >
                        {data.status}
                    </span>
                </p>
                <p className="text-sm mb-2">
                    <strong>Joined:</strong> {data.joined}
                </p>

                <button
                    onClick={close}
                    className="mt-5 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
