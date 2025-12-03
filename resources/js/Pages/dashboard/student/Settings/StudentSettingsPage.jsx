import StudentLayout from "../../../../layouts/StudentLayout";
import { FiLock, FiBell, FiTrash2 } from "react-icons/fi";

export default function SettingsPage() {
    return (
        <StudentLayout>
            <div className="pb-6">

                {/* TITLE */}
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>

                {/* MAIN WRAPPER */}
                <div className="space-y-10">

                    {/* ACCOUNT SETTINGS */}
                    <div className="bg-white border shadow-sm rounded-2xl p-8 w-full">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6">
                            Account Settings
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div>
                                <label className="text-sm text-gray-600 font-medium">Language</label>
                                <select
                                    className="w-full mt-1 p-2.5 border rounded-lg bg-gray-50"
                                >
                                    <option>English</option>
                                    <option>Bahasa Indonesia</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-sm text-gray-600 font-medium">Timezone</label>
                                <select
                                    className="w-full mt-1 p-2.5 border rounded-lg bg-gray-50"
                                >
                                    <option>Asia/Jakarta</option>
                                    <option>UTC</option>
                                    <option>Asia/Singapore</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* SECURITY */}
                    <div className="bg-white border shadow-sm rounded-2xl p-8 w-full">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                            <FiLock /> Security
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">

                            <div className="md:col-span-1">
                                <label className="text-sm font-medium text-gray-700">Current Password</label>
                                <input
                                    type="password"
                                    className="w-full mt-1 p-2.5 border rounded-lg bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">New Password</label>
                                <input
                                    type="password"
                                    className="w-full mt-1 p-2.5 border rounded-lg bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    className="w-full mt-1 p-2.5 border rounded-lg bg-gray-50"
                                />
                            </div>

                        </div>

                        <div className="mt-6 flex justify-end">
                            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                Update Password
                            </button>
                        </div>
                    </div>

                    {/* NOTIFICATIONS */}
                    <div className="bg-white border shadow-sm rounded-2xl p-8 w-full">
                        <h2 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                            <FiBell /> Notification Preferences
                        </h2>

                        <div className="space-y-4">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5" defaultChecked />
                                <span className="text-gray-700">Notify me about new course updates</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5" defaultChecked />
                                <span className="text-gray-700">Notify me about certificates</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" className="w-5 h-5" />
                                <span className="text-gray-700">Notify me about promotions</span>
                            </label>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                Save Preferences
                            </button>
                        </div>
                    </div>

                    {/* DELETE ACCOUNT */}
                    <div className="bg-white border shadow-sm rounded-2xl p-8 w-full">
                        <h2 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2">
                            <FiTrash2 /> Danger Zone
                        </h2>

                        <p className="text-gray-600 mb-4">
                            Deleting your account will permanently remove all your data,
                            courses, and certificates. This action cannot be undone.
                        </p>

                        <button className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                            Delete My Account
                        </button>
                    </div>

                </div>
            </div>
        </StudentLayout>
    );
}
