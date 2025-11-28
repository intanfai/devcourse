import { useState } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiFilter } from "react-icons/fi";
import AddUserModal from "./AddUserModal";

export default function UsersPage() {
    const [users, setUsers] = useState([
        { id: 1, name: "Rina", email: "rina@gmail.com", role: "Student", status: "Active" },
        { id: 2, name: "Dita", email: "dita@gmail.com", role: "Instructor", status: "Active" },
        { id: 3, name: "Andi", email: "andi@gmail.com", role: "Admin", status: "Inactive" },
        { id: 4, name: "Bayu", email: "bayu@gmail.com", role: "Student", status: "Active" },
        { id: 5, name: "Lia", email: "lia@gmail.com", role: "Student", status: "Inactive" },
    ]);

    const [openAdd, setOpenAdd] = useState(false);

    /* ------------------ SEARCH ------------------ */
    const [search, setSearch] = useState("");

    /* ------------------ FILTERS ------------------ */
    const [filterRole, setFilterRole] = useState("All");
    const [filterStatus, setFilterStatus] = useState("All");

    const filteredUsers = users.filter((u) => {
        const matchSearch =
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());

        const matchRole = filterRole === "All" ? true : u.role === filterRole;
        const matchStatus = filterStatus === "All" ? true : u.status === filterStatus;

        return matchSearch && matchRole && matchStatus;
    });

    /* ------------------ PAGINATION ------------------ */
    const usersPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);

    const indexLast = currentPage * usersPerPage;
    const indexFirst = indexLast - usersPerPage;

    const currentUsers = filteredUsers.slice(indexFirst, indexLast);

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    const handlePageChange = (page) => setCurrentPage(page);

    /* ------------------ ADD USER ------------------ */
    const handleAddUser = (newUser) => {
        setUsers([
            ...users,
            {
                id: users.length + 1,
                ...newUser
            }
        ]);
    };

    /* ------------------ DELETE USER ------------------ */
    const handleDelete = (id) => {
        if (confirm("Are you sure?")) {
            setUsers(users.filter((u) => u.id !== id));
        }
    };

    return (
        <AdminLayout>
            {/* TITLE + SEARCH / FILTER + ADD BUTTON */}
            <div className="flex justify-between items-center mb-6">

                <h1 className="text-2xl font-bold">Users Management</h1>

                <div className="flex items-center gap-3">
                    {/* SEARCH BAR */}
                    <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow border">
                        <FiSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="ml-2 bg-transparent outline-none text-sm"
                        />
                    </div>

                    {/* FILTER BUTTON (ROLE + STATUS) */}
                    <div className="relative">

                        <details className="group">
                            <summary className="list-none cursor-pointer bg-white border rounded-lg px-3 py-2 shadow flex items-center gap-2">
                                <FiFilter className="text-gray-700" />
                                <span className="text-sm text-gray-700">Filter</span>
                            </summary>

                            <div className="absolute right-0 mt-2 w-40 bg-white p-3 rounded-lg shadow-lg border z-50">

                                {/* ROLE FILTER */}
                                <p className="text-xs text-gray-500 mb-1">Role</p>
                                <select
                                    className="w-full border px-2 py-1 rounded mb-3"
                                    value={filterRole}
                                    onChange={(e) => setFilterRole(e.target.value)}
                                >
                                    <option value="All">All</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Instructor">Instructor</option>
                                    <option value="Student">Student</option>
                                </select>

                                {/* STATUS FILTER */}
                                <p className="text-xs text-gray-500 mb-1">Status</p>
                                <select
                                    className="w-full border px-2 py-1 rounded"
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                >
                                    <option value="All">All</option>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>

                            </div>
                        </details>

                    </div>

                    {/* ADD USER BUTTON */}
                    <button
                        onClick={() => setOpenAdd(true)}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                    >
                        <FiPlus /> Add User
                    </button>
                </div>

            </div>

            {/* TABLE */}
            <div className="bg-white p-6 rounded-xl shadow">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-gray-500 border-b">
                            <th className="py-3 w-12 text-left">No</th>
                            <th className="py-3 w-20 text-left">User ID</th>
                            <th className="py-3 text-left">Name</th>
                            <th className="py-3 text-left">Email</th>
                            <th className="py-3 text-left">Role</th>
                            <th className="py-3 text-left">Status</th>
                            <th className="py-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentUsers.map((user, index) => (
                            <tr key={user.id} className="border-b hover:bg-gray-50 transition">

                                <td className="py-3">{indexFirst + index + 1}</td>

                                <td className="font-mono text-blue-600 font-semibold">
                                    #{user.id}
                                </td>

                                <td className="py-3">{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>

                                <td>
                                    <span
                                        className={`px-3 py-1 text-xs rounded-lg ${
                                            user.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-600"
                                        }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>

                                <td className="py-3 flex justify-center gap-3">
                                    <button className="text-blue-600 hover:text-blue-800">
                                        <FiEdit size={18} />
                                    </button>

                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FiTrash2 size={18} />
                                    </button>
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

            {/* ADD USER MODAL */}
            <AddUserModal
                open={openAdd}
                close={() => setOpenAdd(false)}
                onSubmit={handleAddUser}
            />
        </AdminLayout>
    );
}
