import React, { useEffect, useState } from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { MdPayments } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoMdHelpCircle } from "react-icons/io";

export default function Topbar() {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [userMenu, setUserMenu] = useState(false);

    const toggleMenu = () => setUserMenu(!userMenu);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();

            setTime(
                now.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );

            setDate(
                now.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="
            w-full bg-white shadow-sm rounded-xl 
            px-6 py-2 mb-4 
            flex items-center justify-between
        ">
            {/* SEARCH BAR */}
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg w-[350px]">
                <FiSearch className="text-gray-500 text-lg" />
                <input
                    type="text"
                    placeholder="Search something..."
                    className="bg-transparent ml-2 outline-none w-full"
                />
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-8">

                {/* TIME + DATE */}
                <div className="text-right leading-tight">
                    <p className="text-sm font-semibold">{time}</p>
                    <p className="text-xs text-gray-500">{date}</p>
                </div>

                {/* NOTIFICATION */}
                <button className="relative text-gray-600 hover:text-gray-800">
                    <FiBell className="text-[22px]" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white 
                        text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                        3
                    </span>
                </button>

                {/* USER MENU */}
                <div className="relative">
                    <button
                        onClick={toggleMenu}
                        className="flex items-center gap-3 bg-gray-100 py-2 px-3 rounded-lg hover:bg-gray-200 transition"
                    >
                        <img
                            src="https://i.pravatar.cc/50"
                            className="w-9 h-9 rounded-full object-cover"
                        />
                        <div className="leading-tight">
                            <p className="text-sm font-semibold">Admin</p>
                            <p className="text-xs text-gray-500 -mt-1">Super Admin</p>
                        </div>
                    </button>

                    {/* DROPDOWN */}
                    {userMenu && (
                        <div className="
                            absolute right-0 mt-2 bg-white shadow-xl rounded-xl 
                            py-2 z-50 w-[180px] animate-fadeIn
                        ">
                            <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 w-full">
                                <i className="fa-regular fa-user"></i> Profile
                            </button>

                            <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 w-full">
                                <i className="fa-solid fa-gear"></i> Settings
                            </button>

                            <button className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 w-full text-red-500">
                                <i className="fa-solid fa-right-from-bracket"></i> Logout
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
