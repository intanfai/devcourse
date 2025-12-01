import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InstructorLayout from "../../../../layouts/InstructorLayout";
import { FiSearch, FiFilter, FiEdit, FiTrash2, FiEye } from "react-icons/fi";
import ConfirmModal from "../../../../Components/ConfirmModal";
import ViewClassModal from "./ViewClassModal";
import EditClassPage from "./EditClassPage";
import { Link } from "react-router-dom";

export default function MyClassesPage() {
    const navigate = useNavigate();

    const [classes, setClasses] = useState([
        {
            id: 1,
            title: "React Basics",
            category: "Web Development",
            students: 120,
            price: 150000,
            status: "Published",
            date: "2025-01-21",
        },
        {
            id: 2,
            title: "UI/UX Design Fundamentals",
            category: "Design",
            students: 80,
            price: 120000,
            status: "Pending Review",
            date: "2025-01-18",
        },
        {
            id: 3,
            title: "Laravel API Masterclass",
            category: "Backend",
            students: 45,
            price: 200000,
            status: "Draft",
            date: "2025-01-12",
        },
        {
            id: 4,
            title: "Mobile Design Basics",
            category: "Design",
            students: 30,
            price: 90000,
            status: "Rejected",
            date: "2025-01-05",
        },
    ]);

    const [search, setSearch] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    // PAGINATION
    const rowsPerPage = 5;
    const [page, setPage] = useState(1);
    const start = (page - 1) * rowsPerPage;

    const filtered = classes.filter((c) => {
        const matchSearch = c.title
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchStatus =
            filterStatus === "All" ? true : c.status === filterStatus;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const currentData = filtered.slice(start, start + rowsPerPage);

    // MODALS
    const [viewModal, setViewModal] = useState({ open: false, data: null });
    const [deleteModal, setDeleteModal] = useState({ open: false, data: null });

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
                                    <option value="Pending Review">
                                        Pending Review
                                    </option>
                                    <option value="Draft">Draft</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </div>
                        </details>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-white rounded-xl shadow p-6">
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
                                                    : c.status ===
                                                      "Pending Review"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : c.status === "Draft"
                                                    ? "bg-gray-200 text-gray-700"
                                                    : "bg-red-100 text-red-600"
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
                onConfirm={() => {
                    setClasses((prev) =>
                        prev.filter((x) => x.id !== deleteModal.data.id)
                    );
                    setDeleteModal({ open: false, data: null });
                }}
                onClose={() => setDeleteModal({ open: false, data: null })}
            />
        </InstructorLayout>
    );
}
