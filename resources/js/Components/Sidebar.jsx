import { NavLink } from "react-router-dom";
import React from "react";
import { FaTachometerAlt, FaUsers, FaBook, FaCertificate, FaMoneyBill, FaBell, FaCog } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdHelpCircle } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";


export default function Sidebar() {
    const menu = [
        { icon: <FaTachometerAlt />, label: "Dashboard", path: "/" },
        { icon: <FaUsers />, label: "Users", path: "/users" },
        { icon: <FaBook />, label: "Classes", path: "/classes" },
        { icon: <FaCertificate />, label: "Certificates", path: "/certificates" },
        { icon: <MdPayments />, label: "Payments", path: "/payments" },
        { icon: <FaBell />, label: "Notifications", path: "/notifications" },
        { icon: <HiOutlineDocumentReport />, label: "Reports", path: "/reports" },
        { icon: <IoMdHelpCircle />, label: "Help", path: "/help" },
        { icon: <FaCog />, label: "Settings", path: "/settings" },
    ];

    return (
        <div className="w-64 fixed top-0 left-0 h-full bg-[#161616] text-white p-6 shadow-lg">
            <h1 className="text-2xl font-bold mb-10">DevCourse</h1>

            <ul className="space-y-4">
                {menu.map((item, i) => (
                    <li key={i}>
                        <NavLink
                        key={i}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg cursor-pointer transition 
                            ${isActive
                                ? "bg-[#3C64EF] text-white"
                                : "text-gray-300 hover:bg-[#3C64EF] hover:text-white"
                            }`
                        }
                    >
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-sm font-medium">{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}
