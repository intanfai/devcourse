import { useState } from "react";
import AdminLayout from "../../../../layouts/AdminLayout";
import { FiSearch, FiFilter, FiEye, FiPlus } from "react-icons/fi";
import ClassDetail from "./ClassDetail";
import { Link } from "react-router-dom";
import AddClass from "./AddClass";
import { useNavigate } from "react-router-dom";

export default function ClassesPage() {
    const navigate = useNavigate();
    const [classes, setClasses] = useState([
        {
            id: 1,
            title: "React Basics",
            instructor: "John Doe",
            category: "Web Development",
            level: "Beginner",
            price: 150000,
            status: "Pending",
        },
        {
            id: 2,
            title: "UI/UX Fundamental",
            instructor: "Rina",
            category: "Design",
            level: "Intermediate",
            price: 90000,
            status: "Active",
        },
        {
            id: 3,
            title: "Backend with Laravel",
            instructor: "Bayu",
            category: "Programming",
            level: "Advanced",
            price: 150000,
            status: "Rejected",
        },
        {
            id: 4,
            title: "Laravel API Development",
            instructor: "Andi Wijaya",
            category: "Programming",
            level: "Intermediate",
            price: 200000,
            status: "Approved",
        },
    ]);

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
    const classesPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const indexLast = currentPage * classesPerPage;
    const indexFirst = indexLast - classesPerPage;

    const currentClasses = filteredClasses.slice(indexFirst, indexLast);

    const totalPages = Math.ceil(filteredClasses.length / classesPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

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
                                <option value="Design">Design</option>
                                <option value="Web Development">
                                    Web Development
                                </option>
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
                                <option value="Active">Active</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Approved">Approved</option>
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
                                            cls.status === "Approved"
                                                ? "bg-green-100 text-green-700"
                                                : cls.status === "Rejected"
                                                ? "bg-red-100 text-red-600"
                                                : cls.status === "Active"
                                                ? "bg-blue-100 text-blue-700"
                                                : cls.status === "Archived"
                                                ? "bg-gray-300 text-gray-700"
                                                : "bg-yellow-100 text-yellow-700"
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
                <div className="flex justify-end mt-4 gap-2">
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 rounded ${
                                currentPage === i + 1
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
