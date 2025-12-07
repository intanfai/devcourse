import { useNavigate } from "react-router-dom";
import InstructorLayout from "../../../../layouts/InstructorLayout";
import { FiEdit2, FiBook, FiBriefcase, FiLink } from "react-icons/fi";

export default function InstructorProfilePage() {
    const navigate = useNavigate();

    // 🔥 Ambil user dari localStorage (sama persis seperti student)
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <InstructorLayout>
            <div className="px-1 pb-10">
                <h1 className="text-2xl font-bold mb-6">My Profile</h1>

                {/* =============================
                    PERSONAL INFO
                ============================== */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <div className="flex items-start gap-6 mb-6">
                        <img
                            src={
                                user.avatar ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    user.name
                                )}&background=0D8ABC&color=fff&size=200`
                            }
                            className="w-24 h-24 rounded-full border object-cover"
                        />

                        <div className="flex-1">
                            <h2 className="text-xl font-bold">{user.name}</h2>
                            <p className="text-gray-600 capitalize">
                                {user.role}
                            </p>

                            {user.bio && (
                                <p className="mt-2 text-gray-700">{user.bio}</p>
                            )}
                        </div>

                        <button
                            onClick={() => navigate("/instructor/profile/edit")}
                            className="ml-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            <FiEdit2 size={18} />
                            Edit Profile
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                        <p>
                            <strong>Phone:</strong>{" "}
                            {user.phone || "Not provided"}
                        </p>
                        <p>
                            <strong>Gender:</strong> {user.gender || "Unknown"}
                        </p>
                        <p>
                            <strong>Address:</strong>{" "}
                            {user.address || "No address provided"}
                        </p>
                    </div>
                </div>

                {/* =============================
                      EDUCATION
                ============================== */}
                {user.education && user.education.length > 0 && (
                    <div className="bg-white rounded-xl shadow p-6 mb-10">
                        <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
                            <FiBook /> Education
                        </h2>

                        {user.education.map((e, i) => (
                            <div key={i} className="mb-3">
                                <p className="font-semibold">{e.school}</p>
                                <p className="text-gray-600">{e.degree}</p>
                                <p className="text-gray-500">{e.year}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* =============================
                      EXPERIENCE
                ============================== */}
                {user.experience && user.experience.length > 0 && (
                    <div className="bg-white rounded-xl shadow p-6 mb-10">
                        <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
                            <FiBriefcase /> Work Experience
                        </h2>

                        {user.experience.map((ex, i) => (
                            <div key={i} className="mb-3">
                                <p className="font-semibold">{ex.place}</p>
                                <p className="text-gray-600">{ex.role}</p>
                                <p className="text-gray-500">{ex.year}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* =============================
                      SOCIAL LINKS
                ============================== */}
                {user.links && (
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
                            <FiLink /> Social Links
                        </h2>

                        <p>
                            <strong>LinkedIn:</strong> {user.links.linkedin}
                        </p>
                        <p>
                            <strong>GitHub:</strong> {user.links.github}
                        </p>
                        <p>
                            <strong>Website:</strong> {user.links.website}
                        </p>
                    </div>
                )}
            </div>
        </InstructorLayout>
    );
}
