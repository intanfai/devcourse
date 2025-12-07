import { HiOutlineSearch, HiOutlineBell } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function TopbarStudent({ user, toggleSidebar, setOpenLogout }) {
    const location = useLocation();
    const path = location.pathname;

    const [showNoti, setShowNoti] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    // PAGE TITLE
    const pageTitle = (() => {
        const parts = path.split("/").filter(Boolean);
        const filtered = parts.filter((p) => p !== "student");
        if (filtered.length === 0) return "Dashboard";

        const titles = {
            dashboard: "Dashboard",
            explore: "Explore Courses",
            courses: "My Courses",
            certificates: "Certificates",
            notifications: "Notifications",
            profile: "Profile",
            settings: "Settings",
        };

        return titles[filtered[0]] || filtered[0].toUpperCase();
    })();

    return (
        <header
            className="
                bg-[#161616]
                rounded-xl shadow-md
                px-4 md:px-8
                h-20
                flex items-center justify-between
                relative
            "
        >
            {/* LEFT — MENU BUTTON + TITLE */}
            <div className="flex items-center gap-4">
                <button
                    className="lg:hidden text-white text-2xl"
                    onClick={toggleSidebar}
                >
                    ☰
                </button>

                <h2 className="text-white font-semibold text-lg md:text-xl">
                    {pageTitle}
                </h2>
            </div>

            {/* CENTER — SEARCH BAR */}
            <div className="hidden md:flex items-center bg-[#2B2B2B] px-4 py-3 rounded-xl w-[260px] lg:w-[350px]">
                <HiOutlineSearch className="text-gray-300 text-xl" />

                <input
                    type="search"
                    placeholder="Search..."
                    autoComplete="off"
                    className="ml-3 bg-transparent outline-none text-sm text-gray-200 w-full"
                    // Chrome autofill killer
                    onFocus={(e) => {
                        e.target.setAttribute("autocomplete", "off");
                        e.target.value = "";
                    }}
                />
            </div>

            {/* RIGHT — ACTIONS */}
            <div className="flex items-center gap-5 md:gap-8 relative">
                {/* SEARCH ICON MOBILE */}
                <button className="md:hidden">
                    <HiOutlineSearch className="text-3xl text-gray-200" />
                </button>

                {/* NOTIFICATIONS */}
                <div
                    className="relative cursor-pointer group"
                    onClick={() => {
                        setShowNoti(!showNoti);
                        setShowProfile(false);
                    }}
                >
                    <HiOutlineBell className="text-3xl text-gray-200 group-hover:text-white transition" />

                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] rounded-full px-1.5 py-0.5">
                        3
                    </span>

                    {showNoti && (
                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border p-4 z-50">
                            <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                                Notifications
                            </h3>

                            <div className="space-y-3 text-sm">
                                <div className="p-3 bg-gray-100 rounded-lg">
                                    <p className="font-medium">
                                        New Course Available!
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Tailwind CSS Mastery
                                    </p>
                                </div>

                                <div className="p-3 bg-gray-100 rounded-lg">
                                    <p className="font-medium">
                                        Certificate Earned
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        React Fundamentals
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* PROFILE BUTTON */}
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => {
                        setShowProfile(!showProfile);
                        setShowNoti(false);
                    }}
                >
                    <img
                        src="/images/avatar.jpg"
                        className="w-10 h-10 rounded-full border"
                    />

                    <div className="hidden md:block leading-tight">
                        <p className="text-white font-semibold text-sm">
                            {user.name}
                        </p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                </div>

                {/* PROFILE DROPDOWN */}
                {showProfile && (
                    <div className="absolute right-0 top-16 w-48 bg-white border shadow-lg rounded-xl p-3 z-50">
                        <p className="text-gray-800 font-semibold text-sm px-2">
                            {user.name}
                        </p>
                        <p className="text-xs text-gray-500 px-2 mb-2">
                            {user.email}
                        </p>
                        <hr className="my-2" />

                        <a
                            href="/student/profile"
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                            View Profile
                        </a>

                        <a
                            href="/student/settings"
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                        >
                            Settings
                        </a>

                        <button
                            onClick={() => setOpenLogout(true)}
                            className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg mt-1"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
