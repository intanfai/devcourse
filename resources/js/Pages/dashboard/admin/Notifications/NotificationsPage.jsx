import { useState } from "react";
import AdminLayout from "../../../../layouts/AdminLayout";
import {
    FiSearch,
    FiFilter,
    FiEye,
    FiCheckCircle,
    FiTrash2,
} from "react-icons/fi";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "New Class Submitted",
            message: "Rina submitted a new class for approval.",
            type: "Class",
            date: "2025-01-21 10:32",
            status: "Unread",
        },
        {
            id: 2,
            title: "Payment Successful",
            message: "Payment by Bayu for UI/UX Fundamentals.",
            type: "Payment",
            date: "2025-01-20 14:11",
            status: "Read",
        },
        {
            id: 3,
            title: "Refund Requested",
            message: "Lia requested a refund for Advanced CSS.",
            type: "Payment",
            date: "2025-01-19 08:50",
            status: "Unread",
        },
        {
            id: 4,
            title: "New User Registered",
            message: "Dita registered as an Instructor.",
            type: "User",
            date: "2025-01-18 18:10",
            status: "Read",
        },
        {
            id: 5,
            title: "System Warning",
            message: "Server memory usage high.",
            type: "System",
            date: "2025-01-17 06:12",
            status: "Unread",
        },
    ]);

    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");

    // DETAIL MODAL
    const [detailOpen, setDetailOpen] = useState(false);
    const [selectedNotif, setSelectedNotif] = useState(null);

    const openDetail = (notif) => {
        setSelectedNotif(notif);
        setDetailOpen(true);

        // Auto mark as read when opened
        markAsRead(notif.id);
    };

    // FILTER DATA
    const filtered = notifications.filter((n) => {
        const matchSearch =
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.message.toLowerCase().includes(search.toLowerCase());

        const matchType = filterType === "All" ? true : n.type === filterType;
        const matchStatus =
            filterStatus === "All" ? true : n.status === filterStatus;

        return matchSearch && matchType && matchStatus;
    });

    // PAGINATION
    const rowsPerPage = 5;
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const start = (page - 1) * rowsPerPage;
    const currentData = filtered.slice(start, start + rowsPerPage);

    // MARK READ
    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, status: "Read" } : n))
        );
    };

    // MARK ALL READ
    const markAllAsRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, status: "Read" })));
    };

    // DELETE
    const deleteNotif = (id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return (
        <AdminLayout>
            <div className="px-1 pb-10">
                {/* HEADER */}
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold">Notifications</h1>

                    <div className="flex items-center gap-3">
                        {/* SEARCH */}
                        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow border w-64">
                            <FiSearch className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search notifications..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                className="ml-2 bg-transparent outline-none text-sm w-full"
                            />
                        </div>

                        {/* FILTER */}
                        <details className="relative group">
                            <summary className="cursor-pointer bg-white border rounded-lg px-3 py-2 shadow flex items-center gap-2 text-sm">
                                <FiFilter /> Filter
                            </summary>

                            <div className="absolute right-0 mt-2 w-52 bg-white p-4 rounded-xl shadow-lg border z-20 text-sm">
                                <p className="text-xs text-gray-500 mb-1">
                                    Type
                                </p>
                                <select
                                    value={filterType}
                                    onChange={(e) => {
                                        setFilterType(e.target.value);
                                        setPage(1);
                                    }}
                                    className="w-full border px-2 py-1 rounded mb-3"
                                >
                                    <option value="All">All</option>
                                    <option value="Class">Class</option>
                                    <option value="Payment">Payment</option>
                                    <option value="User">User</option>
                                    <option value="System">System</option>
                                </select>

                                <p className="text-xs text-gray-500 mb-1">
                                    Status
                                </p>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => {
                                        setFilterStatus(e.target.value);
                                        setPage(1);
                                    }}
                                    className="w-full border px-2 py-1 rounded"
                                >
                                    <option value="All">All</option>
                                    <option value="Unread">Unread</option>
                                    <option value="Read">Read</option>
                                </select>
                            </div>
                        </details>

                        {/* MARK ALL */}
                        <button
                            onClick={markAllAsRead}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 text-sm"
                        >
                            Mark All as Read
                        </button>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <table className="w-full text-sm text-left">
                        <thead>
                            <tr className="border-b text-gray-500">
                                <th className="py-3">No</th>
                                <th className="py-3">Title</th>
                                <th className="py-3">Type</th>
                                <th className="py-3">Date</th>
                                <th className="py-3">Status</th>
                                <th className="py-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentData.map((n, i) => (
                                <tr
                                    key={n.id}
                                    className={`border-b transition ${
                                        n.status === "Unread"
                                            ? "bg-[#F0F6FF] animate-fadeIn"
                                            : ""
                                    } hover:bg-gray-50`}
                                >
                                    <td className="py-3">{start + i + 1}</td>

                                    <td className="py-3">
                                        <p
                                            className={`font-medium ${
                                                n.status === "Unread"
                                                    ? "font-semibold"
                                                    : ""
                                            }`}
                                        >
                                            {n.title}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {n.message}
                                        </p>
                                    </td>

                                    <td className="py-3">{n.type}</td>
                                    <td className="py-3">{n.date}</td>

                                    <td className="py-3">
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full font-medium 
                                                ${
                                                    n.status === "Unread"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-gray-200 text-gray-700"
                                                }`}
                                        >
                                            {n.status}
                                        </span>
                                    </td>

                                    <td className="py-3 flex items-center justify-center gap-3">
                                        {/* DETAIL MODAL */}
                                        <button
                                            onClick={() => openDetail(n)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FiEye size={18} />
                                        </button>

                                        {/* MARK AS READ */}
                                        {n.status === "Unread" && (
                                            <button
                                                onClick={() => markAsRead(n.id)}
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                <FiCheckCircle size={18} />
                                            </button>
                                        )}

                                        {/* DELETE */}
                                        <button
                                            onClick={() => deleteNotif(n.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* EMPTY */}
                    {filtered.length === 0 && (
                        <p className="text-center text-gray-500 py-4">
                            No notifications found.
                        </p>
                    )}

                    {/* PAGINATION */}
                    <div className="flex justify-end mt-4 gap-2">
                        {[...Array(totalPages)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i + 1)}
                                className={`px-3 py-1 rounded ${
                                    page === i + 1
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 hover:bg-gray-300"
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ===================== DETAIL MODAL ===================== */}
            {detailOpen && selectedNotif && (
                <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[380px] shadow-xl animate-fadeIn">
                        <h2 className="text-lg font-semibold mb-3">
                            {selectedNotif.title}
                        </h2>

                        <p className="text-gray-700 text-sm mb-4">
                            {selectedNotif.message}
                        </p>

                        <p className="text-xs text-gray-500">
                            <strong>Type:</strong> {selectedNotif.type}
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                            <strong>Date:</strong> {selectedNotif.date}
                        </p>

                        <div className="text-right">
                            <button
                                onClick={() => setDetailOpen(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
