import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../../layouts/AdminLayout";

export default function RolePage() {
    const navigate = useNavigate();

    const [roles, setRoles] = useState([
        {
            id: 1,
            name: "Admin",
            access: [
                "Dashboard",
                "Users",
                "Classes",
                "Certificates",
                "Reports",
                "Payments",
            ],
        },
        {
            id: 2,
            name: "Instructor",
            access: ["Dashboard", "Classes", "Reports"],
        },
        {
            id: 3,
            name: "Student",
            access: ["Dashboard", "Classes", "Certificates"],
        },
    ]);

    return (
        <AdminLayout>
            <div className="pb-10">
                <h1 className="text-2xl font-bold mb-6">Role Management</h1>

                <div className="bg-white p-6 rounded-xl shadow">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-gray-500 border-b">
                                <th className="py-3 w-14 text-left">No</th>
                                <th className="py-3 text-left">Role</th>
                                <th className="py-3 text-left">Menu Access</th>
                                <th className="py-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {roles.map((role, idx) => (
                                <tr
                                    key={role.id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="py-3">{idx + 1}</td>
                                    <td className="py-3">{role.name}</td>
                                    <td className="py-3">
                                        <div className="flex flex-wrap gap-2">
                                            {role.access.map((m) => (
                                                <span
                                                    key={m}
                                                    className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg"
                                                >
                                                    {m}
                                                </span>
                                            ))}
                                        </div>
                                    </td>

                                    <td className="py-3 text-center flex items-center justify-center gap-3">
                                        <button
                                            className="text-blue-600 hover:text-blue-800"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/role/edit/${role.id}`,
                                                    { state: role }
                                                )
                                            }
                                        >
                                            <FiEdit size={18} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-800">
                                            <FiTrash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
