import { useEffect, useState } from "react";
import SidebarStudent from "../Components/SidebarStudent";
import TopbarStudent from "../Components/TopbarStudent";
import LogoutModal from "../Components/LogoutModal";

export default function StudentLayout({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const [user, setUser] = useState(null);
    const [openLogout, setOpenLogout] = useState(false); // 🔥 modal logout utama

    // HANDLE USER DATA
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) return <div className="p-5">Loading...</div>;

    return (
        <div className="flex bg-[#F3F4F6] min-h-screen relative">
            {/* SIDEBAR */}
            <SidebarStudent
                isOpen={isOpen}
                toggle={() => setIsOpen(!isOpen)}
                setOpenLogout={setOpenLogout} // 🔥 ini penting
            />

            {/* MAIN CONTENT */}
            <div
                className={`
                    mt-6
                    flex-1 transition-all duration-300 pr-6
                    ${isOpen ? "md:ml-[19rem]" : "md:ml-[7rem]"}
                    ml-0
                `}
            >
                <TopbarStudent
                    user={user}
                    toggleSidebar={() => setIsOpen(!isOpen)}
                    setOpenLogout={setOpenLogout} // 🔥 Topbar juga pakai modal yang sama
                />

                <div className="pt-6">{children}</div>
            </div>

            {/* LOGOUT MODAL (SATU-SATUNYA) */}
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
