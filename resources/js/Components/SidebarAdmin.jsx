import { NavLink } from "react-router-dom";
import {
    FiChevronLeft,
    FiChevronRight,
    FiHome,
    FiUsers,
    FiBook,
    FiAward,
    FiBarChart2,
    FiSettings,
    FiHelpCircle,
    FiBell,
    FiCreditCard,
    FiLayers,
} from "react-icons/fi";
import LogoutModal from "./LogoutModal";
import { useState } from "react";

export default function SidebarAdmin({ isOpen, toggle }) {
    const menu = [
        { name: "Dashboard", icon: <FiHome size={18} />, path: "/dashboard" },
        { name: "Users", icon: <FiUsers size={18} />, path: "/admin/users" },
        { name: "Classes", icon: <FiBook size={18} />, path: "/admin/classes" },
        {
            name: "Certificates",
            icon: <FiAward size={18} />,
            path: "/admin/certificates",
        },
        {
            name: "Reports",
            icon: <FiBarChart2 size={18} />,
            path: "/admin/reports",
        },
        { name: "Role", icon: <FiLayers size={18} />, path: "/admin/role" },
        {
            name: "Payments",
            icon: <FiCreditCard size={18} />,
            path: "/admin/payments",
        },
        {
            name: "Notification",
            icon: <FiBell size={18} />,
            path: "/admin/notification",
        },
        { name: "Help", icon: <FiHelpCircle size={18} />, path: "/admin/help" },
        {
            name: "Settings",
            icon: <FiSettings size={18} />,
            path: "/admin/settings",
        },
    ];
    const [openLogout, setOpenLogout] = useState(false);

    return (
        <div
            className={`
                fixed top-6 left-6
                h-[calc(100vh-3rem)]
                bg-[#161616]
                rounded-2xl shadow-lg
                p-5 flex flex-col
                transition-all duration-300
                ${isOpen ? "w-64" : "w-20"}
            `}
        >
            {/* TOGGLE BUTTON */}
            <button
                onClick={toggle}
                className="
                    absolute -right-4 top-6 w-9 h-9
                    bg-blue-600 rounded-full shadow-md
                    flex items-center justify-center text-white
                    hover:bg-blue-700 transition
                "
            >
                {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
            </button>

            {/* LOGO */}
            <div className="flex items-center gap-3 mb-10 px-2">
                <img src="/images/logo.png" className="w-10" />
                {isOpen && (
                    <h1 className="text-xl font-bold tracking-wide text-white">
                        DevCourse
                    </h1>
                )}
            </div>

            {/* MENU LIST */}
            <nav className="flex flex-col gap-2 mt-5">
                {menu.map((item, i) => (
                    <NavLink
                        key={i}
                        to={item.path}
                        className={({ isActive }) =>
                            `
                                flex items-center gap-3
                                px-4 py-3 rounded-xl cursor-pointer text-sm
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

            {/* SPACER */}
            <div className="mt-auto"></div>

            {/* LOGOUT BUTTON */}
            <button
                onClick={() => setOpenLogout(true)}
                className="
        flex items-center gap-3
        px-4 py-3
        rounded-xl text-sm
        text-red-400
        hover:bg-red-500/10
        transition-all
    "
            >
                <FiChevronRight className="rotate-180" size={18} />
                {isOpen && <span>Logout</span>}
            </button>

            <LogoutModal
                open={openLogout}
                onClose={() => setOpenLogout(false)}
                onConfirm={() => {
                    setOpenLogout(false);
                    // lakukan logout
                    localStorage.clear(); // optional
                    window.location.href = "/login";
                }}
            />
        </div>
    );
}
