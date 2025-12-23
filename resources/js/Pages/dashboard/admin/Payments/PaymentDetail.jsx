import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../../../layouts/AdminLayout";
import { FiArrowLeft, FiDownload } from "react-icons/fi";

export default function PaymentDetail() {
    const { paymentId } = useParams();
    const navigate = useNavigate();

    // Dummy detail — nanti diganti API
    const payment = {
        id: paymentId,
        user: "Rina",
        email: "rina@gmail.com",
        course: "React Basics",
        amount: 150000,
        method: "Stripe",
        date: "2025-01-21",
        status: "Paid",
        transactionId: "TXN-99887766",
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Paid":
                return "bg-green-100 text-green-700";
            case "Pending":
                return "bg-yellow-100 text-yellow-700";
            case "Failed":
                return "bg-red-100 text-red-600";
            case "Refunded":
                return "bg-blue-100 text-blue-700";
            default:
                return "bg-gray-200 text-gray-600";
        }
    };

    return (
        <AdminLayout>
            <div className="px-1 pb-10">
                {/* BACK HEADER */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate("/admin/payments")}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white transition"
                    >
                        <FiArrowLeft size={18} />
                    </button>
                    <h1 className="text-2xl font-bold">Payment Detail</h1>
                </div>

                {/* MAIN CARD */}
                <div className="bg-white p-6 rounded-xl shadow">
                    {/* TOP ROW */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h2 className="text-xl font-semibold">
                                Payment ID:{" "}
                                <span className="text-blue-600">
                                    {payment.id}
                                </span>
                            </h2>

                            <p className="text-gray-500 mt-1">
                                Transaction ID:{" "}
                                <span className="font-mono text-gray-700">
                                    {payment.transactionId}
                                </span>
                            </p>
                        </div>

                        {/* STATUS BADGE */}
                        <span
                            className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                                payment.status
                            )}`}
                        >
                            {payment.status}
                        </span>
                    </div>

                    {/* INFO GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* LEFT — USER INFO */}
                        <div className="border rounded-xl p-4">
                            <h3 className="font-semibold mb-3 text-gray-700">
                                User Information
                            </h3>

                            <div className="space-y-2 text-sm text-gray-600">
                                <p>
                                    <span className="font-medium">Name:</span>{" "}
                                    {payment.user}
                                </p>
                                <p>
                                    <span className="font-medium">Email:</span>{" "}
                                    {payment.email}
                                </p>
                                <p>
                                    <span className="font-medium">Course:</span>{" "}
                                    {payment.course}
                                </p>
                            </div>
                        </div>

                        {/* RIGHT — PAYMENT INFO */}
                        <div className="border rounded-xl p-4">
                            <h3 className="font-semibold mb-3 text-gray-700">
                                Payment Information
                            </h3>

                            <div className="space-y-2 text-sm text-gray-600">
                                <p>
                                    <span className="font-medium">Method:</span>{" "}
                                    {payment.method}
                                </p>
                                <p>
                                    <span className="font-medium">Amount:</span>{" "}
                                    Rp {payment.amount.toLocaleString("id-ID")}
                                </p>
                                <p>
                                    <span className="font-medium">Date:</span>{" "}
                                    {payment.date}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* SUMMARY TABLE */}
                    <div className="border rounded-xl p-4 mb-8">
                        <h3 className="font-semibold mb-3 text-gray-700">
                            Summary
                        </h3>

                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b">
                                    <td className="py-3 text-gray-500">
                                        Course
                                    </td>
                                    <td className="py-3 font-medium">
                                        {payment.course}
                                    </td>
                                </tr>

                                <tr className="border-b">
                                    <td className="py-3 text-gray-500">
                                        Payment Status
                                    </td>
                                    <td className="py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                payment.status
                                            )}`}
                                        >
                                            {payment.status}
                                        </span>
                                    </td>
                                </tr>

                                <tr className="border-b">
                                    <td className="py-3 text-gray-500">
                                        Total Paid
                                    </td>
                                    <td className="py-3 font-bold text-green-700">
                                        Rp{" "}
                                        {payment.amount.toLocaleString("id-ID")}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* DOWNLOAD BUTTON */}
                    <button
                        onClick={() =>
                            alert("Invoice download will be added soon.")
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
                    >
                        <FiDownload />
                        Download Invoice
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
