import { FiX } from "react-icons/fi";
import { useState } from "react";

export default function AddUserModal({ open, close, onSubmit }) {
    if (!open) return null;

    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "Student",
        status: "Active",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        onSubmit(form);
        close();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl">
                
                {/* HEADER */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add New User</h2>
                    <button onClick={close}>
                        <FiX className="text-2xl text-gray-600 hover:text-black" />
                    </button>
                </div>

                {/* FORM */}
                <div className="flex flex-col gap-3">

                    <div>
                        <label className="text-sm text-gray-600">Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 rounded-md border focus:ring focus:ring-blue-200 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 rounded-md border focus:ring focus:ring-blue-200 outline-none"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Role</label>
                        <select
                            name="role"
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 rounded-md border focus:ring focus:ring-blue-200 outline-none"
                        >
                            <option>Admin</option>
                            <option>Instructor</option>
                            <option>Student</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Status</label>
                        <select
                            name="status"
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 rounded-md border focus:ring focus:ring-blue-200 outline-none"
                        >
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            className="w-full mt-1 px-3 py-2 rounded-md border focus:ring focus:ring-blue-200 outline-none"
                        />
                    </div>
                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-3 mt-5">
                    <button
                        onClick={close}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>

            </div>
        </div>
    );
}
