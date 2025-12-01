import { useState } from "react";
import AdminLayout from "../../../../layouts/AdminLayout";
import { FiSearch, FiFilter, FiEye } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function CertificatesPage() {
    const navigate = useNavigate();

    const [certificates, setCertificates] = useState([
        {
            id: 101,
            userName: "Rina",
            email: "rina@gmail.com",
            course: "React Basics",
            issueDate: "2025-01-21",
            status: "Completed",
        },
        {
            id: 102,
            userName: "Bayu",
            email: "bayu@gmail.com",
            course: "UI/UX Fundamental",
            issueDate: "2025-02-02",
            status: "Completed",
        },
        {
            id: 103,
            userName: "Dita",
            email: "dita@gmail.com",
            course: "Backend Laravel API",
            issueDate: "2025-02-05",
            status: "Completed",
        },
    ]);

    const [search, setSearch] = useState("");
    const [filterCourse, setFilterCourse] = useState("All");

    const filteredCertificates = certificates.filter((c) => {
        const matchSearch =
            c.userName.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase());

        const matchCourse =
            filterCourse === "All" ? true : c.course === filterCourse;

        return matchSearch && matchCourse;
    });

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
                            onChange={(e) => setSearch(e.target.value)}
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
                                onChange={(e) =>
                                    setFilterCourse(e.target.value)
                                }
                            >
                                <option value="All">All</option>
                                <option value="React Basics">
                                    React Basics
                                </option>
                                <option value="UI/UX Fundamental">
                                    UI/UX Fundamental
                                </option>
                                <option value="Backend Laravel API">
                                    Backend Laravel API
                                </option>
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
                        {filteredCertificates.map((cert, index) => (
                            <tr
                                key={cert.id}
                                className="border-b hover:bg-gray-50 transition"
                            >
                                <td className="py-3 px-3 text-left">
                                    {index + 1}
                                </td>

                                <td className="py-3 px-3 text-left font-mono text-blue-600 font-semibold">
                                    #{cert.id}
                                </td>

                                <td className="py-3 px-3 text-left">
                                    {cert.userName}
                                </td>

                                <td className="py-3 px-3 text-left">
                                    {cert.email}
                                </td>

                                <td className="py-3 px-3 text-left">
                                    {cert.course}
                                </td>

                                <td className="py-3 px-3 text-left">
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
                        ))}
                    </tbody>
                </table>

                {filteredCertificates.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">
                        No certificates found.
                    </p>
                )}
            </div>
        </AdminLayout>
    );
}
