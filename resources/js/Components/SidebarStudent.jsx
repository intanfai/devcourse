import { NavLink } from "react-router-dom";
import {
    FiChevronLeft,
    FiChevronRight,
    FiHome,
    FiBook,
    FiAward,
    FiBell,
    FiSettings,
    FiUser,
    FiLogOut,
} from "react-icons/fi";
import { useState } from "react";
import LogoutModal from "./LogoutModal";

export default function SidebarStudent({ isOpen, toggle }) {
    const [openLogout, setOpenLogout] = useState(false);

    const menu = [
        {
            name: "Dashboard",
            icon: <FiHome size={18} />,
            path: "/student/dashboard",
        },
        {
            name: "Explore Courses",
            icon: <FiBook size={18} />,
            path: "/student/explore",
        },
        {
            name: "My Courses",
            icon: <FiBook size={18} />,
            path: "/student/courses",
        },
        {
            name: "Certificates",
            icon: <FiAward size={18} />,
            path: "/student/certificates",
        },
        {
            name: "Notifications",
            icon: <FiBell size={18} />,
            path: "/student/notifications",
        },
        {
            name: "Profile",
            icon: <FiUser size={18} />,
            path: "/student/profile",
        },
        {
            name: "Settings",
            icon: <FiSettings size={18} />,
            path: "/student/settings",
        },
    ];

    return (
        <div
            className={`
                student-sidebar
                fixed top-6 left-6
                h-[calc(100vh-3rem)]
                bg-[#161616] text-white
                rounded-2xl shadow-lg p-5
                flex flex-col
                transition-all duration-300
                z-50

                /* Desktop behaviour */
                ${isOpen ? "w-64" : "w-20 items-center"}

                /* Mobile drawer */
                lg:translate-x-0
                ${
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full lg:translate-x-0"
                }
            `}
        >
            {/* TOGGLE BUTTON */}
            <button
                onClick={toggle}
                className="
                    absolute -right-4 top-6 w-9 h-9
                    bg-blue-600 rounded-full shadow-md
                    flex items-center justify-center
                    text-white hover:bg-blue-700
                    z-50
                "
            >
                {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
            </button>

            {/* LOGO */}
            <div
                className={`
                    flex items-center gap-3 mb-10 w-full
                    ${isOpen ? "justify-start px-2" : "justify-center px-0"}
                `}
            >
                <img src="/images/logo.png" className="w-10" />
                {isOpen && (
                    <h1 className="text-xl font-bold tracking-wide">
                        DevCourse
                    </h1>
                )}
            </div>

            {/* MENU */}
            <nav className="flex flex-col gap-2 mt-5 w-full">
                {menu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `
                                flex items-center
                                ${isOpen ? "gap-3 px-4" : "justify-center px-0"}
                                py-3 rounded-xl text-sm
                                transition-all
                                ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "text-gray-300 hover:bg-[#1F1F1F]"
                                }
                            `
                        }
                    >
                        {item.icon}
                        {isOpen && <span>{item.name}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* LOGOUT */}
            <div className="mt-auto w-full">
                <button
                    onClick={() => setOpenLogout(true)}
                    className={`
                        flex items-center
                        ${isOpen ? "gap-3 px-4" : "justify-center px-0"}
                        w-full py-3 rounded-xl text-sm
                        text-red-400 hover:bg-red-500/20 transition-all
                    `}
                >
                    <FiLogOut size={18} />
                    {isOpen && <span>Logout</span>}
                </button>
            </div>

            <LogoutModal
                open={openLogout}
                onClose={() => setOpenLogout(false)}
                onConfirm={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                }}
            />
        </div>
    );
}
