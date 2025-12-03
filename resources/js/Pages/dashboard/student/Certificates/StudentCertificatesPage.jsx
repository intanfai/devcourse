import StudentLayout from "../../../../layouts/StudentLayout";
import { FiDownload, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function CertificatesPage() {
    const navigate = useNavigate();

    const certificates = [
        { id: 1, title: "React Fundamentals Certificate" },
        { id: 2, title: "Laravel Basics Certificate" },
    ];

    return (
        <StudentLayout>
            <div className="pb-6">
                {/* BACK BUTTON + TITLE */}
                <div className="flex items-center gap-4 mb-6">
                    {/* <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button> */}

                    <h1 className="text-2xl font-bold">Your Certificates</h1>
                </div>

                {/* CERTIFICATE LIST */}
                <div className="space-y-4">
                    {certificates.map((c) => (
                        <div
                            key={c.id}
                            className="bg-white rounded-xl border shadow p-4 flex items-center justify-between"
                        >
                            <span className="font-medium">{c.title}</span>

                            <button className="text-blue-600 flex items-center gap-2 hover:underline">
                                <FiDownload /> Download PDF
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </StudentLayout>
    );
}
