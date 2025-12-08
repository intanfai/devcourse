import { FiX } from "react-icons/fi";

export default function EditUserModal({ open, close, user, onSubmit, roles = [] }) {
    if (!open || !user) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(e.target);

        onSubmit({
            id: user.id,
            name: form.get("name"),
            email: form.get("email"),
            role: form.get("role"),
            password: form.get("password"),
            status: form.get("status"),
        });

        close();
    };

    return (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-[420px] shadow-xl border border-gray-200">
                <h2 className="text-xl font-semibold mb-4">Edit User</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium">Name</label>
                        <input
                            name="name"
                            defaultValue={user.name}
                            required
                            className="w-full border rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Email</label>
                        <input
                            name="email"
                            defaultValue={user.email}
                            type="email"
                            required
                            className="w-full border rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Role</label>
                        <select
                            name="role"
                            defaultValue={user.role}
                            className="w-full border rounded-lg px-4 py-2 mt-1"
                        >
                            <option value="">Select role</option>
                            {roles.map((r) => (
                                <option key={r.id} value={r.name}>
                                    {r.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Status</label>
                        <select
                            name="status"
                            defaultValue={user.status}
                            className="w-full border rounded-lg px-4 py-2 mt-1"
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Password (leave blank to keep)</label>
                        <input
                            name="password"
                            type="password"
                            className="w-full border rounded-lg px-4 py-2 mt-1 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={close}
                            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
