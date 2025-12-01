import { useState } from "react";
import InstructorLayout from "../../../../layouts/InstructorLayout";
import {
    FiUpload,
    FiMail,
    FiUser,
    FiPhone,
    FiLock,
    FiBook,
    FiBriefcase,
    FiLink,
} from "react-icons/fi";

export default function InstructorProfilePage() {
    /* =============================
            BASIC PROFILE
    ============================== */
    const [profile, setProfile] = useState({
        name: "Nadia Putri",
        email: "nadia@example.com",
        phone: "081234567890",
        avatar: "/images/avatar.png",
        bio: "Professional Web Developer & Instructor with 5+ years of experience.",
    });

    /* =============================
          EDUCATION & EXPERIENCE
    ============================== */
    const [education, setEducation] = useState([
        {
            id: 1,
            school: "Universitas Indonesia",
            degree: "S1 Informatika",
            year: "2018",
        },
    ]);

    const [experience, setExperience] = useState([
        {
            id: 1,
            place: "Tokopedia",
            role: "Frontend Developer",
            year: "2020 - 2023",
        },
    ]);

    /* =============================
                SKILLS
    ============================== */
    const [skills, setSkills] = useState(["React", "UI/UX", "Laravel"]);

    const [links, setLinks] = useState({
        linkedin: "https://linkedin.com/in/nadia",
        github: "https://github.com/nadia",
        website: "https://nadia.dev",
    });

    const [passwords, setPasswords] = useState({
        current: "",
        newPass: "",
        confirm: "",
    });

    /* =============================
              HANDLERS
    ============================== */
    const updateProfile = (key, value) => {
        setProfile((prev) => ({ ...prev, [key]: value }));
    };

    const updateLink = (key, value) => {
        setLinks((prev) => ({ ...prev, [key]: value }));
    };

    const updatePassword = (key, value) => {
        setPasswords((prev) => ({ ...prev, [key]: value }));
    };

    const addEducation = () => {
        setEducation((prev) => [
            ...prev,
            { id: Date.now(), school: "", degree: "", year: "" },
        ]);
    };

    const addExperience = () => {
        setExperience((prev) => [
            ...prev,
            { id: Date.now(), place: "", role: "", year: "" },
        ]);
    };

    const addSkill = () => setSkills((prev) => [...prev, ""]);

    /* =================================
                UI COMPONENT
    ================================== */

    return (
        <InstructorLayout>
            <div className="px-1 pb-10">
                <h1 className="text-2xl font-bold mb-6">Profile</h1>

                {/* =============================
                    PERSONAL INFO
                ============================== */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3">
                        Personal Information
                    </h2>

                    <div className="flex items-center gap-6 mb-6">
                        <img
                            src={profile.avatar}
                            className="w-20 h-20 rounded-full border object-cover"
                        />

                        <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                            <FiUpload /> Change Photo
                            <input
                                type="file"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        updateProfile(
                                            "avatar",
                                            URL.createObjectURL(file)
                                        );
                                    }
                                }}
                            />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                            <label className="text-sm text-gray-600 flex items-center gap-2 mb-1">
                                <FiUser /> Full Name
                            </label>
                            <input
                                className="w-full border px-4 py-2 rounded-lg"
                                value={profile.name}
                                onChange={(e) =>
                                    updateProfile("name", e.target.value)
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
                                value={profile.email}
                                onChange={(e) =>
                                    updateProfile("email", e.target.value)
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
                                value={profile.phone}
                                onChange={(e) =>
                                    updateProfile("phone", e.target.value)
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
                            value={profile.bio}
                            onChange={(e) =>
                                updateProfile("bio", e.target.value)
                            }
                        />
                    </div>

                    <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                        Save Changes
                    </button>
                </div>

                {/* =============================
                      EDUCATION
                ============================== */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
                        <FiBook /> Education
                    </h2>

                    {education.map((e) => (
                        <div
                            key={e.id}
                            className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3"
                        >
                            <input
                                className="border px-3 py-2 rounded-lg"
                                placeholder="School / University"
                                value={e.school}
                                onChange={(x) =>
                                    setEducation((prev) =>
                                        prev.map((item) =>
                                            item.id === e.id
                                                ? {
                                                      ...item,
                                                      school: x.target.value,
                                                  }
                                                : item
                                        )
                                    )
                                }
                            />
                            <input
                                className="border px-3 py-2 rounded-lg"
                                placeholder="Degree"
                                value={e.degree}
                                onChange={(x) =>
                                    setEducation((prev) =>
                                        prev.map((item) =>
                                            item.id === e.id
                                                ? {
                                                      ...item,
                                                      degree: x.target.value,
                                                  }
                                                : item
                                        )
                                    )
                                }
                            />
                            <input
                                className="border px-3 py-2 rounded-lg"
                                placeholder="Year"
                                value={e.year}
                                onChange={(x) =>
                                    setEducation((prev) =>
                                        prev.map((item) =>
                                            item.id === e.id
                                                ? {
                                                      ...item,
                                                      year: x.target.value,
                                                  }
                                                : item
                                        )
                                    )
                                }
                            />
                        </div>
                    ))}

                    <button
                        className="text-blue-600 flex items-center gap-2 mt-2"
                        onClick={addEducation}
                    >
                        + Add Education
                    </button>
                </div>

                {/* =============================
                    EXPERIENCE
                ============================== */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
                        <FiBriefcase /> Work Experience
                    </h2>

                    {experience.map((ex) => (
                        <div
                            key={ex.id}
                            className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3"
                        >
                            <input
                                className="border px-3 py-2 rounded-lg"
                                placeholder="Company / Place"
                                value={ex.place}
                                onChange={(x) =>
                                    setExperience((prev) =>
                                        prev.map((item) =>
                                            item.id === ex.id
                                                ? {
                                                      ...item,
                                                      place: x.target.value,
                                                  }
                                                : item
                                        )
                                    )
                                }
                            />

                            <input
                                className="border px-3 py-2 rounded-lg"
                                placeholder="Role / Position"
                                value={ex.role}
                                onChange={(x) =>
                                    setExperience((prev) =>
                                        prev.map((item) =>
                                            item.id === ex.id
                                                ? {
                                                      ...item,
                                                      role: x.target.value,
                                                  }
                                                : item
                                        )
                                    )
                                }
                            />

                            <input
                                className="border px-3 py-2 rounded-lg"
                                placeholder="Years (ex: 2020 - 2023)"
                                value={ex.year}
                                onChange={(x) =>
                                    setExperience((prev) =>
                                        prev.map((item) =>
                                            item.id === ex.id
                                                ? {
                                                      ...item,
                                                      year: x.target.value,
                                                  }
                                                : item
                                        )
                                    )
                                }
                            />
                        </div>
                    ))}

                    <button
                        className="text-blue-600 flex items-center gap-2 mt-2"
                        onClick={addExperience}
                    >
                        + Add Experience
                    </button>
                </div>

                {/* =============================
                      SKILLS
                ============================== */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3">
                        Skills
                    </h2>

                    {skills.map((skill, i) => (
                        <input
                            key={i}
                            className="border px-3 py-2 rounded-lg w-full mb-3"
                            value={skill}
                            placeholder="Skill name"
                            onChange={(e) => {
                                const newSkills = [...skills];
                                newSkills[i] = e.target.value;
                                setSkills(newSkills);
                            }}
                        />
                    ))}

                    <button
                        className="text-blue-600 flex items-center gap-2 mt-2"
                        onClick={addSkill}
                    >
                        + Add Skill
                    </button>
                </div>

                {/* =============================
                    SOCIAL LINKS
                ============================== */}
                <div className="bg-white rounded-xl shadow p-6 mb-10">
                    <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3 flex items-center gap-2">
                        <FiLink /> Social Links
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            className="border px-3 py-2 rounded-lg"
                            placeholder="LinkedIn URL"
                            value={links.linkedin}
                            onChange={(e) =>
                                updateLink("linkedin", e.target.value)
                            }
                        />
                        <input
                            className="border px-3 py-2 rounded-lg"
                            placeholder="GitHub URL"
                            value={links.github}
                            onChange={(e) =>
                                updateLink("github", e.target.value)
                            }
                        />
                        <input
                            className="border px-3 py-2 rounded-lg"
                            placeholder="Website / Portfolio"
                            value={links.website}
                            onChange={(e) =>
                                updateLink("website", e.target.value)
                            }
                        />
                    </div>
                </div>

                {/* =============================
                    CHANGE PASSWORD
                ============================== */}
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-lg font-semibold mb-4 border-l-4 border-blue-600 pl-3">
                        Change Password
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="password"
                            placeholder="Current Password"
                            className="border px-3 py-2 rounded-lg"
                            value={passwords.current}
                            onChange={(e) =>
                                updatePassword("current", e.target.value)
                            }
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            className="border px-3 py-2 rounded-lg"
                            value={passwords.newPass}
                            onChange={(e) =>
                                updatePassword("newPass", e.target.value)
                            }
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="border px-3 py-2 rounded-lg"
                            value={passwords.confirm}
                            onChange={(e) =>
                                updatePassword("confirm", e.target.value)
                            }
                        />
                    </div>

                    <button className="mt-5 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                        Update Password
                    </button>
                </div>
            </div>
        </InstructorLayout>
    );
}
