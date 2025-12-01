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

    // FILTER
    const filtered = notifications.filter((n) => {
        const matchSearch =
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.message.toLowerCase().includes(search.toLowerCase());

        const matchType = filterType === "All" ? true : n.type === filterType;
        const matchStatus = filterStatus === "All" ? true : n.status === filterStatus;

        return matchSearch && matchType && matchStatus;
    });

    // PAGINATION
    const rowsPerPage = 5;
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const start = (page - 1) * rowsPerPage;
    const currentData = filtered.slice(start, start + rowsPerPage);

    // MARK AS READ
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
                            onChange={(e) => setSearch(e.target.value)}
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
                                    setPage(1);
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
                                                }
                                            `}
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

                    {/* Empty State */}
                    {filtered.length === 0 && (
                        <p className="text-center py-4 text-gray-500">
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
        </InstructorLayout>
    );
}
