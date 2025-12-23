import { useState, useEffect } from "react";
import AdminLayout from "../../../../layouts/AdminLayout";
import { FiSearch, FiFilter, FiEye, FiPlus } from "react-icons/fi";
import ClassDetail from "./ClassDetail";
import { Link } from "react-router-dom";
import AddClass from "./AddClass";
import { useNavigate } from "react-router-dom";
import axios from "../../../../axios";

export default function ClassesPage() {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);

    /* ---------------- STATE FILTER ---------------- */
    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("All");
    const [filterLevel, setFilterLevel] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");

    /* ---------------- FILTER LOGIC ---------------- */
    const filteredClasses = classes.filter((c) => {
        const matchSearch = c.title
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchCategory =
            filterCategory === "All" ? true : c.category === filterCategory;
        const matchLevel =
            filterLevel === "All" ? true : c.level === filterLevel;
        const matchStatus =
            filterStatus === "All" ? true : c.status === filterStatus;

        return matchSearch && matchCategory && matchLevel && matchStatus;
    });

    /* ---------------- PAGINATION ---------------- */
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const indexLast = currentPage * rowsPerPage;
    const indexFirst = indexLast - rowsPerPage;

    const currentClasses = filteredClasses.slice(indexFirst, indexLast);

    const totalPages = Math.max(1, Math.ceil(filteredClasses.length / rowsPerPage));

    const handlePageChange = (page) => setCurrentPage(page);
    const resetPage = () => setCurrentPage(1);

    // load courses from API
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        setLoading(true);
        axios
            .get("/courses", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                // API uses pagination; if response has data key (paginated), extract data
                const data = res.data.data ? res.data.data : res.data;
                // map to expected shape (instructor name available in relation)
                const mapped = data.map((c) => ({
                    id: c.id,
                    title: c.title,
                    instructor: c.instructor ? c.instructor.name : "",
                    category: c.category || "",
                    level: c.level || "",
                    price: c.price || 0,
                    status: c.status || "Pending",
                }));

                setClasses(mapped);
            })
            .catch((err) => console.error("Failed to load courses", err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <AdminLayout>
            {/* HEADER + ACTIONS */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Classes</h1>

                <div className="flex items-center gap-3">
                    {/* SEARCH */}
                    <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow border">
                        <FiSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search classes..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="ml-2 bg-transparent outline-none text-sm"
                        />
                    </div>

                    {/* FILTER DROPDOWN */}
                    <details className="relative group">
                        <summary className="list-none bg-white border rounded-lg px-3 py-2 shadow flex items-center gap-2 cursor-pointer">
                            <FiFilter className="text-gray-700" />
                            <span>Filter</span>
                        </summary>

                        <div className="absolute right-0 mt-2 w-48 bg-white p-4 rounded-xl shadow-lg border z-20">
                            {/* CATEGORY */}
                            <p className="text-xs text-gray-500 mb-1">
                                Category
                            </p>
                            <select
                                className="w-full border px-2 py-1 rounded mb-3"
                                value={filterCategory}
                                onChange={(e) =>
                                    setFilterCategory(e.target.value)
                                }
                            >
                                <option value="All">All</option>
                                <option value="Programming">Programming</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Design">Design</option>
                                <option value="UI/UX">UI/UX</option>
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                            </select>

                            {/* LEVEL */}
                            <p className="text-xs text-gray-500 mb-1">Level</p>
                            <select
                                className="w-full border px-2 py-1 rounded mb-3"
                                value={filterLevel}
                                onChange={(e) => setFilterLevel(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">
                                    Intermediate
                                </option>
                                <option value="Advanced">Advanced</option>
                            </select>

                            {/* STATUS */}
                            <p className="text-xs text-gray-500 mb-1">Status</p>
                            <select
                                className="w-full border px-2 py-1 rounded"
                                value={filterStatus}
                                onChange={(e) =>
                                    setFilterStatus(e.target.value)
                                }
                            >
                                <option value="All">All</option>
                                <option value="Pending">Pending</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Approved">Approved</option>
                                <option value="Published">Published</option>
                                <option value="Archived">Archived</option>
                            </select>
                        </div>
                    </details>

                    {/* ADD CLASS */}
                    <button
                        onClick={() => navigate("/admin/classes/add")}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                    >
                        <FiPlus /> Add Class
                    </button>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white p-6 rounded-xl shadow">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-500 border-b">
                            <th className="text-left py-3 px-4">No</th>
                            <th className="text-left py-3 px-4">Class ID</th>
                            <th className="text-left py-3 px-4">Title</th>
                            <th className="text-left py-3 px-4">Instructor</th>
                            <th className="text-left py-3 px-4">Category</th>
                            <th className="text-left py-3 px-4">Level</th>
                            <th className="text-left py-3 px-4">Price</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-center py-3 px-4 w-20">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentClasses.map((cls, index) => (
                            <tr
                                key={cls.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="py-3 px-4 text-left">
                                    {indexFirst + index + 1}
                                </td>

                                <td className="py-3 px-4 text-left font-mono text-blue-600 font-semibold">
                                    #{cls.id}
                                </td>

                                <td className="py-3 px-4 text-left">
                                    {cls.title}
                                </td>

                                <td className="py-3 px-4 text-left">
                                    {cls.instructor}
                                </td>

                                <td className="py-3 px-4 text-left">
                                    {cls.category}
                                </td>

                                <td className="py-3 px-4 text-left">
                                    {cls.level}
                                </td>

                                <td className="py-3 px-4 text-left font-semibold text-green-700">
                                    Rp {cls.price.toLocaleString("id-ID")}
                                </td>

                                <td className="py-3 px-4 text-left">
                                    <span
                                        className={`px-3 py-1.5 text-xs rounded-lg font-medium ${
                                            cls.status === "Published"
                                                ? "bg-green-100 text-green-700"
                                                : cls.status === "Rejected"
                                                ? "bg-red-100 text-red-600"
                                                : cls.status === "Pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : cls.status === "Approved"
                                                ? "bg-blue-100 text-blue-700"
                                                : cls.status === "Archived"
                                                ? "bg-gray-300 text-gray-700"
                                                : "bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        {cls.status}
                                    </span>
                                </td>

                                <td className="py-3 px-3">
                                    <div className="flex justify-center gap-3">
                                        <Link
                                            to={`/admin/classes/${cls.id}`}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FiEye size={18} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

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
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            className="px-3 py-1 rounded bg-gray-200 text-sm disabled:opacity-50"
                        >
                            Prev
                        </button>

                        {/* sliding window: show up to 3 page buttons */}
                        {(() => {
                            const maxStart = Math.max(1, totalPages - 2);
                            const start = Math.min(Math.max(1, currentPage), maxStart);
                            const pageButtons = [];

                            for (let i = 0; i < 3; i++) {
                                const p = start + i;
                                if (p <= totalPages) {
                                    pageButtons.push(
                                        <button
                                            key={p}
                                            onClick={() => setCurrentPage(p)}
                                            className={`px-3 py-1 rounded text-sm ${
                                                currentPage === p
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
                                                setCurrentPage((_) => Math.min(totalPages, start + 3))
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
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            className="px-3 py-1 rounded bg-gray-200 text-sm disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
