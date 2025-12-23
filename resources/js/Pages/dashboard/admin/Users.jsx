import { useState, useEffect } from "react";
import AdminLayout from "../../../layouts/AdminLayout";
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiFilter } from "react-icons/fi";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./Users/EditUserModal";
import ConfirmModal from "../../../Components/ConfirmModal";
import axios from "../../../axios";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);

    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState({
        open: false,
        user: null,
    });

    const [selectedUser, setSelectedUser] = useState(null);

    const [search, setSearch] = useState("");
    const [filterRole, setFilterRole] = useState("All");

    // FILTER (Tanpa status)
    const filteredUsers = users.filter((u) => {
        const roleName = (u.role?.name || u.role || "").toString();

        const matchSearch =
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());

        const matchRole =
            filterRole === "All"
                ? true
                : roleName.toLowerCase() === filterRole.toString().toLowerCase();

        return matchSearch && matchRole;
    });

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const indexLast = currentPage * rowsPerPage;
    const indexFirst = indexLast - rowsPerPage;
    const currentUsers = filteredUsers.slice(indexFirst, indexLast);
    const totalPages = Math.max(1, Math.ceil(filteredUsers.length / rowsPerPage));

    const handlePageChange = (page) => setCurrentPage(page);
    const resetPage = () => setCurrentPage(1);

    // ADD USER
    const handleAddUser = (newUser) => {
        const token = localStorage.getItem("token");
        const roleObj = roles.find((r) => r.name === newUser.role);

        if (!roleObj) {
            alert("Selected role not found. Please reload the page.");
            return;
        }

        axios
            .post(
                "/users",
                {
                    name: newUser.name,
                    email: newUser.email,
                    password: newUser.password || "password123",
                    role_id: roleObj ? roleObj.id : null,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
                if (res.data) setUsers((prev) => [...prev, res.data]);
            })
            .catch((err) => {
                console.error("Failed to create user", err);
                const msg = err.response?.data?.message ||
                    (err.response?.data?.errors ? JSON.stringify(err.response.data.errors) : err.message);
                alert(`Failed to create user: ${msg}`);
            });
    };

    // UPDATE USER
    const handleUpdateUser = (updatedUser) => {
        const token = localStorage.getItem("token");
        const roleObj = roles.find((r) => r.name === updatedUser.role);

        if (!roleObj) {
            alert("Selected role not found. Please reload the page.");
            return;
        }

        axios
            .put(
                `/users/${updatedUser.id}`,
                {
                    name: updatedUser.name,
                    email: updatedUser.email,
                    password: updatedUser.password || null,
                    role_id: roleObj ? roleObj.id : null,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            .then((res) => {
                if (res.data) {
                    setUsers(users.map((u) => (u.id === res.data.id ? res.data : u)));
                }
            })
            .catch((err) => {
                console.error("Failed to update user", err);
                const msg = err.response?.data?.message ||
                    (err.response?.data?.errors ? JSON.stringify(err.response.data.errors) : err.message);
                alert(`Failed to update user: ${msg}`);
            });
    };

    // DELETE USER
    const handleDeleteConfirm = () => {
        const token = localStorage.getItem("token");

        axios
            .delete(`/users/${confirmDelete.user.id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                setUsers(users.filter((u) => u.id !== confirmDelete.user.id));
                setConfirmDelete({ open: false, user: null });
            })
            .catch((err) => {
                console.error("Failed to delete user", err);
                const msg = err.response?.data?.message || err.message;
                alert(`Failed to delete user: ${msg}`);
            });
    };

    // load users & roles from API
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios
            .get("/users", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                if (res.data) setUsers(res.data);
            })
            .catch((err) => console.error("Failed to load users", err));

        axios
            .get("/roles", { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                if (res.data) setRoles(res.data);
            })
            .catch((err) => console.error("Failed to load roles", err));
    }, []);

    return (
        <AdminLayout>
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Users Management</h1>

                <div className="flex items-center gap-3">
                    {/* SEARCH */}
                    <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow border">
                        <FiSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                resetPage();
                            }}
                            className="ml-2 bg-transparent outline-none text-sm"
                        />
                    </div>

                    {/* FILTER */}
                    <details className="relative group">
                        <summary className="list-none cursor-pointer bg-white border rounded-lg px-3 py-2 shadow flex items-center gap-2">
                            <FiFilter className="text-gray-700" />
                            <span>Filter</span>
                        </summary>

                        <div className="absolute right-0 mt-2 w-40 bg-white p-3 rounded-lg shadow-lg border z-50">
                            {/* ROLE ONLY */}
                            <p className="text-xs text-gray-500 mb-1">Role</p>
                            <select
                                value={filterRole}
                                onChange={(e) => {
                                    setFilterRole(e.target.value);
                                    resetPage();
                                }}
                                className="w-full border px-2 py-1 rounded"
                            >
                                <option value="All">All</option>
                                {roles.map((r) => (
                                    <option key={r.id} value={r.name}>
                                        {r.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </details>

                    {/* ADD USER */}
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
                            <th className="py-3 px-3 text-left w-12">No</th>
                            <th className="py-3 px-3 text-left w-20">
                                User ID
                            </th>
                            <th className="py-3 px-3 text-left">Name</th>
                            <th className="py-3 px-3 text-left">Email</th>
                            <th className="py-3 px-3 text-left">Role</th>
                            <th className="py-3 px-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentUsers.map((user, idx) => (
                            <tr
                                key={user.id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="py-3 px-3">
                                    {indexFirst + idx + 1}
                                </td>

                                <td className="py-3 px-3 font-mono text-blue-600 font-semibold">
                                    #{user.id}
                                </td>

                                <td className="py-3 px-3">{user.name}</td>
                                <td className="py-3 px-3">{user.email}</td>
                                <td className="py-3 px-3">{user.role?.name || user.role}</td>

                                <td className="py-3 px-3 flex justify-center gap-3">
                                    <button
                                        onClick={() => {
                                            setSelectedUser({
                                                ...user,
                                                role: user.role?.name || user.role,
                                                status: user.status || "Active",
                                            });
                                            setOpenEdit(true);
                                        }}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        <FiEdit size={18} />
                                    </button>

                                    <button
                                        onClick={() =>
                                            setConfirmDelete({
                                                open: true,
                                                user,
                                            })
                                        }
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
                            className="px-3 py-1 rounded bg-gray-200 text-sm"
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
                            className="px-3 py-1 rounded bg-gray-200 text-sm"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* MODALS */}
            <AddUserModal
                open={openAdd}
                close={() => setOpenAdd(false)}
                onSubmit={handleAddUser}
                roles={roles}
            />

            <EditUserModal
                open={openEdit}
                close={() => setOpenEdit(false)}
                user={selectedUser}
                onSubmit={handleUpdateUser}
                roles={roles}
            />

            <ConfirmModal
                open={confirmDelete.open}
                title="Delete User?"
                message={`Are you sure you want to delete "${confirmDelete.user?.name}"?`}
                onConfirm={handleDeleteConfirm}
                onClose={() => setConfirmDelete({ open: false, user: null })}
            />
        </AdminLayout>
    );
}
