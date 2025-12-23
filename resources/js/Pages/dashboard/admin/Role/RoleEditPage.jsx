import { useLocation, useNavigate } from "react-router-dom";
import { AVAILABLE_MENUS } from "./RolesData";
import AdminLayout from "../../../../layouts/AdminLayout";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

export default function RoleEditPage() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [roleName, setRoleName] = useState(state?.name || "");
    const [access, setAccess] = useState(state?.access || []);

    const toggleMenu = (menu) => {
        setAccess((prev) =>
            prev.includes(menu)
                ? prev.filter((m) => m !== menu)
                : [...prev, menu]
        );
    };

    return (
        <AdminLayout>
            <div className="pb-10">
                {/* Back button */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button>
                    <h1 className="text-2xl font-bold">Edit Role</h1>
                </div>

                <div className="bg-white p-6 rounded-xl shadow max-w-xl">
                    {/* Name */}
                    <select
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        className="border px-4 py-2 rounded-lg w-full mb-4"
                    >
                        <option value="admin">Admin</option>
                        <option value="instructor">Instructor</option>
                        <option value="student">Student</option>
                    </select>

                    {/* CHECKBOX SECTION */}
                    <h3 className="font-semibold mb-2 text-sm">
                        Assign Menu Access:
                    </h3>

                    <div className="grid grid-cols-1 gap-2">
                        {AVAILABLE_MENUS.map((menu) => (
                            <label
                                key={menu}
                                className="flex items-center gap-3 cursor-pointer"
                            >
                                <input
                                    type="checkbox"
                                    checked={access.includes(menu)}
                                    onChange={() => toggleMenu(menu)}
                                    className="w-4 h-4"
                                />
                                <span>{menu}</span>
                            </label>
                        ))}
                    </div>

                    <button
                        onClick={() => navigate("/admin/role")}
                        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
