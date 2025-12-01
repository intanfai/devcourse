import { HiOutlineBell, HiOutlineSearch } from "react-icons/hi";
import { useLocation } from "react-router-dom";

export default function TopbarInstructor({ user }) {
    const location = useLocation();
    const path = location.pathname;

    const formatTitle = (text) =>
        text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

    // 🔵 AUTO TITLE GENERATOR (khusus instructor)
    const pageTitle = (() => {
        const segments = path.split("/").filter(Boolean);

        // Example: ["instructor", "classes"]
        const filtered = segments.filter((s) => s !== "instructor");

        if (filtered.length === 0) return "Dashboard";

        const title = filtered[0];

        const customTitles = {
            dashboard: "Dashboard",
            classes: "My Classes",
            students: "Students",
            earnings: "Earnings",
            settings: "Settings",
            profile: "Profile",
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
            {/* LEFT TITLE */}
            <div className="flex items-center gap-4">
                <h2 className="text-white font-semibold text-lg">
                    {pageTitle}
                </h2>
            </div>

            {/* SEARCH BAR */}
            <div className="flex items-center bg-[#2B2B2B] px-4 py-3 rounded-xl w-[350px]">
                <HiOutlineSearch className="text-gray-300 text-xl" />
                <input
                    type="text"
                    placeholder="Search Menu..."
                    className="ml-3 bg-transparent outline-none text-sm text-gray-200 w-full"
                />
            </div>

            {/* RIGHT SECTION */}
            <div className="flex items-center gap-8">
                {/* Bell */}
                <div className="relative cursor-pointer group">
                    <HiOutlineBell className="text-3xl text-gray-200 group-hover:text-white transition" />
                    <span className="absolute -top-1 -right-1 bg-[#3C64EF] text-white text-[10px] rounded-full px-1.5 py-0.5">
                        2
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
                        <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
