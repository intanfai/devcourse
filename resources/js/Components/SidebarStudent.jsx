import {
    FiChevronLeft,
    FiChevronRight,
    FiHome,
    FiCompass,
    FiBook,
    FiAward,
    FiBell,
    FiUser,
    FiSettings,
    FiLogOut,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function SidebarStudent({ isOpen, toggle, setOpenLogout }) {
    const menu = [
        {
            name: "Dashboard",
            icon: <FiHome size={18} />,
            path: "/student/dashboard",
        },
        {
            name: "Explore Courses",
            icon: <FiCompass size={18} />,
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
                fixed top-6 left-6
                h-[calc(100vh-3rem)]
                bg-[#161616] text-white
                rounded-2xl shadow-lg p-5
                flex flex-col
                transition-all duration-300
                z-50
                ${isOpen ? "w-64" : "w-20"}
            `}
        >
            {/* Toggle Sidebar */}
            <button
                onClick={toggle}
                className="
                    absolute -right-4 top-6
                    w-9 h-9 bg-blue-600 rounded-full shadow-md
                    flex items-center justify-center text-white
                    hover:bg-blue-700 transition
                "
            >
                {isOpen ? <FiChevronLeft /> : <FiChevronRight />}
            </button>

            {/* LOGO */}
            <div
                className={`
                    flex items-center mb-10 
                    ${isOpen ? "justify-start gap-3 px-2" : "justify-center"}
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
            <nav className="flex flex-col gap-2 mt-5">
                {menu.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `
                            flex items-center gap-3
                            px-4 py-3 rounded-xl text-sm cursor-pointer
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
