import { useEffect, useState } from "react";
import SidebarStudent from "../Components/SidebarStudent";
import TopbarStudent from "../Components/TopbarStudent";
import LogoutModal from "../Components/LogoutModal"; // <-- pastikan import
import React from "react";

export default function StudentLayout({ children }) {
    const [isOpen, setIsOpen] = useState(() => {
        const stored = localStorage.getItem("sidebarOpen");
        return stored === null ? true : stored === "true";
    });

    const [user, setUser] = useState(null);
    const [openLogout, setOpenLogout] = useState(false); // <-- GLOBAL LOGOUT MODAL CONTROL

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            const parsed = JSON.parse(stored);

            if (!parsed.avatar) {
                parsed.avatar = "/images/avatar.png";
            }

            setUser(parsed);
        }
    }, []);

    const toggleSidebar = () => {
        const newState = !isOpen;
        setIsOpen(newState);

        if (window.innerWidth >= 1024) {
            localStorage.setItem("sidebarOpen", newState);
        }

        if (window.innerWidth < 1024) {
            if (newState) document.body.classList.add("sidebar-open");
            else document.body.classList.remove("sidebar-open");
        }
    };

    if (!user) return <div className="p-6">Loading...</div>;

    return (
        <div className="flex bg-[#F3F4F6] min-h-screen overflow-x-hidden">
            {/* SIDEBAR */}
            <SidebarStudent
                isOpen={isOpen}
                toggle={toggleSidebar}
                setOpenLogout={setOpenLogout} // <-- kirim ke sidebar
            />

            {/* DESKTOP CONTENT */}
            <div
                className={`
                    flex-1 transition-all duration-300
                    hidden lg:block
                    ${isOpen ? "ml-[19rem]" : "ml-[7rem]"}
                    lg:pr-6
                `}
            >
                <TopbarStudent user={user} />

                <div className="pt-6 px-4 lg:px-0">
                    {React.Children.map(children, (child) =>
                        React.isValidElement(child)
                            ? React.cloneElement(child, { user })
                            : child
                    )}
                </div>
            </div>

            {/* MOBILE CONTENT */}
            <div className="flex-1 lg:hidden">
                <TopbarStudent user={user} />

                <div className="pt-6 px-4">
                    {React.Children.map(children, (child) =>
                        React.isValidElement(child)
                            ? React.cloneElement(child, { user })
                            : child
                    )}
                </div>
            </div>

            {/* ⛔ INI POSISI YANG BENAR */}
            {/* ============================== */}
            {/*      LOGOUT MODAL DI TENGAH    */}
            {/* ============================== */}
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
