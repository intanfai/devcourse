import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../layouts/AdminLayout";
import { FiArrowLeft, FiDownload } from "react-icons/fi";
import { useState } from "react";

export default function CertificateDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [cert] = useState({
        id,
        userName: "Rina",
        email: "rina@gmail.com",
        course: "React Basics",
        issueDate: "2025-01-21",
        certificateNumber: `CERT-${id}-2025`,
    });

    const handleDownload = () => {
        alert("Download PDF (dummy). Nanti bisa pakai html2pdf.js / backend.");
    };

    return (
        <AdminLayout>
            <div className="px-1 pb-10">
                {/* BACK BUTTON */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate("/admin/certificates")}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition"
                    >
                        <FiArrowLeft size={18} />
                    </button>
                    <h1 className="text-2xl font-bold">Certificate Detail</h1>
                </div>

                {/* LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* LEFT PREVIEW */}
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-lg font-semibold mb-4">Preview</h2>

                        <div className="border rounded-xl p-6 bg-gray-100">
                            <div
                                id="certificate-preview"
                                className="w-full bg-white relative border rounded-xl shadow-lg overflow-hidden"
                                style={{ height: "580px" }}
                            >
                                {/* ===== TOP GEOMETRIC HEADER ===== */}
                                <div className="absolute inset-x-0 top-0 h-36">
                                    <div className="absolute inset-0 bg-[#0A1D37]" />

                                    {/* gold stripe */}
                                    <div className="absolute left-0 bottom-0 w-1/2 h-8 bg-[#E8B200] -skew-y-6 origin-left"></div>
                                    <div className="absolute left-0 bottom-0 w-2/3 h-5 bg-[#E8B200] opacity-80"></div>

                                    {/* orange side */}
                                    <div className="absolute right-0 bottom-0 w-1/3 h-20 bg-[#E0901D] skew-y-6 origin-right"></div>
                                </div>

                                {/* ===== CONTENT ===== */}
                                <div className="relative z-10 text-center px-10 mt-32">
                                    {/* Logo placeholder */}
                                    <div className="w-12 h-12 mx-auto border-2 border-gray-700 rounded-md flex items-center justify-center text-xs font-semibold mb-4">
                                        LOGO
                                    </div>

                                    <h1 className="text-3xl font-bold text-[#0A1D37] tracking-wide">
                                        CERTIFICATE
                                    </h1>

                                    <p className="tracking-wider text-sm text-gray-700">
                                        OF COMPLETION
                                    </p>

                                    <p className="text-sm text-gray-700 mt-4">
                                        Proudly Presented To
                                    </p>

                                    <h2 className="text-4xl font-serif text-[#D59700] mt-2">
                                        {cert.userName}
                                    </h2>

                                    <p className="mt-6 text-sm text-gray-700 leading-relaxed max-w-[480px] mx-auto">
                                        Has successfully completed the course{" "}
                                        <span className="font-semibold">
                                            {cert.course}
                                        </span>
                                        . This certificate is awarded in
                                        recognition of dedication and
                                        achievement.
                                    </p>

                                    {/* SIGNATURE SINGLE */}
                                    <div className="text-center mt-8">
                                        {/* Signature Image (Optional) */}
                                        {/* <img
                                                src="/images/signature-intan.png"
                                                className="h-12 mx-auto opacity-90"
                                                alt="Signature"
                                            /> */}

                                        {/* Signature Line */}
                                        <div className="border-t border-gray-600 w-44 mx-auto mt-6"></div>

                                        <p className="mt-1 text-lg font-semibold text-[#0A1D37]">
                                            Intan Nurul Faizia
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            CEO — DevCourse
                                        </p>
                                    </div>

                                    <p className="text-xs text-gray-500 mt-10">
                                        Issued on: {cert.issueDate}
                                        <br />
                                        Certificate No: {cert.certificateNumber}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* DOWNLOAD BUTTON */}
                        <button
                            onClick={handleDownload}
                            className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                        >
                            <FiDownload /> Download PDF
                        </button>
                    </div>

                    {/* RIGHT INFO */}
                    {/* RIGHT — CERTIFICATE INFO */}
                    <div className="bg-white shadow rounded-xl p-6">
                        <h2 className="text-xl font-semibold mb-6">
                            Certificate Information
                        </h2>

                        <div className="space-y-5 text-gray-700">
                            {/* Row Item */}
                            <div>
                                <p className="text-sm font-semibold text-gray-500">
                                    Certificate ID
                                </p>
                                <p className="text-base">
                                    {cert.certificateNumber}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-500">
                                    User Name
                                </p>
                                <p className="text-base">{cert.userName}</p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-500">
                                    Email
                                </p>
                                <p className="text-base">{cert.email}</p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-500">
                                    Course
                                </p>
                                <p className="text-base">{cert.course}</p>
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-gray-500">
                                    Issued Date
                                </p>
                                <p className="text-base">{cert.issueDate}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
