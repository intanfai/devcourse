import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import InstructorLayout from "../../../../layouts/InstructorLayout";
import axios from "../../../../axios";
import { FiEdit2, FiBook, FiBriefcase, FiLink } from "react-icons/fi";

export default function InstructorProfilePage() {
    const navigate = useNavigate();
    const [instructor, setInstructor] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch instructor profile dari API
    useEffect(() => {
        const fetchInstructorProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const storedUser = localStorage.getItem("user");
                const user = storedUser ? JSON.parse(storedUser) : null;
                
                if (!user || !user.id) {
                    console.error("User not found in localStorage");
                    // Fallback: set instructor dengan data dari localStorage
                    setInstructor(user);
                    setLoading(false);
                    return;
                }

                const res = await axios.get(`/instructors/${user.id}/profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                
                setInstructor(res.data);
            } catch (error) {
                console.error("Failed to fetch instructor profile:", error);
                // Fallback ke localStorage jika API gagal
                const storedUser = localStorage.getItem("user");
                const user = storedUser ? JSON.parse(storedUser) : null;
                setInstructor(user);
            } finally {
                setLoading(false);
            }
        };

        fetchInstructorProfile();
    }, []);

    if (loading) {
        return <InstructorLayout><div className="p-6">Loading...</div></InstructorLayout>;
    }

    if (!instructor) {
        return <InstructorLayout><div className="p-6">No profile data found</div></InstructorLayout>;
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
                                instructor.avatar ||
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    instructor.name
                                )}&background=0D8ABC&color=fff&size=200`
                            }
                            className="w-24 h-24 rounded-full border object-cover"
                        />

                        <div className="flex-1">
                            <h2 className="text-xl font-bold">{instructor.name}</h2>
                            <p className="text-gray-600 capitalize">
                                Instructor
                            </p>

                            {instructor.bio && (
                                <p className="mt-2 text-gray-700">{instructor.bio}</p>
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
                            <strong>Email:</strong> {instructor.email}
                        </p>
                        <p>
                            <strong>Phone:</strong>{" "}
                            {instructor.phone || "Not provided"}
                        </p>
                    </div>
                </div>

                {/* =============================
                      EDUCATION
                ============================== */}
                {instructor.education && instructor.education.length > 0 && (
                    <div className="bg-white rounded-xl shadow p-6 mb-10">
                        <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
                            <FiBook /> Education
                        </h2>

                        {instructor.education.map((e, i) => (
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
                {instructor.experience && instructor.experience.length > 0 && (
                    <div className="bg-white rounded-xl shadow p-6 mb-10">
                        <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
                            <FiBriefcase /> Work Experience
                        </h2>

                        {instructor.experience.map((ex, i) => (
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
                {instructor.links && (
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
                            <FiLink /> Social Links
                        </h2>

                        <p>
                            <strong>LinkedIn:</strong> {instructor.links.linkedin}
                        </p>
                        <p>
                            <strong>GitHub:</strong> {instructor.links.github}
                        </p>
                        <p>
                            <strong>Website:</strong> {instructor.links.website}
                        </p>
                    </div>
                )}
            </div>
        </InstructorLayout>
    );
}
