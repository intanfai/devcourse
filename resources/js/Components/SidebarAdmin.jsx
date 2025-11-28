import {
    HiOutlineHome,
    HiOutlineUsers,
    HiOutlineBookOpen,
    HiOutlineCog,
} from "react-icons/hi";
import { MdOutlinePayment, MdOutlineManageAccounts } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";

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
    FiFileText,
    FiDollarSign,
} from "react-icons/fi";

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

    return (
        <div
            className={`bg-[#0D0D0D] text-white h-screen p-5 rounded-r-3xl fixed top-0 left-0 
            transition-all duration-300 flex flex-col
            ${isOpen ? "w-64" : "w-20"}`}
        >
            {/* Toggle Button */}
            <button
                onClick={toggle}
                className="absolute -right-3 top-10 bg-[#3C64EF] w-7 h-7 flex items-center justify-center
                rounded-full text-white shadow hover:bg-blue-700 transition"
            >
                <FiChevronLeft
                    className={`transition-transform duration-300 
                    ${isOpen ? "" : "rotate-180"}`}
                />
            </button>

            {/* LOGO */}
            <div className="flex items-center gap-3 mb-10 px-2">
                <img src="/images/logo.png" className="w-10" />
                {isOpen && (
                    <h1 className="text-xl font-bold whitespace-nowrap">
                        DevCourse
                    </h1>
                )}
            </div>

            {/* MENU */}
            {/* MENU LIST */}
            <nav className="flex flex-col gap-2 mt-5">
                {menu.map((item, i) => (
                    <NavLink
                        key={i}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center justify-between px-4 py-3 rounded-lg text-sm transition
                            ${
                                isActive
                                    ? "bg-[#3C64EF] text-white hover:bg-blue-700 "
                                    : "text-gray-300 hover:bg-[#1A1A1A]"
                            }`
                        }
                    >
                        {/* LEFT ICON + TEXT */}
                        <div className="flex items-center gap-3">
                            {item.icon}
                            {isOpen && <span>{item.name}</span>}
                        </div>

                        {/* ARROW */}
                        {isOpen && <span className="text-gray-400">{">"}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className="mt-auto"></div>
        </div>
    );
}
