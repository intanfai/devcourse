import { useState } from "react";
import InstructorLayout from "../../../../layouts/InstructorLayout";
import { FiSearch, FiFilter, FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";

export default function EarningsPage() {
    const [search, setSearch] = useState("");
    const [filterClass, setFilterClass] = useState("All");

    const earnings = [
        {
            id: 1,
            class: "React Basics",
            student: "Rina Putri",
            amount: 150000,
            date: "2025-01-10",
            type: "Enrollment",
        },
        {
            id: 2,
            class: "Laravel API Masterclass",
            student: "Doni Saputra",
            amount: 200000,
            date: "2025-01-12",
            type: "Enrollment",
        },
        {
            id: 3,
            class: "UI/UX Design Fundamentals",
            student: "Salsa Nur",
            amount: 120000,
            date: "2025-01-15",
            type: "Enrollment",
        },
        {
            id: 4,
            class: "React Basics",
            student: "Bima Aditya",
            amount: 150000,
            date: "2025-01-18",
            type: "Enrollment",
        },
    ];

    const classes = ["All", ...new Set(earnings.map((e) => e.class))];

    // FILTERING
    const filtered = earnings.filter((e) => {
        const matchSearch =
            e.student.toLowerCase().includes(search.toLowerCase()) ||
            e.class.toLowerCase().includes(search.toLowerCase());

        const matchClass = filterClass === "All" ? true : e.class === filterClass;

        return matchSearch && matchClass;
    });

    // PAGINATION
    const rowsPerPage = 5;
    const [page, setPage] = useState(1);

    const start = (page - 1) * rowsPerPage;
    const totalPages = Math.ceil(filtered.length / rowsPerPage);
    const currentData = filtered.slice(start, start + rowsPerPage);

    // SUMMARY
    const totalEarnings = earnings.reduce((sum, e) => sum + e.amount, 0);
    const withdrawn = 500000; // dummy
    const pending = totalEarnings - withdrawn;

    return (
        <InstructorLayout>
            <div className="px-1 pb-10">

                {/* HEADER */}
                <h1 className="text-2xl font-bold mb-6">Earnings</h1>

                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-blue-100 text-blue-600 rounded-xl">
                            <FiArrowUpCircle className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Earnings</p>
                            <h3 className="text-xl font-bold">
                                Rp {totalEarnings.toLocaleString("id-ID")}
                            </h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-green-100 text-green-600 rounded-xl">
                            <FiArrowDownCircle className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Total Withdrawn</p>
                            <h3 className="text-xl font-bold">
                                Rp {withdrawn.toLocaleString("id-ID")}
                            </h3>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-5">
                        <div className="p-4 bg-yellow-100 text-yellow-600 rounded-xl">
                            <FiArrowUpCircle className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Pending Balance</p>
                            <h3 className="text-xl font-bold">
                                Rp {pending.toLocaleString("id-ID")}
                            </h3>
                        </div>
                    </div>
                </div>

                {/* FILTERS */}
                <div className="flex justify-between items-center mb-6">
                    {/* SEARCH */}
                    <div className="bg-white px-4 py-2 rounded-lg shadow border flex items-center">
                        <FiSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search student or class..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="ml-2 bg-transparent outline-none text-sm"
                        />
                    </div>

                    {/* FILTER DROPDOWN */}
                    <details className="relative group">
                        <summary className="cursor-pointer bg-white border rounded-lg px-3 py-2 shadow flex items-center gap-2 text-sm">
                            <FiFilter /> Filter
                        </summary>

                        <div className="absolute right-0 mt-2 w-52 bg-white p-4 rounded-xl shadow-lg border text-sm z-20">
                            <p className="text-xs text-gray-500 mb-1">Class</p>

                            <select
                                value={filterClass}
                                onChange={(e) => {
                                    setFilterClass(e.target.value);
                                    setPage(1);
                                }}
                                className="border w-full rounded px-2 py-1"
                            >
                                {classes.map((cls) => (
                                    <option key={cls}>{cls}</option>
                                ))}
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
                                <th className="py-3">Student</th>
                                <th className="py-3">Class</th>
                                <th className="py-3">Amount</th>
                                <th className="py-3">Date</th>
                                <th className="py-3">Type</th>
                            </tr>
                        </thead>

                        <tbody>
                            {currentData.map((e, i) => (
                                <tr key={e.id} className="border-b hover:bg-gray-50">
                                    <td className="py-3">{start + i + 1}</td>
                                    <td className="py-3 font-medium">{e.student}</td>
                                    <td className="py-3">{e.class}</td>
                                    <td className="py-3">
                                        Rp {e.amount.toLocaleString("id-ID")}
                                    </td>
                                    <td className="py-3">{e.date}</td>
                                    <td className="py-3">{e.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filtered.length === 0 && (
                        <p className="text-center py-4 text-gray-500">
                            No earnings found.
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
