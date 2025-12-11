import { useEffect, useState } from "react";
import SidebarAdmin from "../Components/SidebarAdmin";
import TopbarAdmin from "../Components/TopbarAdmin";
import LogoutModal from "../Components/LogoutModal";

export default function AdminLayout({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const [user, setUser] = useState(null);

    // 🔥 WAJIB: STATE LOGOUT
    const [openLogout, setOpenLogout] = useState(false);

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
            <SidebarAdmin
                isOpen={isOpen}
                toggle={() => setIsOpen(!isOpen)}
                setOpenLogout={setOpenLogout} // 🔥 kirim ke sidebar
            />

            {/* MAIN CONTENT AREA */}
            <div
                className={`
                    flex-1 transition-all duration-300 pr-6
                    ${isOpen ? "ml-[19rem]" : "ml-[7rem]"}
                `}
            >
                {/* TOPBAR */}
                <TopbarAdmin user={user} />

                {/* PAGE CONTENT */}
                <div className="pt-6">{children}</div>
            </div>

            {/* 🔥 MODAL LOGOUT */}
            <LogoutModal
                open={openLogout}
                onClose={() => setOpenLogout(false)}
                onConfirm={() => {
                    localStorage.clear();
                    window.location.href = "/login";
                }}
            />
        </div>
    );
}
