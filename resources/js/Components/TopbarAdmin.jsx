import { FiHome } from "react-icons/fi";
import { HiOutlineBell, HiOutlineSearch } from "react-icons/hi";
import { useLocation } from "react-router-dom";

export default function AdminTopbar({ user }) {

    const location = useLocation();
    const path = location.pathname;

    // 🧠 Function to format title
    const formatTitle = (text) =>
        text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

    // 🧠 AUTO TITLE GENERATOR
    const pageTitle = (() => {
        const segments = path.split("/").filter(Boolean);

        // Example: ["admin", "users"]
        // Remove "admin" because it's not part of the title
        const filtered = segments.filter((s) => s !== "admin");

        if (filtered.length === 0) return "Dashboard";

        // Ambil segmen pertama untuk title utama
        const title = filtered[0];

        // Customize (optional)
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
            "
        >

            {/* LEFT — TITLE */}
            <div className="flex items-center gap-4">
                <h2 className="text-white font-semibold text-lg">
                    {pageTitle}
                </h2>
            </div>

            {/* CENTER — SEARCH BAR */}
            <div className="flex items-center bg-[#2B2B2B] px-4 py-3 rounded-xl w-[350px]">
                <HiOutlineSearch className="text-gray-300 text-xl" />
                <input
                    type="text"
                    placeholder="Search Menu..."
                    className="ml-3 bg-transparent outline-none text-sm text-gray-200 w-full"
                />
            </div>

            {/* RIGHT — NOTIFICATION + PROFILE */}
            <div className="flex items-center gap-8">

                {/* Bell */}
                <div className="relative cursor-pointer group">
                    <HiOutlineBell className="text-3xl text-gray-200 group-hover:text-white transition" />
                    <span className="absolute -top-1 -right-1 bg-[#3C64EF] text-white text-[10px] rounded-full px-1.5 py-0.5">
                        3
                    </span>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3">
                    <img
                        src="/images/avatar.png"
                        className="w-10 h-10 rounded-full border"
                    />
                    <div className="leading-tight">
                        <p className="text-white font-semibold text-sm">
                            {user?.name}
                        </p>
                        <p className="text-xs text-gray-400">
                            {user?.email}
                        </p>
                    </div>
                </div>

            </div>
        </header>
    );
}
