import { useEffect, useState } from "react";
import SidebarAdmin from "../Components/SidebarAdmin";
import TopbarAdmin from "../Components/TopbarAdmin";

export default function AdminLayout({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const [user, setUser] = useState(null); // ❗ WAJIB ADA

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) return <div className="p-5">Loading...</div>;

    return (
        <div className="flex">
            {/* Sidebar */}
            <SidebarAdmin isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

            {/* Main Content */}
            <div
                className={`flex-1 bg-[#F5F7FB] min-h-screen transition-all duration-300 
                ${isOpen ? "ml-64" : "ml-20"}`}
            >
                <TopbarAdmin user={user} />

                <div className="p-8">{children}</div>
            </div>
        </div>
    );
}
