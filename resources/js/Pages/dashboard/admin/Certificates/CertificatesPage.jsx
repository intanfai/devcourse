import { useState, useEffect } from "react";
import AdminLayout from "../../../../layouts/AdminLayout";
import { FiSearch, FiFilter, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CertificatesPage() {
    const navigate = useNavigate();

    const [certificates, setCertificates] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    /* ===================== FILTERS ===================== */
    const [search, setSearch] = useState("");
    const [filterCourse, setFilterCourse] = useState("All");

    // Fetch certificates from backend
    useEffect(() => {
        fetchCertificates();
    }, [search, filterCourse]);

    const fetchCertificates = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("/api/admin/certificates", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    search: search,
                    course: filterCourse,
                },
            });

            setCertificates(response.data.certificates || []);
            setCourses(response.data.courses || []);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching certificates:", error);
            setLoading(false);
        }
    };

    const filteredCertificates = certificates.filter((c) => {
        const matchSearch =
            c.userName.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase());

        const matchCourse =
            filterCourse === "All" ? true : c.course === filterCourse;

        return matchSearch && matchCourse;
    });

    /* ===================== PAGINATION ===================== */
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const resetPage = () => setCurrentPage(1);

    const totalPages = Math.ceil(filteredCertificates.length / rowsPerPage);

    const paginatedData = filteredCertificates.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <AdminLayout>
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Certificates</h1>

                <div className="flex items-center gap-3">
                    {/* SEARCH */}
                    <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow border">
                        <FiSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search user..."
                            className="ml-2 bg-transparent outline-none text-sm"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                resetPage();
                            }}
                        />
                    </div>

                    {/* FILTER */}
                    <details className="relative group">
                        <summary className="list-none cursor-pointer flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow border">
                            <FiFilter className="text-gray-700" />
                            <span>Filter</span>
                        </summary>

                        <div className="absolute right-0 mt-2 w-48 bg-white p-4 rounded-xl shadow-lg border z-20">
                            <p className="text-xs text-gray-500 mb-1">Course</p>
                            <select
                                className="w-full border px-2 py-1 rounded"
                                value={filterCourse}
                                onChange={(e) => {
                                    setFilterCourse(e.target.value);
                                    resetPage();
                                }}
                            >
                                <option value="All">All</option>
                                {courses.map((course, idx) => (
                                    <option key={idx} value={course}>
                                        {course}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </details>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white p-6 rounded-xl shadow">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b text-gray-500">
                            <th className="py-3 px-3 text-left w-12">No</th>
                            <th className="py-3 px-3 text-left">
                                Certificate ID
                            </th>
                            <th className="py-3 px-3 text-left">User</th>
                            <th className="py-3 px-3 text-left">Email</th>
                            <th className="py-3 px-3 text-left">Course</th>
                            <th className="py-3 px-3 text-left">Issued</th>
                            <th className="py-3 px-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="py-8 text-center text-gray-500"
                                >
                                    Loading certificates...
                                </td>
                            </tr>
                        ) : paginatedData.length > 0 ? (
                            paginatedData.map((cert, index) => (
                                <tr
                                    key={cert.id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="py-3 px-3 text-left">
                                        {(currentPage - 1) * rowsPerPage +
                                            index +
                                            1}
                                    </td>

                                    <td className="py-3 px-3 text-left font-mono text-blue-600 font-semibold">
                                        #{cert.id}
                                    </td>

                                    <td className="py-3 px-3">
                                        {cert.userName}
                                    </td>
                                    <td className="py-3 px-3">{cert.email}</td>
                                    <td className="py-3 px-3">{cert.course}</td>
                                    <td className="py-3 px-3">
                                        {cert.issueDate}
                                    </td>

                                    <td className="py-3 px-3 text-center">
                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/admin/certificates/${cert.id}`
                                                )
                                            }
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FiEye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : null}
                    </tbody>
                </table>

                {filteredCertificates.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">
                        No certificates found.
                    </p>
                )}

                {/* PAGINATION */}
                {filteredCertificates.length > 0 && (
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

                        {/* PAGE BUTTONS */}
                        <div className="flex items-center gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((p) => Math.max(1, p - 1))
                                }
                                className="px-3 py-1 rounded bg-gray-200 text-sm disabled:opacity-50"
                            >
                                Prev
                            </button>

                            {/* Sliding window (max 3 pages) */}
                            {(() => {
                                const maxStart = Math.max(1, totalPages - 2);
                                const start = Math.min(
                                    Math.max(1, currentPage),
                                    maxStart
                                );
                                const items = [];

                                for (let i = 0; i < 3; i++) {
                                    const page = start + i;
                                    if (page <= totalPages) {
                                        items.push(
                                            <button
                                                key={page}
                                                onClick={() =>
                                                    setCurrentPage(page)
                                                }
                                                className={`px-3 py-1 rounded text-sm ${
                                                    currentPage === page
                                                        ? "bg-blue-600 text-white"
                                                        : "bg-gray-100"
                                                }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    }
                                }

                                return (
                                    <>
                                        {items}
                                        {start + 3 <= totalPages && (
                                            <button
                                                onClick={() =>
                                                    setCurrentPage(
                                                        Math.min(
                                                            totalPages,
                                                            start + 3
                                                        )
                                                    )
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
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.min(totalPages, p + 1)
                                    )
                                }
                                className="px-3 py-1 rounded bg-gray-200 text-sm disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
