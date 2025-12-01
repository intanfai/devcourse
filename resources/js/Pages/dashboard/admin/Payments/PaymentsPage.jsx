import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../../layouts/AdminLayout";
import { FiSearch, FiFilter, FiEye } from "react-icons/fi";

export default function PaymentsPage() {
    const navigate = useNavigate();

    // Dummy payments
    const [payments] = useState([
        {
            id: "PAY-001",
            user: "Rina",
            email: "rina@gmail.com",
            course: "React Basics",
            amount: 150000,
            method: "Stripe",
            date: "2025-01-21",
            status: "Paid",
        },
        {
            id: "PAY-002",
            user: "Bayu",
            email: "bayu@gmail.com",
            course: "UI/UX Fundamentals",
            amount: 90000,
            method: "Paypal",
            date: "2025-01-19",
            status: "Paid",
        },
        {
            id: "PAY-003",
            user: "Dita",
            email: "dita@gmail.com",
            course: "Laravel API",
            amount: 200000,
            method: "Manual Transfer",
            date: "2025-01-15",
            status: "Pending",
        },
        {
            id: "PAY-004",
            user: "Andi",
            email: "andi@gmail.com",
            course: "Node JS",
            amount: 90000,
            method: "Stripe",
            date: "2025-01-10",
            status: "Refunded",
        },
        {
            id: "PAY-005",
            user: "Lia",
            email: "lia@gmail.com",
            course: "Advanced CSS",
            amount: 50000,
            method: "Stripe",
            date: "2025-01-02",
            status: "Failed",
        },
    ]);

    // FILTER STATES
    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [filterMethod, setFilterMethod] = useState("All");

    // FILTER LOGIC
    const filteredPayments = payments.filter((p) => {
        const matchSearch =
            p.user.toLowerCase().includes(search.toLowerCase()) ||
            p.email.toLowerCase().includes(search.toLowerCase()) ||
            p.id.toLowerCase().includes(search.toLowerCase());

        const matchStatus =
            filterStatus === "All" ? true : p.status === filterStatus;

        const matchMethod =
            filterMethod === "All" ? true : p.method === filterMethod;

        return matchSearch && matchStatus && matchMethod;
    });

    return (
        <AdminLayout>
            <div className="px-1 pb-10">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Payments</h1>

                    <div className="flex items-center gap-3">
                        {/* SEARCH BAR */}
                        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow border">
                            <FiSearch className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search payments..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="ml-2 bg-transparent outline-none text-sm"
                            />
                        </div>

                        {/* FILTER MENU */}
                        <details className="relative group">
                            <summary className="cursor-pointer bg-white border rounded-lg px-3 py-2 shadow flex items-center gap-2 text-sm">
                                <FiFilter /> Filter
                            </summary>

                            <div className="absolute right-0 mt-2 w-48 bg-white p-4 rounded-xl shadow-lg border z-20 text-sm">
                                {/* STATUS FILTER */}
                                <p className="text-xs text-gray-500 mb-1">
                                    Status
                                </p>
                                <select
                                    className="border w-full px-2 py-1 rounded mb-3"
                                    value={filterStatus}
                                    onChange={(e) =>
                                        setFilterStatus(e.target.value)
                                    }
                                >
                                    <option value="All">All</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Refunded">Refunded</option>
                                </select>

                                {/* METHOD FILTER */}
                                <p className="text-xs text-gray-500 mb-1">
                                    Payment Method
                                </p>
                                <select
                                    className="border w-full px-2 py-1 rounded"
                                    value={filterMethod}
                                    onChange={(e) =>
                                        setFilterMethod(e.target.value)
                                    }
                                >
                                    <option value="All">All</option>
                                    <option value="Stripe">Stripe</option>
                                    <option value="Paypal">Paypal</option>
                                    <option value="Manual Transfer">
                                        Manual Transfer
                                    </option>
                                </select>
                            </div>
                        </details>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b text-gray-500">
                                <th className="py-3">No</th>
                                <th className="py-3">Payment ID</th>
                                <th className="py-3">User</th>
                                <th className="py-3">Email</th>
                                <th className="py-3">Course</th>
                                <th className="py-3">Method</th>
                                <th className="py-3">Amount</th>
                                <th className="py-3">Date</th>
                                <th className="py-3">Status</th>
                                <th className="py-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredPayments.map((p, i) => (
                                <tr
                                    key={p.id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="py-3">{i + 1}</td>

                                    <td className="py-3 text-blue-600 font-mono font-semibold">
                                        {p.id}
                                    </td>

                                    <td className="py-3">{p.user}</td>
                                    <td className="py-3">{p.email}</td>
                                    <td className="py-3">{p.course}</td>
                                    <td className="py-3">{p.method}</td>

                                    <td className="py-3">
                                        Rp {p.amount.toLocaleString("id-ID")}
                                    </td>

                                    <td className="py-3">{p.date}</td>

                                    {/* STATUS BADGE */}
                                    <td className="py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold
                                                ${
                                                    p.status === "Paid"
                                                        ? "bg-green-100 text-green-700"
                                                        : p.status === "Pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : p.status === "Failed"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-blue-100 text-blue-700"
                                                }
                                            `}
                                        >
                                            {p.status}
                                        </span>
                                    </td>

                                    <td className="py-3 text-center">
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/admin/payments/${p.id}`
                                                )
                                            }
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FiEye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredPayments.length === 0 && (
                        <p className="text-center text-gray-500 py-4">
                            No payments found.
                        </p>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
