import { useNavigate } from "react-router-dom";
import StudentLayout from "../../../../layouts/StudentLayout";
import {
    FiMail,
    FiPhone,
    FiCalendar,
    FiEdit2,
    FiMapPin,
    FiUser,
    FiBookOpen,
} from "react-icons/fi";

export default function ProfilePage() {
    const navigate = useNavigate();

    // Dummy data (ganti dengan API)
    const user = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+62 812-3456-7890",
        address: "Jakarta, Indonesia",
        joinDate: "Jan 12, 2024",
        gender: "Male",
        bio: "Passionate about web development and always learning new things.",
        role: "Student",
        totalCourses: 12,
        completedCourses: 8,
        avatar:
            "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff&size=200",
    };

    return (
        <StudentLayout>
            <div className="pb-6">

                {/* TITLE */}
                <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>

                <div className="bg-white border shadow-sm rounded-xl p-6">

                    {/* TOP SECTION */}
                    <div className="flex items-start gap-6 mb-10">
                        <img
                            src={user.avatar}
                            className="w-28 h-28 rounded-full object-cover shadow-sm"
                        />

                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                            <p className="text-gray-600">{user.role}</p>

                            {user.bio && (
                                <p className="text-gray-500 mt-2">
                                    {user.bio}
                                </p>
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
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">

                        <div className="flex items-center gap-3">
                            <FiMail className="text-blue-600" size={20} />
                            <p className="text-gray-700">{user.email}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <FiPhone className="text-green-600" size={20} />
                            <p className="text-gray-700">{user.phone}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <FiMapPin className="text-red-500" size={20} />
                            <p className="text-gray-700">{user.address}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <FiUser className="text-purple-600" size={20} />
                            <p className="text-gray-700">Gender: {user.gender}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <FiCalendar className="text-orange-500" size={20} />
                            <p className="text-gray-700">Joined: {user.joinDate}</p>
                        </div>
                    </div>

                    {/* EDUCATION INFO */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning Progress</h3>

                    <div className="bg-gray-50 p-4 rounded-lg border mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <FiBookOpen className="text-indigo-600" size={22} />
                            <p className="font-semibold text-gray-800">Course Progress</p>
                        </div>

                        <p className="text-gray-700 mb-2">
                            Completed {user.completedCourses} of {user.totalCourses} courses
                        </p>

                        <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 rounded-full"
                                style={{
                                    width: `${(user.completedCourses / user.totalCourses) * 100}%`,
                                }}
                            ></div>
                        </div>
                    </div>

                </div>
            </div>
        </StudentLayout>
    );
}
