import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../layouts/AdminLayout";
import { FiClock, FiArrowLeft, FiPlayCircle } from "react-icons/fi";

export default function MaterialDetail() {
    const { classId, materialId } = useParams();
    const navigate = useNavigate();

    // Dummy data (sementara)
    const material = {
        id: materialId,
        title: "React Components",
        videoUrl: "/videos/sample.mp4",
        thumbnail: "/images/class-thumb.jpg",
        duration: "08:20",
        status: "Published",

        // 🔥 materi dalam bentuk paragraf
        content: `
            In this module, you will learn how React components work, how they are structured, 
            and how to build reusable UI elements. Components are the core building blocks of any 
            React application. Each component can manage its own state, receive data through props, 
            and render UI elements based on logic.

            You will also explore functional components, which are the modern React standard, 
            and understand how to pass data between components, handle events, and maintain clean 
            component architecture.

            By mastering components, you are building the foundation for more advanced concepts such 
            as state management, hooks, and component composition.
        `,
    };

    return (
        <AdminLayout>
            <div className="px-1 pb-10">
                {/* BACK BUTTON + TITLE */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button>
                    <h1 className="text-2xl font-bold">Material Detail</h1>
                </div>

                {/* MAIN CARD */}
                <div className="bg-white p-6 rounded-xl shadow">
                    {/* Thumbnail */}
                    <div className="relative">
                        <img
                            src={material.thumbnail}
                            className="w-full h-64 object-cover rounded-xl"
                        />
                        <FiPlayCircle className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl opacity-80" />
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mt-4">{material.title}</h2>

                    {/* Duration + Status */}
                    <div className="flex items-center gap-6 mt-3 text-gray-600 text-sm">
                        <div className="flex items-center gap-2">
                            <FiClock /> {material.duration}
                        </div>

                        <span
                            className={`px-3 py-1 rounded-lg text-xs ${
                                material.status === "Published"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                            {material.status}
                        </span>
                    </div>

                    {/* CONTENT (PARAGRAPH MATERIAL) */}
                    <div className="mt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                        {material.content}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
