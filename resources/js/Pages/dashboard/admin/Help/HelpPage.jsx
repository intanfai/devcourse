import { useState } from "react";
import AdminLayout from "../../../../layouts/AdminLayout";
import { FiChevronDown, FiMail, FiPhone, FiMessageCircle } from "react-icons/fi";

export default function HelpPage() {
    const [openFAQ, setOpenFAQ] = useState(null);

    const faqs = [
        {
            q: "How do I approve or reject a class?",
            a: "Go to Classes → Select a pending class → Use the Approve or Reject button. A confirmation modal will appear.",
        },
        {
            q: "How do I manage users?",
            a: "Navigate to Users → You can add, edit, filter, or delete a user.",
        },
        {
            q: "How can I generate certificates?",
            a: "Certificates are automatically generated when a student completes a course. You can view them in Certificates page.",
        },
        {
            q: "How do I check sales or revenue?",
            a: "Open Reports → Sales Reports to view all transactions, export data, and monitor revenue.",
        },
    ];

    return (
        <AdminLayout>
            <div className="px-1 pb-10">
                <h1 className="text-2xl font-bold mb-6">Help & Support</h1>

                {/* =========================
                    FAQ SECTION
                ========================== */}
                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>

                    <div className="space-y-3">
                        {faqs.map((item, index) => (
                            <div key={index} className="border rounded-lg">
                                <button
                                    onClick={() =>
                                        setOpenFAQ(openFAQ === index ? null : index)
                                    }
                                    className="flex justify-between w-full p-4 font-medium text-gray-800 hover:bg-gray-50"
                                >
                                    {item.q}
                                    <FiChevronDown
                                        className={`transition-transform ${
                                            openFAQ === index ? "rotate-180" : ""
                                        }`}
                                    />
                                </button>

                                {openFAQ === index && (
                                    <div className="px-4 pb-4 text-gray-600 text-sm leading-relaxed">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* =========================
                    GUIDE SECTION
                ========================== */}
                <div className="bg-white p-6 rounded-xl shadow mb-8">
                    <h2 className="text-lg font-semibold mb-3">Quick Admin Guide</h2>

                    <ul className="list-disc ml-6 text-gray-700 text-sm space-y-2">
                        <li>Manage courses under the Classes menu.</li>
                        <li>View certificates generated for completed courses.</li>
                        <li>Use Reports to download Excel files of users, courses, or sales.</li>
                        <li>Payment statuses can be reviewed in the Payments page.</li>
                        <li>Manage user roles and their permissions in the Role settings.</li>
                    </ul>
                </div>

                {/* =========================
                    CONTACT SUPPORT
                ========================== */}
                <div className="bg-white p-6 rounded-xl shadow max-w-lg">
                    <h2 className="text-lg font-semibold mb-4">Contact Support</h2>

                    <p className="text-gray-600 text-sm mb-4">
                        Need help? Our support team is available to assist you.
                    </p>

                    <div className="space-y-3 text-sm text-gray-700">
                        <p className="flex items-center gap-2">
                            <FiMail className="text-blue-600" /> support@devcourse.com
                        </p>

                        <p className="flex items-center gap-2">
                            <FiPhone className="text-blue-600" /> +62 812-3456-7890
                        </p>

                        <p className="flex items-center gap-2">
                            <FiMessageCircle className="text-blue-600" /> Live chat (coming soon)
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
