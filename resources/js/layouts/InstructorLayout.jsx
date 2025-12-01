import { useEffect, useState } from "react";
import SidebarInstructor from "../Components/SidebarInstructor";
import TopbarInstructor from "../Components/TopbarInstructor";

export default function InstructorLayout({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) return <div className="p-5">Loading...</div>;

    return (
        <div className="flex bg-[#F3F4F6] min-h-screen">
            {/* SIDEBAR */}
            <SidebarInstructor
                isOpen={isOpen}
                toggle={() => setIsOpen(!isOpen)}
            />

            {/* MAIN CONTENT */}
            <div
                className={`
                    flex-1
                    transition-all duration-300
                    pr-6
                    ${isOpen ? "ml-[19rem]" : "ml-[7rem]"}
                `}
            >
                {/* TOPBAR */}
                <TopbarInstructor user={user} />

                {/* CONTENT */}
                <div className="pt-6">{children}</div>
            </div>
        </div>
    );
}
