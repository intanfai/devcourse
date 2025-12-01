import { useState } from "react";
import InstructorLayout from "../../../../layouts/InstructorLayout";
import { FiSearch, FiFilter, FiEye } from "react-icons/fi";
import ViewStudentModal from "./ViewStudentModal";

export default function StudentsPage() {
    const [search, setSearch] = useState("");
    const [selectedClass, setSelectedClass] = useState("All");

    // Dummy data: students enrolled in instructor's classes
    const [students] = useState([
        {
            id: 1,
            name: "Rina Putri",
            email: "rina@example.com",
            class: "React Basics",
            progress: "80%",
            status: "Active",
            joined: "2025-01-12",
        },
        {
            id: 2,
            name: "Doni Saputra",
            email: "doni@example.com",
            class: "Laravel API Masterclass",
            progress: "100%",
            status: "Completed",
            joined: "2025-01-05",
        },
        {
            id: 3,
            name: "Salsa Nur",
            email: "salsa@example.com",
            class: "UI/UX Design Fundamentals",
            progress: "40%",
            status: "Active",
            joined: "2025-01-20",
        },
        {
            id: 4,
            name: "Bima Aditya",
            email: "bima@example.com",
            class: "React Basics",
            progress: "15%",
            status: "Active",
            joined: "2025-01-18",
        },
    ]);

    // Extract unique classes
    const classList = ["All", ...new Set(students.map((s) => s.class))];

    // FILTER DATA
    const filtered = students.filter((s) => {
        const matchSearch =
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase());

        const matchClass =
            selectedClass === "All" ? true : s.class === selectedClass;

        return matchSearch && matchClass;
    });

    // PAGINATION
    const rowsPerPage = 5;
    const [page, setPage] = useState(1);
    const start = (page - 1) * rowsPerPage;

    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const currentData = filtered.slice(start, start + rowsPerPage);

    // MODAL
    const [viewModal, setViewModal] = useState({ open: false, data: null });

    return (
        <InstructorLayout>
            <div className="px-1 pb-10">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Students</h1>

                    <div className="flex items-center gap-3">

                        {/* SEARCH BAR */}
                        <div className="bg-white px-4 py-2 rounded-lg shadow border flex items-center">
                            <FiSearch className="text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search student..."
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

                            <div className="absolute right-0 mt-2 w-52 bg-white p-4 rounded-xl shadow-lg border text-sm z-20">
                                <p className="text-xs text-gray-500 mb-1">Class</p>

                                <select
                                    value={selectedClass}
                                    onChange={(e) => {
                                        setSelectedClass(e.target.value);
                                        setPage(1);
                                    }}
                                    className="border w-full rounded px-2 py-1"
                                >
                                    {classList.map((cls) => (
                                        <option key={cls}>{cls}</option>
                                    ))}
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
                                <th className="py-3">Name</th>
                                <th className="py-3">Email</th>
                                <th className="py-3">Class</th>
                                <th className="py-3">Progress</th>
                                <th className="py-3">Status</th>
                                <th className="py-3">Joined</th>
                                <th className="py-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentData.map((s, i) => (
                                <tr key={s.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3">{start + i + 1}</td>
                                    <td className="py-3 font-medium">{s.name}</td>
                                    <td className="py-3">{s.email}</td>
                                    <td className="py-3">{s.class}</td>
                                    <td className="py-3">{s.progress}</td>

                                    <td className="py-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium
                                            ${
                                                s.status === "Active"
                                                    ? "bg-green-100 text-green-700"
                                                    : s.status === "Completed"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-gray-200 text-gray-700"
                                            }`}
                                        >
                                            {s.status}
                                        </span>
                                    </td>

                                    <td className="py-3">{s.joined}</td>

                                    <td className="py-3 text-center">
                                        <button
                                            className="text-blue-600 hover:text-blue-800"
                                            onClick={() =>
                                                setViewModal({ open: true, data: s })
                                            }
                                        >
                                            <FiEye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* NO DATA */}
                    {filtered.length === 0 && (
                        <p className="text-center text-gray-500 py-4">
                            No students found.
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

            {/* VIEW STUDENT MODAL */}
            <ViewStudentModal
                open={viewModal.open}
                data={viewModal.data}
                close={() => setViewModal({ open: false, data: null })}
            />
        </InstructorLayout>
    );
}
