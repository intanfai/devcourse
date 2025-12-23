import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../../../../layouts/StudentLayout";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import axios from "../../../../axios";

export default function EditProfilePage() {
    const navigate = useNavigate();

    // Ambil data user dari localStorage
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
        return <div className="p-6">Loading...</div>;
    }

    // FORM DEFAULT DIAMBIL DARI USER LOGIN
    const [form, setForm] = useState({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
    });

    const [preview, setPreview] = useState(
        (user.avatar && user.avatar.trim() !== "" && user.avatar !== "null")
            ? user.avatar
            : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name
            )}&background=0D8ABC&color=fff&size=200`
    );

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Image compression helper
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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAvatar = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const compressed = await compressImage(file);
                setPreview(compressed);
                setForm({ ...form, avatar: compressed });
            } catch (err) {
                console.error("Error compressing image:", err);
                setMessage("Failed to process image");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");

            const token = localStorage.getItem("token");
            const payload = {
                name: form.name,
                phone: form.phone,
                bio: form.bio,
                avatar: form.avatar,
            };

            const res = await axios.put("/profile", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Update localStorage user
            const storedUser = localStorage.getItem("user");
            const u = storedUser ? JSON.parse(storedUser) : {};
            const updated = { ...u, ...res.data.user };
            localStorage.setItem("user", JSON.stringify(updated));

            // Dispatch event for StudentLayout to refresh
            window.dispatchEvent(new Event("user-updated"));

            setMessage("Profile updated successfully!");
            setTimeout(() => navigate("/student/profile"), 1500);
        } catch (err) {
            console.error("Failed to save profile:", err);
            setMessage(err.response?.data?.message || "Failed to save profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <StudentLayout>
            <div className="pb-6">
                {/* BACK BUTTON + TITLE */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Edit Profile
                    </h1>
                </div>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white border shadow-sm rounded-2xl p-8 w-full"
                >
                    {/* AVATAR */}
                    <div className="flex flex-col items-center mb-10">
                        <img
                            src={preview}
                            className="w-28 h-28 rounded-full shadow border object-cover"
                        />
                        <label className="mt-4 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg border flex items-center gap-2 text-sm">
                            <FiUpload size={16} /> Change Avatar
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatar}
                            />
                        </label>
                    </div>

                    {/* FORM GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* NAME */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full mt-1 p-2.5 border rounded-lg bg-gray-50"
                            />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full mt-1 p-2.5 border rounded-lg bg-gray-50"
                            />
                        </div>

                        {/* PHONE REMOVED */}

                        {/* PHONE */}
                        <div>
                            <label className="text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full mt-1 p-2.5 border rounded-lg bg-gray-50"
                                placeholder="+62 812 3456 7890"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">
                                Bio
                            </label>
                            <textarea
                                name="bio"
                                rows="4"
                                value={form.bio}
                                onChange={handleChange}
                                className="w-full mt-1 p-2.5 border rounded-lg bg-gray-50"
                            ></textarea>
                        </div>
                    </div>

                    {/* MESSAGE */}
                    {message && (
                        <div className={`mt-4 p-3 rounded-lg text-sm ${
                            message.includes("success")
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}>
                            {message}
                        </div>
                    )}

                    {/* SAVE BUTTON */}
                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-2.5 text-white rounded-lg transition ${
                                loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </StudentLayout>
    );
}
