import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import StudentLayout from "../../../../layouts/StudentLayout";
import {
    FiMail,
    FiPhone,
    FiEdit2,
    FiBookOpen,
} from "react-icons/fi";

export default function ProfilePage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Load user dari localStorage dan listen untuk updates
    useEffect(() => {
        const loadUser = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        };

        loadUser();

        const handleUserUpdated = () => loadUser();
        window.addEventListener("user-updated", handleUserUpdated);

        return () => window.removeEventListener("user-updated", handleUserUpdated);
    }, []);

    if (!user) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <StudentLayout>
            <div className="pb-6">

                {/* TITLE */}
                <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>

                <div className="bg-white border shadow-sm rounded-xl p-6">

                    {/* TOP SECTION */}
                    <div className="flex items-start gap-6 mb-10">
                        <img
                            src={
                                (user.avatar && user.avatar.trim() !== "" && user.avatar !== "null")
                                    ? user.avatar
                                    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        user.name
                                    )}&background=0D8ABC&color=fff&size=200`
                            }
                            onError={(e) =>
                                (e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    user.name || "User"
                                )}&background=0D8ABC&color=fff&size=200`)
                            }
                            className="w-28 h-28 rounded-full object-cover shadow-sm"
                        />

                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>

                            {/* ROLE LANGSUNG DARI DATABASE */}
                            <p className="text-gray-600 capitalize">{user.role}</p>

                            {user.bio && (
                                <p className="text-gray-500 mt-2">{user.bio}</p>
                            )}
                        </div>

                        <button
                            onClick={() => navigate("/student/profile/edit")}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            <FiEdit2 size={18} /> Edit Profile
                        </button>
                    </div>

                    {/* PERSONAL INFO */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Personal Information
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">

                        {/* EMAIL */}
                        <div className="flex items-center gap-3">
                            <FiMail className="text-blue-600" size={20} />
                            <p className="text-gray-700">{user.email}</p>
                        </div>

                        {/* PHONE */}
                        <div className="flex items-center gap-3">
                            <FiPhone className="text-green-600" size={20} />
                            <p className="text-gray-700">
                                {user.phone || "No phone provided"}
                            </p>
                        </div>

                    </div>

                    {/* EDUCATION INFO */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Learning Progress
                    </h3>

                    <div className="bg-gray-50 p-4 rounded-lg border mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <FiBookOpen className="text-indigo-600" size={22} />
                            <p className="font-semibold text-gray-800">Course Progress</p>
                        </div>

                        <p className="text-gray-700 mb-2">
                            Completed {user.completedCourses || 0} of{" "}
                            {user.totalCourses || 0} courses
                        </p>

                        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 rounded-full"
                                style={{
                                    width: `${
                                        user.totalCourses
                                            ? (user.completedCourses / user.totalCourses) * 100
                                            : 0
                                    }%`,
                                }}
                            ></div>
                        </div>
                    </div>

                </div>
            </div>
        </StudentLayout>
    );
}
