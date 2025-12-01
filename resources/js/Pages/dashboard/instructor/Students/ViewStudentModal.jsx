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

                <p className="text-sm"><strong>Name:</strong> {data.name}</p>
                <p className="text-sm"><strong>Email:</strong> {data.email}</p>
                <p className="text-sm"><strong>Class:</strong> {data.class}</p>
                <p className="text-sm"><strong>Status:</strong> {data.status}</p>
                <p className="text-sm"><strong>Progress:</strong> {data.progress}</p>
                <p className="text-sm"><strong>Joined:</strong> {data.joined}</p>

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
