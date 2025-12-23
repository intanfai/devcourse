import { useState } from "react";
import InstructorLayout from "../../../../layouts/InstructorLayout";
import { FiSearch, FiFilter, FiCheckCircle } from "react-icons/fi";

export default function InstructorNotificationsPage() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "New Enrollment",
            message: "Rina enrolled in your class React Basics.",
            type: "Enrollment",
            date: "2025-01-21 10:32",
            status: "Unread",
        },
        {
            id: 2,
            title: "Class Approved",
            message: "Your class 'Laravel API Masterclass' has been approved.",
            type: "Class",
            date: "2025-01-20 09:15",
            status: "Read",
        },
        {
            id: 3,
            title: "New Review",
            message: "Bima left a 5-star review on your class.",
            type: "Review",
            date: "2025-01-18 15:44",
            status: "Unread",
        },
        {
            id: 4,
            title: "Payout Completed",
            message: "Your payout request has been processed.",
            type: "Earnings",
            date: "2025-01-15 08:20",
            status: "Read",
        },
    ]);

    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");

    // RESET PAGE KALO SEARCH / FILTER BERUBAH
    const resetPage = () => setPage(1);

    // FILTER
    const filtered = notifications.filter((n) => {
        const matchSearch =
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.message.toLowerCase().includes(search.toLowerCase());

        const matchType = filterType === "All" ? true : n.type === filterType;
        const matchStatus =
            filterStatus === "All" ? true : n.status === filterStatus;

        return matchSearch && matchType && matchStatus;
    });

    // PAGINATION SETTINGS
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const start = (page - 1) * rowsPerPage;
    const currentData = filtered.slice(start, start + rowsPerPage);

    // SLIDING PAGINATION → tampilkan 3 angka dekat page sekarang
    const getPages = () => {
        let start = Math.max(1, page - 1);
        let end = Math.min(totalPages, start + 2);

        if (end - start < 2) {
            start = Math.max(1, end - 2);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    // Mark as read
    const markAsRead = (id) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, status: "Read" } : n))
        );
    };

    return (
        <InstructorLayout>
            <div className="px-1 pb-10">
                {/* HEADER */}
                <h1 className="text-2xl font-bold mb-6">Notifications</h1>

                {/* SEARCH + FILTER */}
                <div className="flex justify-between items-center mb-6">
                    {/* SEARCH */}
                    <div className="bg-white px-4 py-2 rounded-lg shadow border flex items-center w-64">
                        <FiSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search notifications..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                resetPage();
                            }}
                            className="ml-2 bg-transparent outline-none text-sm w-full"
                        />
                    </div>

                    {/* FILTER */}
                    <details className="relative group">
                        <summary className="cursor-pointer bg-white border rounded-lg px-3 py-2 shadow text-sm flex items-center gap-2">
                            <FiFilter /> Filter
                        </summary>

                        <div className="absolute right-0 mt-2 w-52 bg-white p-4 rounded-xl shadow-lg border text-sm z-20">
                            <p className="text-xs text-gray-500 mb-1">Type</p>
                            <select
                                value={filterType}
                                onChange={(e) => {
                                    setFilterType(e.target.value);
                                    resetPage();
                                }}
                                className="w-full border px-2 py-1 rounded mb-3"
                            >
                                <option value="All">All</option>
                                <option value="Enrollment">Enrollment</option>
                                <option value="Class">Class</option>
                                <option value="Review">Review</option>
                                <option value="Earnings">Earnings</option>
                            </select>

                            <p className="text-xs text-gray-500 mb-1">Status</p>
                            <select
                                value={filterStatus}
                                onChange={(e) => {
                                    setFilterStatus(e.target.value);
                                    resetPage();
                                }}
                                className="w-full border px-2 py-1 rounded"
                            >
                                <option value="All">All</option>
                                <option value="Unread">Unread</option>
                                <option value="Read">Read</option>
                            </select>
                        </div>
                    </details>
                </div>

                {/* TABLE */}
                <div className="bg-white rounded-xl shadow p-6">
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
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="py-3">{start + i + 1}</td>

                                    <td className="py-3">
                                        <p className="font-medium">{n.title}</p>
                                        <p className="text-xs text-gray-500">
                                            {n.message}
                                        </p>
                                    </td>

                                    <td className="py-3">{n.type}</td>
                                    <td className="py-3">{n.date}</td>

                                    <td className="py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium
                                                ${
                                                    n.status === "Unread"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-gray-200 text-gray-700"
                                                }`}
                                        >
                                            {n.status}
                                        </span>
                                    </td>

                                    <td className="py-3 text-center">
                                        {n.status === "Unread" && (
                                            <button
                                                onClick={() => markAsRead(n.id)}
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                <FiCheckCircle size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filtered.length === 0 && (
                        <p className="text-center py-4 text-gray-500">
                            No notifications found.
                        </p>
                    )}

                    {/* ROWS PER PAGE + PAGINATION */}
                    <div className="mt-4 flex items-center justify-between">
                        {/* ROWS PER PAGE */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                                Rows per page:
                            </span>

                            <select
                                value={rowsPerPage}
                                onChange={(e) => {
                                    setRowsPerPage(Number(e.target.value));
                                    resetPage();
                                }}
                                className="border px-3 py-1 rounded text-sm"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                        </div>

                        {/* PAGINATION BUTTONS */}
                        <div className="flex items-center gap-2">
                            {/* PREV */}
                            <button
                                disabled={page === 1}
                                onClick={() =>
                                    setPage((p) => Math.max(1, p - 1))
                                }
                                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                            >
                                Prev
                            </button>

                            {/* SLIDING WINDOW */}
                            {(() => {
                                const maxStart = Math.max(1, totalPages - 2);
                                const startPage = Math.min(
                                    Math.max(1, page),
                                    maxStart
                                );
                                const pages = [];

                                for (let i = 0; i < 3; i++) {
                                    const p = startPage + i;
                                    if (p <= totalPages) {
                                        pages.push(
                                            <button
                                                key={p}
                                                onClick={() => setPage(p)}
                                                className={`px-3 py-1 rounded ${
                                                    page === p
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-gray-100"
                                                }`}
                                            >
                                                {p}
                                            </button>
                                        );
                                    }
                                }

                                if (startPage + 3 <= totalPages) {
                                    pages.push(
                                        <button
                                            key="dots"
                                            className="px-3 py-1 rounded bg-gray-100"
                                        >
                                            ...
                                        </button>
                                    );
                                }

                                return pages;
                            })()}

                            {/* NEXT */}
                            <button
                                disabled={page === totalPages}
                                onClick={() =>
                                    setPage((p) => Math.min(totalPages, p + 1))
                                }
                                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </InstructorLayout>
    );
}
