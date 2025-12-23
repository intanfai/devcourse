export default function ViewClassModal({ open, data, close }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white w-[450px] rounded-xl p-6 shadow-xl">
                <h2 className="text-xl font-semibold mb-4">Class Details</h2>

                <div className="space-y-2 text-sm">
                    <p>
                        <strong>Title:</strong> {data.title}
                    </p>
                    <p>
                        <strong>Category:</strong> {data.category}
                    </p>
                    <p>
                        <strong>Status:</strong> {data.status}
                    </p>
                    <p>
                        <strong>Students:</strong> {data.students}
                    </p>
                    <p>
                        <strong>Price:</strong> Rp{" "}
                        {data.price.toLocaleString("id-ID")}
                    </p>
                    <p>
                        <strong>Created:</strong> {data.date}
                    </p>
                </div>

                <button
                    className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    onClick={close}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
