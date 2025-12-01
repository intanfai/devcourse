import { useState } from "react";
import SidebarInstructor from "../Components/SidebarInstructor";        

export default function InstructorLayout({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="flex">
            <SidebarInstructor
                isOpen={isOpen}
                toggle={() => setIsOpen(!isOpen)}
            />

            {/* MAIN CONTENT */}
            <div className={`ml-${isOpen ? "72" : "24"} transition-all duration-300 w-full p-6`}>
                {children}
            </div>
        </div>
    );
}
