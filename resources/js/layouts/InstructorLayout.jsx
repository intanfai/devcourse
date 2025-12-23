import { useEffect, useState } from "react";
import SidebarInstructor from "../Components/SidebarInstructor";
import TopbarInstructor from "../Components/TopbarInstructor";
import LogoutModal from "../Components/LogoutModal";

export default function InstructorLayout({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    const [user, setUser] = useState(null);
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
            <SidebarInstructor
                isOpen={isOpen}
                toggle={() => setIsOpen(!isOpen)}
                setOpenLogout={setOpenLogout}   // ← KIRIM KE SIDEBAR
            />

            <div
                className={`
                    flex-1
                    transition-all duration-300
                    pr-6
                    ${isOpen ? "ml-[19rem]" : "ml-[7rem]"}
                `}
            >
                <TopbarInstructor user={user} />

                <div className="pt-6">{children}</div>
            </div>

            {/* Logout Modal ini YANG DIPAKAI */}
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

