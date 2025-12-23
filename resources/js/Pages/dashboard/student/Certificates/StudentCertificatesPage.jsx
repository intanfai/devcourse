import StudentLayout from "../../../../layouts/StudentLayout";
import { FiDownload, FiAward, FiCalendar } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "../../../../axios";

export default function CertificatesPage() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(null);

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("/certificates", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCertificates(response.data);
        } catch (error) {
            console.error("Failed to fetch certificates:", error);
        } finally {
            setLoading(false);
        }
    };

    const downloadCertificate = async (courseId, courseTitle) => {
        try {
            setDownloading(courseId);
            const token = localStorage.getItem("token");

            const response = await axios.get(
                `/certificates/download/${courseId}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute(
                "download",
                `certificate-${courseTitle.replace(/\s+/g, "-")}.pdf`
            );
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download certificate:", error);
            alert("Failed to download certificate. Please try again.");
        } finally {
            setDownloading(null);
        }
    };

    if (loading) {
        return (
            <StudentLayout>
                <div className="pb-6">
                    <h1 className="text-2xl font-bold mb-6">
                        Your Certificates
                    </h1>
                    <div className="text-center py-12 text-gray-500">
                        Loading...
                    </div>
                </div>
            </StudentLayout>
        );
    }

    return (
        <StudentLayout>
            <div className="pb-6">
                {/* TITLE */}
                <div className="flex items-center gap-4 mb-6">
                    <FiAward size={32} className="text-yellow-500" />
                    <h1 className="text-2xl font-bold">Your Certificates</h1>
                </div>

                {/* CERTIFICATE LIST */}
                {certificates.length === 0 ? (
                    <div className="bg-white rounded-xl border shadow p-12 text-center">
                        <FiAward
                            size={64}
                            className="mx-auto text-gray-300 mb-4"
                        />
                        <p className="text-gray-500 text-lg mb-2">
                            No certificates yet
                        </p>
                        <p className="text-gray-400 text-sm">
                            Complete courses and leave reviews to earn
                            certificates
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {certificates.map((cert) => (
                            <div
                                key={cert.id}
                                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200 shadow-md p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FiAward
                                                className="text-yellow-500"
                                                size={24}
                                            />
                                            <h3 className="text-lg font-bold text-gray-800">
                                                Certificate of Completion
                                            </h3>
                                        </div>
                                        <p className="text-xl font-semibold text-blue-600 mb-3">
                                            {cert.course.title}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <FiCalendar size={14} />
                                            <span>
                                                Issued on{" "}
                                                {new Date(
                                                    cert.issued_at
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() =>
                                        downloadCertificate(
                                            cert.course.id,
                                            cert.course.title
                                        )
                                    }
                                    disabled={downloading === cert.course.id}
                                    className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center justify-center gap-2 hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {downloading === cert.course.id ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            <span>Downloading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiDownload />
                                            <span>Download Certificate</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
