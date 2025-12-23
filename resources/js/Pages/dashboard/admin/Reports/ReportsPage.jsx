import { useMemo, useState } from "react";
import AdminLayout from "../../../../layouts/AdminLayout";
import { FiDownload } from "react-icons/fi";
import * as XLSX from "xlsx";

// chart.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function formatDateISO(d) {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

function getRange(preset) {
    const now = new Date();
    const start = new Date();
    const end = new Date();

    switch (preset) {
        case "today":
            start.setHours(0, 0, 0, 0);
            end.setHours(23, 59, 59, 999);
            break;
        case "yesterday":
            start.setDate(now.getDate() - 1);
            end.setDate(now.getDate() - 1);
            break;
        case "last7":
            start.setDate(now.getDate() - 6);
            break;
        case "last30":
            start.setDate(now.getDate() - 29);
            break;
        case "thisMonth":
            start.setDate(1);
            break;
        case "lastMonth":
            start.setMonth(now.getMonth() - 1, 1);
            end.setMonth(now.getMonth(), 0);
            break;
        default:
            start.setFullYear(2000, 0, 1);
            break;
    }
    return { start, end };
}

export default function ReportsPage() {
    const [activeTab, setActiveTab] = useState("courses");
    const [datePreset, setDatePreset] = useState("last30");
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const today = new Date();
    function daysAgo(n) {
        const d = new Date();
        d.setDate(today.getDate() - n);
        return formatDateISO(d);
    }

    // ------------------ Dummy Data ------------------
    const courseReports = [
        {
            id: 1,
            course: "React Basics",
            instructor: "John Doe",
            students: 120,
            completed: 98,
            revenue: 18000000,
            avgRating: 4.6,
            date: daysAgo(2),
        },
        {
            id: 2,
            course: "UI/UX Fundamentals",
            instructor: "Rina",
            students: 85,
            completed: 62,
            revenue: 7650000,
            avgRating: 4.4,
            date: daysAgo(12),
        },
        {
            id: 3,
            course: "Laravel API",
            instructor: "Andi Wijaya",
            students: 44,
            completed: 30,
            revenue: 8800000,
            avgRating: 4.7,
            date: daysAgo(25),
        },
    ];

    const userReports = [
        {
            id: 1,
            name: "Rina",
            email: "rina@gmail.com",
            role: "Student",
            coursesJoined: 5,
            lastLogin: daysAgo(1),
            status: "Active",
        },
        {
            id: 2,
            name: "Dita",
            email: "dita@gmail.com",
            role: "Instructor",
            coursesJoined: 2,
            lastLogin: daysAgo(10),
            status: "Active",
        },
        {
            id: 3,
            name: "Andi",
            email: "andi@gmail.com",
            role: "Admin",
            coursesJoined: 0,
            lastLogin: daysAgo(20),
            status: "Active",
        },
    ];

    const salesReports = [
        {
            id: 1001,
            orderId: "ORD-1001",
            course: "React Basics",
            buyer: "Rina",
            price: 150000,
            date: daysAgo(2),
            payment: "Stripe",
            status: "Paid",
        },
        {
            id: 1002,
            orderId: "ORD-1002",
            course: "UI/UX Fundamentals",
            buyer: "Bayu",
            price: 90000,
            date: daysAgo(12),
            payment: "Paypal",
            status: "Paid",
        },
    ];

    // ------------------ Filtering ------------------
    const { start: presetStart, end: presetEnd } = useMemo(
        () => getRange(datePreset),
        [datePreset]
    );

    const filterByDate = (data) =>
        data.filter((r) => {
            const date = new Date(r.date || r.lastLogin);
            return date >= presetStart && date <= presetEnd;
        });

    const filteredCourses = filterByDate(courseReports);
    const filteredUsers = filterByDate(userReports);
    const filteredSales = filterByDate(salesReports);

    const currentData =
        activeTab === "courses"
            ? filteredCourses
            : activeTab === "users"
            ? filteredUsers
            : filteredSales;

    const totalPages = Math.max(1, Math.ceil(currentData.length / rowsPerPage));
    const indexLast = currentPage * rowsPerPage;
    const indexFirst = indexLast - rowsPerPage;
    const currentPageData = currentData.slice(indexFirst, indexLast);

    const resetPage = () => setCurrentPage(1);

    // ------------------ Export Excel ------------------
    const exportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(currentData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
        XLSX.writeFile(
            workbook,
            `${activeTab}_report_${formatDateISO(new Date())}.xlsx`
        );
    };

    // ------------------ Charts ------------------

    // COURSE REPORT → BAR CHART
    const chartCourseBar = {
        labels: courseReports.map((c) => c.course),
        datasets: [
            {
                label: "Students",
                data: courseReports.map((c) => c.students),
                backgroundColor: ["#3C64EF", "#8B5CF6", "#10B981"],
            },
        ],
    };

    // USER REPORT → LINE CHART
    const chartUsersLine = (() => {
        const labels = [];
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(today.getDate() - i);
            labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
            data.push(Math.floor(5 + Math.random() * 15));
        }
        return {
            labels,
            datasets: [
                {
                    label: "New Users",
                    data,
                    borderColor: "#3C64EF",
                    backgroundColor: "rgba(60,100,239,0.1)",
                    fill: true,
                },
            ],
        };
    })();

    // USER REPORT → PIE CHART
    const chartRolePie = (() => {
        const counts = userReports.reduce((acc, u) => {
            acc[u.role] = (acc[u.role] || 0) + 1;
            return acc;
        }, {});

        return {
            labels: Object.keys(counts),
            datasets: [
                {
                    data: Object.values(counts),
                    backgroundColor: ["#3C64EF", "#10B981", "#F59E0B"],
                },
            ],
        };
    })();

    // SALES REPORT → LINE CHART REVENUE
    const chartSalesLine = (() => {
        const labels = [];
        const data = [];

        salesReports.forEach((s) => {
            labels.push(s.date);
            data.push(s.price);
        });

        return {
            labels,
            datasets: [
                {
                    label: "Revenue",
                    data,
                    borderColor: "#10B981",
                    backgroundColor: "rgba(16,185,129,0.15)",
                    tension: 0.3,
                    fill: true,
                },
            ],
        };
    })();

    // ------------------ Table ------------------
    const renderTable = () => {
        if (activeTab === "courses") {
            return (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-500 border-b">
                            <th className="py-3 px-3 text-left w-12">No</th>
                            <th className="py-3 px-3 text-left">Course ID</th>
                            <th className="py-3 px-3 text-left">Course</th>
                            <th className="py-3 px-3 text-left">Instructor</th>
                            <th className="py-3 px-3 text-left">Students</th>
                            <th className="py-3 px-3 text-left">Completed</th>
                            <th className="py-3 px-3 text-left">Revenue</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((r, idx) => (
                            <tr
                                key={r.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="py-3 px-3 text-left">
                                    {indexFirst + idx + 1}
                                </td>
                                <td className="py-3 px-3 text-left font-mono text-blue-600 font-semibold">
                                    #{r.id}
                                </td>
                                <td className="py-3 px-3 text-left">
                                    {r.course}
                                </td>
                                <td className="py-3 px-3 text-left">
                                    {r.instructor}
                                </td>
                                <td className="py-3 px-3 text-left">
                                    {r.students}
                                </td>
                                <td className="py-3 px-3 text-left">
                                    {r.completed}
                                </td>
                                <td className="py-3 px-3 text-left">
                                    Rp {r.revenue.toLocaleString("id-ID")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }

        if (activeTab === "users") {
            return (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-500 border-b">
                            <th className="py-3 px-3 text-left w-12">No</th>
                            <th className="py-3 px-3 text-left">User ID</th>
                            <th className="py-3 px-3 text-left">Name</th>
                            <th className="py-3 px-3 text-left">Email</th>
                            <th className="py-3 px-3 text-left">Role</th>
                            <th className="py-3 px-3 text-left">
                                Courses Joined
                            </th>
                            <th className="py-3 px-3 text-left">Last Login</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPageData.map((r, idx) => (
                            <tr
                                key={r.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="py-3 px-3 text-left">
                                    {indexFirst + idx + 1}
                                </td>
                                <td className="py-3 px-3 text-left font-mono text-blue-600 font-semibold">
                                    #{r.id}
                                </td>
                                <td className="py-3 px-3 text-left">
                                    {r.name}
                                </td>
                                <td className="py-3 px-3 text-left">
                                    {r.email}
                                </td>
                                <td className="py-3 px-3 text-left">
                                    {r.role}
                                </td>
                                <td className="py-3 px-3 text-left">
                                    {r.coursesJoined}
                                </td>
                                <td className="py-3 px-3 text-left">
                                    {r.lastLogin}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }

        // SALES REPORT
        return (
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-gray-500 border-b">
                        <th className="py-3 px-3 text-left w-12">No</th>
                        <th className="py-3 px-3 text-left">Order ID</th>
                        <th className="py-3 px-3 text-left">Course</th>
                        <th className="py-3 px-3 text-left">Buyer</th>
                        <th className="py-3 px-3 text-left">Price</th>
                        <th className="py-3 px-3 text-left">Date</th>
                        <th className="py-3 px-3 text-left">Payment</th>
                        <th className="py-3 px-3 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPageData.map((r, idx) => (
                        <tr key={r.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-3 text-left">
                                {indexFirst + idx + 1}
                            </td>
                            <td className="py-3 px-3 text-left font-mono text-blue-600 font-semibold">
                                {r.orderId}
                            </td>
                            <td className="py-3 px-3 text-left">{r.course}</td>
                            <td className="py-3 px-3 text-left">{r.buyer}</td>
                            <td className="py-3 px-3 text-left">
                                Rp {r.price.toLocaleString("id-ID")}
                            </td>
                            <td className="py-3 px-3 text-left">{r.date}</td>
                            <td className="py-3 px-3 text-left">{r.payment}</td>
                            <td className="py-3 px-3 text-left">{r.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <AdminLayout>
            <div className="px-1 pb-10">
                <h1 className="text-2xl font-bold mb-6">Reports</h1>

                {/* Tabs */}
                <div className="border-b mb-6 flex gap-10">
                    {[
                        { key: "courses", label: "Course Reports" },
                        { key: "users", label: "User Reports" },
                        { key: "sales", label: "Sales Reports" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            className={`pb-3 text-sm font-medium ${
                                activeTab === tab.key
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-blue-600"
                            }`}
                            onClick={() => {
                                setActiveTab(tab.key);
                                resetPage();
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Filters + Export */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                            Date Range:
                        </span>
                        <select
                            className="px-3 py-2 border rounded-lg text-sm"
                            value={datePreset}
                            onChange={(e) => {
                                setDatePreset(e.target.value);
                                resetPage();
                            }}
                        >
                            <option value="all">All Time</option>
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="last7">Last 7 Days</option>
                            <option value="last30">Last 30 Days</option>
                            <option value="thisMonth">This Month</option>
                            <option value="lastMonth">Last Month</option>
                        </select>
                    </div>

                    <button
                        onClick={exportExcel}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                    >
                        <FiDownload /> Export Excel
                    </button>
                </div>

                {/* Charts */}
                <div className="space-y-6 mb-8">
                    {activeTab === "courses" && (
                        <div className="bg-white p-6 pb-12 rounded-xl shadow h-80">
                            <p className="text-sm text-gray-500 mb-3">
                                Students per Course
                            </p>
                            <Bar
                                data={chartCourseBar}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                }}
                            />
                        </div>
                    )}

                    {activeTab === "users" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* LEFT: LINE CHART */}
                            <div className="bg-white p-6 pb-14 rounded-xl shadow h-80">
                                <p className="text-sm text-gray-500 mb-3">
                                    New Users (Last 7 Days)
                                </p>
                                <Line
                                    data={chartUsersLine}
                                    options={{
                                        maintainAspectRatio: false,
                                        plugins: { legend: { display: false } },
                                    }}
                                />
                            </div>

                            {/* RIGHT: PIE CHART */}
                            <div className="bg-white p-6 pb-14 rounded-xl shadow h-80">
                                <p className="text-sm text-gray-500 mb-3">
                                    User Role Distribution
                                </p>
                                <Pie
                                    data={chartRolePie}
                                    options={{
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: "bottom",
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === "sales" && (
                        <div className="bg-white p-6 pb-12 rounded-xl shadow h-80">
                            <p className="text-sm text-gray-500 mb-3">
                                Sales Revenue Trend
                            </p>
                            <Line
                                data={chartSalesLine}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Table */}
                <div className="bg-white p-6 rounded-xl shadow">
                    {renderTable()}

                    {/* ROWS PER PAGE */}
                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                            <span>Rows per page:</span>
                            <select
                                className="border px-2 py-1 rounded"
                                value={rowsPerPage}
                                onChange={(e) => {
                                    setRowsPerPage(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
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
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((p) => Math.max(1, p - 1))
                                }
                                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                            >
                                Prev
                            </button>

                            {/* SLIDING WINDOW */}
                            {(() => {
                                const maxStart = Math.max(1, totalPages - 2);
                                const startPage = Math.min(
                                    Math.max(1, currentPage),
                                    maxStart
                                );

                                const pages = [];

                                for (let i = 0; i < 3; i++) {
                                    const p = startPage + i;
                                    if (p <= totalPages) {
                                        pages.push(
                                            <button
                                                key={p}
                                                onClick={() =>
                                                    setCurrentPage(p)
                                                }
                                                className={`px-3 py-1 rounded ${
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
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((p) =>
                                        Math.min(totalPages, p + 1)
                                    )
                                }
                                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
