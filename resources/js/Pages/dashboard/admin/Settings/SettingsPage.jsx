import { useState, useEffect } from "react";
import AdminLayout from "../../../../layouts/AdminLayout";
import { FiSave } from "react-icons/fi";
import axios from "../../../../axios";

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
        avatar: "",
        preview: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Image compression helper (resize to max 400x400, quality 70%)
    const compressImage = (file, maxWidth = 400, maxHeight = 400, quality = 0.7) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    let { width, height } = img;

                    if (width > height) {
                        if (width > maxWidth) {
                            height = Math.round((height * maxWidth) / width);
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width = Math.round((width * maxHeight) / height);
                            height = maxHeight;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0, width, height);

                    const compressed = canvas.toDataURL("image/jpeg", quality);
                    resolve(compressed);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const u = JSON.parse(storedUser);
            setProfile({
                name: u.name || "",
                email: u.email || "",
                avatar: u.avatar || "",
                preview: u.avatar || "",
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

    const handleSaveProfile = async () => {
        try {
            setLoading(true);
            setMessage("");

            const token = localStorage.getItem("token");
            const payload = {
                name: profile.name,
                avatar: profile.avatar,
            };

            const res = await axios.put("/profile", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Update localStorage user
            const storedUser = localStorage.getItem("user");
            const user = storedUser ? JSON.parse(storedUser) : {};
            const updated = { ...user, ...res.data.user };
            localStorage.setItem("user", JSON.stringify(updated));

            // Notify other components to reload user
            window.dispatchEvent(new Event("user-updated"));

            setMessage("Profile updated successfully");
        } catch (err) {
            console.error("Failed to update profile", err);
            setMessage(err.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
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
                                    profile.preview && profile.preview.trim() !== ""
                                        ? profile.preview
                                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                              profile.name || "Admin"
                                          )}&background=0D8ABC&color=fff&size=200`
                                }
                                className="w-20 h-20 rounded-full object-cover border"
                                onError={(e) =>
                                    (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        profile.name || "Admin"
                                    )}&background=0D8ABC&color=fff&size=200`)
                                }
                            />

                            <div>
                                <label className="block text-sm text-gray-600 mb-1">
                                    Profile Photo
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (!file) return;
                                        try {
                                            const compressed = await compressImage(file);
                                            setProfile({
                                                ...profile,
                                                avatar: compressed,
                                                preview: compressed,
                                            });
                                        } catch (err) {
                                            console.error("Compress failed", err);
                                            setMessage("Failed to process image");
                                        }
                                    }}
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

                        {message && (
                            <div className="text-sm text-green-600">{message}</div>
                        )}

                        <button
                            onClick={handleSaveProfile}
                            disabled={loading}
                            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            <FiSave /> {loading ? "Saving..." : "Update Profile"}
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
