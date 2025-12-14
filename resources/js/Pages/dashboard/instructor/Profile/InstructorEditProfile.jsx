import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InstructorLayout from "../../../../layouts/InstructorLayout";
import axios from "../../../../axios";
import {
    FiUpload,
    FiMail,
    FiUser,
    FiPhone,
    FiLink,
    FiBook,
    FiBriefcase,
    FiArrowLeft,
} from "react-icons/fi";

export default function InstructorEditProfilePage() {
    const navigate = useNavigate();

    // Ambil user dari localStorage
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    // Kalau tidak ada user
    if (!user) return <div className="p-6">Loading...</div>;

    // =====================
    // STATE
    // =====================
    const [form, setForm] = useState({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        avatar: user.avatar || "",
        address: user.address || "",
        gender: user.gender || "",
        education: user.education || [],
        experience: user.experience || [],
        links: user.links || {
            linkedin: "",
            github: "",
            website: "",
        },
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // =====================
    // IMAGE COMPRESSION
    // =====================
    const compressImage = (file, maxWidth = 400, maxHeight = 400, quality = 0.7) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let { width, height } = img;

                    // Maintain aspect ratio
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
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    // Convert to base64 with compression
                    const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                    resolve(compressedBase64);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    };

    // =====================
    // HANDLERS
    // =====================
    const updateField = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const updateLink = (key, value) => {
        setForm((prev) => ({
            ...prev,
            links: { ...prev.links, [key]: value },
        }));
    };

    const updateEducation = (id, key, value) => {
        setForm((prev) => ({
            ...prev,
            education: prev.education.map((e) =>
                e.id === id ? { ...e, [key]: value } : e
            ),
        }));
    };

    const updateExperience = (id, key, value) => {
        setForm((prev) => ({
            ...prev,
            experience: prev.experience.map((e) =>
                e.id === id ? { ...e, [key]: value } : e
            ),
        }));
    };

    const addEducation = () => {
        setForm((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                { id: Date.now(), school: "", degree: "", year: "" },
            ],
        }));
    };

    const addExperience = () => {
        setForm((prev) => ({
            ...prev,
            experience: [
                ...prev.experience,
                { id: Date.now(), place: "", role: "", year: "" },
            ],
        }));
    };

    // =====================
    // SAVE BUTTON
    // =====================
    const saveChanges = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            // Siapkan data yang akan dikirim ke API
            const profileData = {
                name: form.name,
                phone: form.phone,
                bio: form.bio,
                avatar: form.avatar,
            };

            const res = await axios.put("/profile", profileData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Update localStorage dengan data terbaru
            const updatedUser = {
                ...user,
                ...res.data.user,
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            
            setMessage("✓ Profile updated successfully");
            setTimeout(() => navigate("/instructor/profile"), 1500);
        } catch (error) {
            console.error("Error saving profile:", error);
            setMessage("✗ Failed to save profile. " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <InstructorLayout>
            <div className="px-1 pb-10">
                {/* BACK BUTTON */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button>

                    <h1 className="text-2xl font-bold">Edit Profile</h1>
                </div>

                {/* =====================
                    AVATAR + BASIC
                ====================== */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3">
                        Personal Information
                    </h2>

                    <div className="flex items-center gap-6 mb-6">
                        <img
                            src={form.avatar}
                            className="w-20 h-20 rounded-full object-cover border"
                        />

                        <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                            <FiUpload /> Change Photo
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        try {
                                            const compressedBase64 = await compressImage(file);
                                            updateField("avatar", compressedBase64);
                                        } catch (error) {
                                            console.error("Error compressing image:", error);
                                            setMessage("Failed to process image");
                                        }
                                    }
                                }}
                            />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                            <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                                <FiUser /> Full Name
                            </label>
                            <input
                                className="w-full border px-4 py-2 rounded-lg"
                                value={form.name}
                                onChange={(e) =>
                                    updateField("name", e.target.value)
                                }
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                                <FiMail /> Email
                            </label>
                            <input
                                className="w-full border px-4 py-2 rounded-lg"
                                value={form.email}
                                onChange={(e) =>
                                    updateField("email", e.target.value)
                                }
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                                <FiPhone /> Phone
                            </label>
                            <input
                                className="w-full border px-4 py-2 rounded-lg"
                                value={form.phone}
                                onChange={(e) =>
                                    updateField("phone", e.target.value)
                                }
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="mt-4">
                        <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                            <FiUser /> Bio
                        </label>
                        <textarea
                            className="w-full border px-4 py-2 rounded-lg"
                            rows="3"
                            value={form.bio}
                            onChange={(e) => updateField("bio", e.target.value)}
                        />
                    </div>
                </div>

                {/* =====================
                    EDUCATION
                ====================== */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
                        <FiBook /> Education
                    </h2>

                    {form.education.map((edu) => (
                        <div
                            key={edu.id}
                            className="grid md:grid-cols-3 gap-3 mb-3"
                        >
                            <input
                                className="border px-3 py-2 rounded-lg"
                                placeholder="School"
                                value={edu.school}
                                onChange={(e) =>
                                    updateEducation(
                                        edu.id,
                                        "school",
                                        e.target.value
                                    )
                                }
                            />
                            <input
                                className="border px-3 py-2 rounded-lg"
                                placeholder="Degree"
                                value={edu.degree}
                                onChange={(e) =>
                                    updateEducation(
                                        edu.id,
                                        "degree",
                                        e.target.value
                                    )
                                }
                            />
                            <input
                                className="border px-3 py-2 rounded-lg"
                                placeholder="Year"
                                value={edu.year}
                                onChange={(e) =>
                                    updateEducation(
                                        edu.id,
                                        "year",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    ))}

                    <button
                        className="text-blue-600 mt-2"
                        onClick={addEducation}
                    >
                        + Add Education
                    </button>
                </div>

                {/* =====================
                    EXPERIENCE
                ====================== */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
                        <FiBriefcase /> Work Experience
                    </h2>

                    {form.experience.map((ex) => (
                        <div
                            key={ex.id}
                            className="grid md:grid-cols-3 gap-3 mb-3"
                        >
                            <input
                                className="border px-3 py-2 rounded-lg"
                                placeholder="Company"
                                value={ex.place}
                                onChange={(e) =>
                                    updateExperience(
                                        ex.id,
                                        "place",
                                        e.target.value
                                    )
                                }
                            />
                            <input
                                className="border px-3 py-2 rounded-lg"
                                placeholder="Role"
                                value={ex.role}
                                onChange={(e) =>
                                    updateExperience(
                                        ex.id,
                                        "role",
                                        e.target.value
                                    )
                                }
                            />
                            <input
                                className="border px-3 py-2 rounded-lg"
                                placeholder="Year"
                                value={ex.year}
                                onChange={(e) =>
                                    updateExperience(
                                        ex.id,
                                        "year",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    ))}

                    <button
                        className="text-blue-600 mt-2"
                        onClick={addExperience}
                    >
                        + Add Experience
                    </button>
                </div>

                {/* =====================
                    SOCIAL LINKS
                ====================== */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
                        <FiLink /> Social Links
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            className="border px-3 py-2 rounded-lg"
                            placeholder="LinkedIn"
                            value={form.links.linkedin}
                            onChange={(e) =>
                                updateLink("linkedin", e.target.value)
                            }
                        />
                        <input
                            className="border px-3 py-2 rounded-lg"
                            placeholder="GitHub"
                            value={form.links.github}
                            onChange={(e) =>
                                updateLink("github", e.target.value)
                            }
                        />
                        <input
                            className="border px-3 py-2 rounded-lg"
                            placeholder="Website"
                            value={form.links.website}
                            onChange={(e) =>
                                updateLink("website", e.target.value)
                            }
                        />
                    </div>
                </div>

                {/* SAVE BUTTON */}
                <div className="mt-8">
                    {message && (
                        <div className={`mb-4 p-4 rounded-lg ${message.includes("✓") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {message}
                        </div>
                    )}
                    <button
                        onClick={saveChanges}
                        disabled={loading}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                        className="ml-4 px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400"
                        onClick={() => navigate("/instructor/profile")}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </InstructorLayout>
    );
}
