import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminLayout from "../../../../layouts/AdminLayout";
import { FiClock, FiArrowLeft, FiPlayCircle, FiFileText } from "react-icons/fi";
import axios from "../../../../axios";

export default function MaterialDetail() {
    const { classId, materialId } = useParams();
    const navigate = useNavigate();
    const [material, setMaterial] = useState(null);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                // Fetch material data
                const materialRes = await axios.get(`/materials/${materialId}`, { headers });
                setMaterial(materialRes.data);

                // Fetch course data for thumbnail
                const courseRes = await axios.get(`/courses/${classId}`, { headers });
                setCourse(courseRes.data);
            } catch (err) {
                console.error("Failed to fetch material:", err);
            } finally {
                setLoading(false);
            }
        };

        if (materialId && classId) {
            fetchData();
        }
    }, [materialId, classId]);

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500">Loading material...</p>
                </div>
            </AdminLayout>
        );
    }

    if (!material) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500">Material not found</p>
                </div>
            </AdminLayout>
        );
    }

    const thumbnail = course?.thumbnail ? `/${course.thumbnail}` : "/images/htmlcss.jpg";
    const hasVideo = material.video_url;

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
                            src={thumbnail}
                            alt={material.title}
                            className="w-full h-64 object-cover rounded-xl"
                            onError={(e) => {
                                e.target.src = "/images/htmlcss.jpg";
                            }}
                        />
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold mt-4">{material.title}</h2>

                    {/* Type Badge */}
                    <div className="flex items-center gap-3 mt-3">
                        <span className="px-3 py-1 rounded-lg text-xs bg-blue-100 text-blue-700">
                            {hasVideo ? "Video Material" : "Text Material"}
                        </span>
                    </div>

                    {/* Video URL (if exists) */}
                    {hasVideo && (
                        <div className="mt-4 space-y-3">
                            <div>
                                <p className="text-sm font-semibold text-gray-700 mb-2">📹 Video Preview:</p>
                                <video 
                                    controls 
                                    className="w-full max-h-96 rounded-lg border bg-black"
                                    src={material.video_url.startsWith('http') ? material.video_url : `/${material.video_url}`}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-600 mb-1">Video URL:</p>
                                <a 
                                    href={material.video_url.startsWith('http') ? material.video_url : `/${material.video_url}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline text-sm break-all"
                                >
                                    {material.video_url}
                                </a>
                            </div>
                        </div>
                    )}

                    {/* CONTENT (PARAGRAPH MATERIAL) */}
                    {material.content && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-3">Content</h3>
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-4 rounded-lg">
                                {material.content}
                            </div>
                        </div>
                    )}

                    {!material.content && !hasVideo && (
                        <div className="mt-6 text-center text-gray-500">
                            No content available for this material
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
