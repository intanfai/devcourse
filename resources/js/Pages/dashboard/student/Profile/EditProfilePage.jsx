import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentLayout from "../../../../layouts/StudentLayout";
import { FiArrowLeft, FiUpload } from "react-icons/fi";

export default function EditProfilePage() {
    const navigate = useNavigate();

    const userData = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+62 812-3456-7890",
        address: "Jakarta, Indonesia",
        gender: "Male",
        bio: "Passionate about web development.",
        avatar: "/img/logo-razen.png",
    };

    const [form, setForm] = useState(userData);
    const [preview, setPreview] = useState(userData.avatar);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
            setForm({ ...form, avatar_file: file });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting:", form);
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
                        Profile
                    </h1>
                </div>

                {/* FULL WIDTH CARD */}
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
                            <input type="file" className="hidden" onChange={handleAvatar} />
                        </label>
                    </div>

                    {/* FORM GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full mt-1 p-2.5 border rounded-lg bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full mt-1 p-2.5 border rounded-lg bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full mt-1 p-2.5 border rounded-lg bg-gray-50"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700">Gender</label>
                            <select
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                className="w-full mt-1 p-2.5 border rounded-lg bg-gray-50"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                className="w-full mt-1 p-2.5 border rounded-lg bg-gray-50"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Bio</label>
                            <textarea
                                name="bio"
                                rows="4"
                                value={form.bio}
                                onChange={handleChange}
                                className="w-full mt-1 p-2.5 border rounded-lg bg-gray-50"
                            ></textarea>
                        </div>
                    </div>

                    {/* SUBMIT */}
                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Save Changes
                        </button>
                    </div>

                </form>
            </div>
        </StudentLayout>
    );
}
