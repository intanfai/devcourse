import { NavLink } from "react-router-dom";
import {
    FiChevronLeft,
    FiChevronRight,
    FiHome,
    FiBook,
    FiUsers,
    FiDollarSign,
    FiBell,
    FiSettings,
    FiPlusCircle,
    FiUser,
    FiLogOut,
} from "react-icons/fi";
import LogoutModal from "./LogoutModal";
import { useState } from "react";

export default function SidebarInstructor({ isOpen, toggle, setOpenLogout }) {

    const menu = [
        { name: "Dashboard", icon: <FiHome size={18} />, path: "/instructor/dashboard" },
        { name: "My Classes", icon: <FiBook size={18} />, path: "/instructor/classes" },
        { name: "Create Class", icon: <FiPlusCircle size={18} />, path: "/instructor/classes/create" },
        { name: "Students", icon: <FiUsers size={18} />, path: "/instructor/students" },
        { name: "Earnings", icon: <FiDollarSign size={18} />, path: "/instructor/earnings" },
        { name: "Notifications", icon: <FiBell size={18} />, path: "/instructor/notifications" },
        { name: "Profile", icon: <FiUser size={18} />, path: "/instructor/profile" },
        { name: "Settings", icon: <FiSettings size={18} />, path: "/instructor/settings" },
    ];

    return (
        <div
            className={`
                fixed top-6 left-6
                h-[calc(100vh-3rem)]
                bg-[#161616] text-white
                rounded-2xl shadow-lg p-5
                flex flex-col
                transition-all duration-300
                ${isOpen ? "w-64" : "w-20"}
            `}
        >
            {/* Toggle */}
            <button
                onClick={toggle}
                className="absolute -right-4 top-6 w-9 h-9 bg-blue-600 rounded-full 
                shadow-md flex items-center justify-center text-white hover:bg-blue-700"
            >
                {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3 mb-10 px-2">
                <img src="/images/logo.png" className="w-10" />
                {isOpen && <h1 className="text-xl font-bold tracking-wide">DevCourse</h1>}
            </div>

            {/* Menu */}
            <nav className="flex flex-col gap-2 mt-5">
                {menu.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end
                        className={({ isActive }) =>
                            `
                            flex items-center gap-3
                            px-4 py-3 rounded-xl cursor-pointer text-sm transition-all
                            ${
                                isActive
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "text-gray-300 hover:bg-[#1F1F1F]"
                            }
                            `
                        }
                    >
                        <div className="flex items-center gap-3">
                            {item.icon}
                            {isOpen && <span>{item.name}</span>}
                        </div>
                    </NavLink>
                ))}
            </nav>

            {/* Logout button */}
            <div className="mt-auto px-2">
                <button
                    className="
                        flex items-center gap-3 w-full 
                        px-4 py-3 rounded-xl text-sm
                        text-red-400 hover:bg-red-500/20
                        transition-all
                    "
                    onClick={() => setOpenLogout(true)}
                >
                    <FiLogOut size={18} />
                    {isOpen && <span>Logout</span>}
                </button>
            </div>
        </div>
    );
}

