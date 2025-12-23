import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InstructorLayout from "../../../../layouts/InstructorLayout";
import { FiSearch, FiFilter, FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import ConfirmModal from "../../../../Components/ConfirmModal";
import ViewClassModal from "./ViewClassModal";
import EditClassPage from "./EditClassPage";
import { Link } from "react-router-dom";
import axios from "../../../../axios";

export default function MyClassesPage() {
    const navigate = useNavigate();

    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    // PAGINATION
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const start = (page - 1) * rowsPerPage;

    // MODALS
    const [viewModal, setViewModal] = useState({ open: false, data: null });
    const [deleteModal, setDeleteModal] = useState({ open: false, data: null });

    // Fetch classes from API
    useEffect(() => {
        fetchMyClasses();
    }, []);

    const fetchMyClasses = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("/dashboard/instructor-classes", {
                headers: { Authorization: `Bearer ${token}` },
            });

            setClasses(res.data.courses || []);
        } catch (err) {
            console.error("Failed to fetch classes:", err);
            setError("Failed to load classes. Please try again.");
            setClasses([]);
        } finally {
            setLoading(false);
        }
    };

    // Filter and pagination logic
    const filtered = classes.filter((c) => {
        const matchSearch = c.title
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchStatus =
            filterStatus === "All" ? true : c.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
    const currentData = filtered.slice(start, start + rowsPerPage);

    const resetPage = () => setPage(1);

    // Handle delete
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`/courses/${deleteModal.data.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Remove from local state
            setClasses((prev) =>
                prev.filter((x) => x.id !== deleteModal.data.id)
            );
            setDeleteModal({ open: false, data: null });
        } catch (err) {
            console.error("Failed to delete class:", err);
            alert("Failed to delete class. Please try again.");
        }
    };

    return (
        <InstructorLayout>
            <div className="px-1 pb-10">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">My Classes</h1>

                    <div className="flex items-center gap-3">
                        {/* SEARCH */}
                        <div className="bg-white px-4 py-2 rounded-lg shadow border flex items-center">
                            <FiSearch className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                                className="ml-2 bg-transparent outline-none text-sm"
                            />
                        </div>

                        {/* FILTER */}
                        <details className="relative group">
                            <summary className="cursor-pointer bg-white border rounded-lg px-3 py-2 shadow flex items-center gap-2 text-sm">
                                <FiFilter /> Filter
                            </summary>

                            <div className="absolute right-0 mt-2 w-44 bg-white p-4 rounded-xl shadow-lg border text-sm z-20">
                                <p className="text-xs text-gray-500">Status</p>
                                <select
                                    value={filterStatus}
                                    onChange={(e) => {
                                        setFilterStatus(e.target.value);
                                        setPage(1);
                                    }}
                                    className="border w-full rounded px-2 py-1 mt-1"
                                >
                                    <option value="All">All</option>
                                    <option value="Published">Published</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Rejected">Rejected</option>
                                    <option value="Archived">Archived</option>
                                </select>
                            </div>
                        </details>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white rounded-xl shadow p-6">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {loading ? (
                        <div className="flex items-center justify-center h-48">
                            <p className="text-gray-400">Loading classes...</p>
                        </div>
                    ) : (
                        <>
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="border-b text-gray-500">
                                        <th className="py-3">No</th>
                                        <th className="py-3">Title</th>
                                        <th className="py-3">Category</th>
                                        <th className="py-3">Students</th>
                                        <th className="py-3">Price</th>
                                        <th className="py-3">Status</th>
                                        <th className="py-3">Date</th>
                                        <th className="py-3 text-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {currentData.map((c, i) => (
                                        <tr
                                            key={c.id}
                                            className="border-b hover:bg-gray-50"
                                        >
                                            <td className="py-3">{start + i + 1}</td>
                                            <td className="py-3 font-medium">
                                                {c.title}
                                            </td>
                                            <td className="py-3">{c.category}</td>
                                            <td className="py-3">{c.students}</td>
                                            <td className="py-3">
                                                Rp {c.price.toLocaleString("id-ID")}
                                            </td>

                                            {/* STATUS */}
                                            <td className="py-3">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-medium
                                                    ${
                                                        c.status === "Published"
                                                            ? "bg-green-100 text-green-700"
                                                            : c.status === "Pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : c.status === "Draft"
                                                            ? "bg-gray-200 text-gray-700"
                                                            : c.status === "Rejected"
                                                            ? "bg-red-100 text-red-600"
                                                            : c.status === "Archived"
                                                            ? "bg-blue-100 text-blue-600"
                                                            : "bg-purple-100 text-purple-700"
                                                    }`}
                                                >
                                                    {c.status}
                                                </span>
                                            </td>

                                            <td className="py-3">{c.date}</td>

                                            {/* ACTION */}
                                            <td className="py-3 text-center flex justify-center gap-3">
                                                {/* VIEW */}
                                                <button
                                                    className="text-blue-600 hover:text-blue-800"
                                                    onClick={() =>
                                                        setViewModal({
                                                            open: true,
                                                            data: c,
                                                        })
                                                    }
                                                >
                                                    <FiEye size={18} />
                                                </button>

                                                {/* EDIT → GO TO PAGE */}
                                                <Link
                                                    to={`/instructor/classes/edit/${c.id}`}
                                                    className="text-green-600 hover:text-green-800"
                                                >
                                                    <FiEdit size={18} />
                                                </Link>

                                                {/* DELETE */}
                                                <button
                                                    className="text-red-600 hover:text-red-800"
                                                    onClick={() =>
                                                        setDeleteModal({
                                                            open: true,
                                                            data: c,
                                                        })
                                                    }
                                                >
                                                    <FiTrash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* EMPTY STATE */}
                            {filtered.length === 0 && (
                                <p className="text-center text-gray-500 py-4">
                                    No classes found.
                                </p>
                            )}

                            {/* PAGINATION */}
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500">Rows per page:</span>
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

                                <div className="flex items-center gap-2">
                                    <button
                                        disabled={page === 1}
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        className="px-3 py-1 rounded bg-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Prev
                                    </button>

                                    {/* sliding window: show up to 3 page buttons */}
                                    {(() => {
                                        const maxStart = Math.max(1, totalPages - 2);
                                        const start = Math.min(Math.max(1, page), maxStart);
                                        const pageButtons = [];

                                        for (let i = 0; i < 3; i++) {
                                            const p = start + i;
                                            if (p <= totalPages) {
                                                pageButtons.push(
                                                    <button
                                                        key={p}
                                                        onClick={() => setPage(p)}
                                                        className={`px-3 py-1 rounded text-sm ${
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

                                        return (
                                            <>
                                                {pageButtons}
                                                {start + 3 <= totalPages && (
                                                    <button
                                                        onClick={() =>
                                                            setPage((_) => Math.min(totalPages, start + 3))
                                                        }
                                                        className="px-3 py-1 rounded text-sm bg-gray-100"
                                                    >
                                                        ...
                                                    </button>
                                                )}
                                            </>
                                        );
                                    })()}

                                    <button
                                        disabled={page === totalPages}
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        className="px-3 py-1 rounded bg-gray-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* VIEW MODAL */}
            <ViewClassModal
                open={viewModal.open}
                data={viewModal.data}
                close={() => setViewModal({ open: false, data: null })}
            />

            {/* DELETE MODAL */}
            <ConfirmModal
                open={deleteModal.open}
                title="Delete Class?"
                message={`Are you sure you want to delete "${deleteModal.data?.title}"?`}
                onConfirm={handleDelete}
                onClose={() => setDeleteModal({ open: false, data: null })}
            />
        </InstructorLayout>
    );
}
