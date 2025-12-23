import { HiOutlineSearch, HiOutlineBell } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "./LogoutModal";

export default function TopbarInstructor({ user }) {
    const location = useLocation();
    const navigate = useNavigate();

    const path = location.pathname;

    const [showNoti, setShowNoti] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);

    const pageTitle = (() => {
        const parts = path.split("/").filter(Boolean);
        const filtered = parts.filter((p) => p !== "instructor");

        if (filtered.length === 0) return "Dashboard";

        const titles = {
            dashboard: "Dashboard",
            classes: "My Classes",
            students: "Students",
            earnings: "Earnings",
            notifications: "Notifications",
            profile: "Profile",
            settings: "Settings",
        };

        return titles[filtered[0]] || filtered[0].toUpperCase();
    })();

    return (
        <>
            <header
                className="
                ml-39 mt-6 bg-[#161616]
                rounded-xl shadow-md
                px-3 sm:px-6 md:px-8
                h-auto min-h-[70px]
                flex items-center justify-between relative
            "
            >
                {/* PAGE TITLE */}
                <h2 className="text-white font-semibold text-base sm:text-lg md:text-xl">
                    {pageTitle}
                </h2>

                {/* SEARCH BAR */}
                <div
                    className="
                        flex items-center bg-[#2B2B2B]
                        px-3 sm:px-4 py-2 sm:py-3 rounded-xl
                        w-[150px] sm:w-[250px] md:w-[350px]
                    "
                >
                    <HiOutlineSearch className="text-gray-300 text-lg sm:text-xl" />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="ml-2 bg-transparent outline-none 
                        text-xs sm:text-sm text-gray-200 w-full"
                    />
                </div>

                {/* RIGHT SIDE ICONS */}
                <div className="flex items-center gap-4 sm:gap-6 md:gap-8 relative">
                    {/* NOTIFICATION */}
                    <div
                        className="relative cursor-pointer"
                        onClick={() => {
                            setShowNoti(!showNoti);
                            setShowProfile(false);
                        }}
                    >
                        <HiOutlineBell className="text-2xl sm:text-3xl text-gray-200 hover:text-white transition" />
                        <span className="absolute -top-1 -right-1 bg-[#3C64EF] text-white text-[10px] rounded-full px-1.5">
                            2
                        </span>

                        {/* Dropdown Notification */}
                        {showNoti && (
                            <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border p-4 z-40">
                                <h3 className="font-semibold text-gray-800 mb-2 text-sm">
                                    Notifications
                                </h3>

                                <div className="space-y-3 text-sm">
                                    <div className="p-3 bg-gray-100 rounded-lg">
                                        <p className="font-medium">
                                            New Student Joined!
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Check your class updates
                                        </p>
                                    </div>

                                    <div className="p-3 bg-gray-100 rounded-lg">
                                        <p className="font-medium">
                                            Earnings Updated
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Your payout increased
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* PROFILE */}
                    <div
                        className="flex items-center gap-2 sm:gap-3 cursor-pointer"
                        onClick={() => {
                            setShowProfile(!showProfile);
                            setShowNoti(false);
                        }}
                    >
                        <img
                            src={user?.avatar || "/images/avatar.png"}
                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border"
                        />

                        <div className="hidden md:block">
                            <p className="text-white font-semibold text-sm">
                                {user?.name}
                            </p>
                            <p className="text-xs text-gray-400">
                                {user?.email}
                            </p>
                        </div>
                    </div>

                    {/* PROFILE DROPDOWN */}
                    {showProfile && (
                        <div className="absolute right-0 top-16 w-48 bg-white border shadow-lg rounded-xl p-3 z-50">
                            <p className="text-gray-800 font-semibold text-sm px-2">
                                {user?.name}
                            </p>
                            <p className="text-xs text-gray-500 px-2 mb-2">
                                {user?.email}
                            </p>

                            <hr className="my-2" />

                            <button
                                onClick={() => navigate("/instructor/profile")}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                View Profile
                            </button>

                            <button
                                onClick={() => navigate("/instructor/settings")}
                                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                            >
                                Settings
                            </button>

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

            {/* LOGOUT MODAL */}
            <LogoutModal
                open={openLogout}
                onClose={() => setOpenLogout(false)}
                onConfirm={() => {
                    localStorage.clear();
                    navigate("/login");
                }}
            />
        </>
    );
}
