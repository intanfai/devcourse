import { useEffect, useState } from "react";
import SidebarStudent from "../Components/SidebarStudent";
import TopbarStudent from "../Components/TopbarStudent";

export default function StudentLayout({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
    }, []);

    if (!user) return <div className="p-6">Loading...</div>;

    return (
        <div className="flex bg-[#F3F4F6] min-h-screen">

            {/* SIDEBAR */}
            <SidebarStudent isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

            {/* MAIN AREA */}
            <div
                className={`
                    flex-1 transition-all duration-300 pr-6
                    ${isOpen ? "ml-[19rem]" : "ml-[7rem]"}
                `}
            >
                {/* TOPBAR */}
                <TopbarStudent user={user} />

                {/* CONTENT */}
                <div className="pt-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
