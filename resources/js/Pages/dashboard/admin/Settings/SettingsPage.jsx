import { useState, useEffect } from "react";
import AdminLayout from "../../../../layouts/AdminLayout";
import { FiSave } from "react-icons/fi";

export default function SettingsPage() {
    // GENERAL SETTINGS
    const [general, setGeneral] = useState({
        siteName: "DevCourse",
        contactEmail: "support@devcourse.com",
    });

    // Ambil user dari localStorage
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        photo: null,
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const u = JSON.parse(storedUser);
            setProfile({
                name: u.name || "",
                email: u.email || "",
                photo: null,
            });
        }
    }, []);

    // PASSWORD
    const [passwords, setPasswords] = useState({
        current: "",
        newPass: "",
        confirmPass: "",
    });

    const handleSaveGeneral = () => {
        alert("General settings saved! (dummy)");
    };

    const handleSaveProfile = () => {
        alert("Profile updated! (dummy)");
    };

    const handleChangePassword = () => {
        if (passwords.newPass !== passwords.confirmPass) {
            alert("New passwords do not match!");
            return;
        }
        alert("Password changed! (dummy)");
    };

    return (
        <AdminLayout>
            <div className="px-1 pb-10">
                <h1 className="text-2xl font-bold mb-6">Settings</h1>

                {/* ================= GENERAL SETTINGS ================= */}
                <div className="bg-white p-6 rounded-xl shadow mb-6">
                    <h2 className="text-lg font-semibold mb-4">
                        General Settings
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-600">
                                Site Name
                            </label>
                            <input
                                type="text"
                                value={general.siteName}
                                onChange={(e) =>
                                    setGeneral({
                                        ...general,
                                        siteName: e.target.value,
                                    })
                                }
                                className="w-full border px-4 py-2 rounded-lg mt-1"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                value={general.contactEmail}
                                onChange={(e) =>
                                    setGeneral({
                                        ...general,
                                        contactEmail: e.target.value,
                                    })
                                }
                                className="w-full border px-4 py-2 rounded-lg mt-1"
                            />
                        </div>

                        <button
                            onClick={handleSaveGeneral}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                        >
                            <FiSave /> Save Changes
                        </button>
                    </div>
                </div>

                {/* ================= PROFILE SETTINGS ================= */}
                <div className="bg-white p-6 rounded-xl shadow mb-6">
                    <h2 className="text-lg font-semibold mb-4">
                        Admin Profile
                    </h2>

                    <div className="space-y-4">
                        {/* PROFILE PHOTO */}
                        <div className="flex items-center gap-5">
                            <img
                                src={
                                    profile.photo
                                        ? URL.createObjectURL(profile.photo)
                                        : "/images/default-profile.png"
                                }
                                className="w-20 h-20 rounded-full object-cover border"
                            />

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Profile Photo
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setProfile({
                                            ...profile,
                                            photo: e.target.files[0],
                                        })
                                    }
                                />
                            </div>
                        </div>

                        {/* NAME */}
                        <div>
                            <label className="text-sm text-gray-600">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full border px-4 py-2 rounded-lg mt-1"
                            />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm text-gray-600">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={profile.email}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full border px-4 py-2 rounded-lg mt-1"
                            />
                        </div>

                        {/* ROLE */}
                        <div>
                            <label className="text-sm text-gray-600">
                                Role
                            </label>
                            <input
                                type="text"
                                value="Admin"
                                disabled
                                className="w-full border px-4 py-2 rounded-lg mt-1 bg-gray-100 text-gray-500"
                            />
                        </div>

                        <button
                            onClick={handleSaveProfile}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                        >
                            <FiSave /> Update Profile
                        </button>
                    </div>
                </div>

                {/* ================= CHANGE PASSWORD ================= */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4">
                        Change Password
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-600">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={passwords.current}
                                onChange={(e) =>
                                    setPasswords({
                                        ...passwords,
                                        current: e.target.value,
                                    })
                                }
                                className="w-full border px-4 py-2 rounded-lg mt-1"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={passwords.newPass}
                                onChange={(e) =>
                                    setPasswords({
                                        ...passwords,
                                        newPass: e.target.value,
                                    })
                                }
                                className="w-full border px-4 py-2 rounded-lg mt-1"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-600">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={passwords.confirmPass}
                                onChange={(e) =>
                                    setPasswords({
                                        ...passwords,
                                        confirmPass: e.target.value,
                                    })
                                }
                                className="w-full border px-4 py-2 rounded-lg mt-1"
                            />
                        </div>

                        <button
                            onClick={handleChangePassword}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                        >
                            <FiSave /> Change Password
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
