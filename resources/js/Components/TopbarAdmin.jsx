import { HiOutlineBell, HiOutlineSearch } from "react-icons/hi";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import LogoutModal from "./LogoutModal";

export default function AdminTopbar({ user }) {
    const location = useLocation();
    const path = location.pathname;

    const [showNoti, setShowNoti] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [openLogout, setOpenLogout] = useState(false);

    // AUTO TITLE
    const formatTitle = (t) =>
        t.charAt(0).toUpperCase() + t.slice(1).toLowerCase();

    const pageTitle = (() => {
        const segments = path.split("/").filter(Boolean);
        const filtered = segments.filter((s) => s !== "admin");

        if (filtered.length === 0) return "Dashboard";

        const title = filtered[0];

        const customTitles = {
            users: "Users",
            classes: "Classes",
            reports: "Reports",
            payments: "Payments",
            role: "Role Management",
            notification: "Notifications",
            settings: "Settings",
            help: "Help Center",
            certificates: "Certificates",
        };

        return customTitles[title] || formatTitle(title);
    })();

    return (
        <header
            className="
                ml-39
                mt-6
                bg-[#161616]
                rounded-xl
                shadow-md
                px-8
                h-20
                flex items-center justify-between
                relative
            "
        >
            {/* LEFT — TITLE */}
            <h2 className="text-white font-semibold text-lg">{pageTitle}</h2>

            {/* CENTER — SEARCH */}
            <div className="flex items-center bg-[#2B2B2B] px-4 py-3 rounded-xl w-[350px]">
                <HiOutlineSearch className="text-gray-300 text-xl" />
                <input
                    type="text"
                    placeholder="Search Menu..."
                    className="ml-3 bg-transparent outline-none text-sm text-gray-200 w-full"
                />
            </div>

            {/* RIGHT — NOTIFICATION + PROFILE */}
            <div className="flex items-center gap-8 relative">
                {/* NOTIFICATION */}
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
                                        1 New User Registered
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        5 minutes ago
                                    </p>
                                </div>

                                <div className="p-3 bg-gray-100 rounded-lg">
                                    <p className="font-medium">
                                        Payment Received
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Invoice #2334
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* PROFILE DROPDOWN BUTTON */}
                <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => {
                        setShowProfile(!showProfile);
                        setShowNoti(false);
                    }}
                >
                    <img
                        src="/images/avatar.png"
                        className="w-10 h-10 rounded-full border"
                    />
                    <div className="leading-tight">
                        <p className="text-white font-semibold text-sm">
                            {user?.name}
                        </p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
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

                        <a
                            href="/admin/settings"
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

            {/* LOGOUT MODAL */}
            <LogoutModal
                open={openLogout}
                onClose={() => setOpenLogout(false)}
                onConfirm={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                }}
            />
        </header>
    );
}
