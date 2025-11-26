import { useEffect, useState } from "react";

export default function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token) {
            window.location.href = "/login";
            return;
        }

        // Simpan data user
        setUser({
            role: role,
        });

    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold">
                Welcome to Dashboard ({user.role})
            </h1>

            {/* contoh tampilan role admin */}
            {user.role === "admin" && (
                <div className="mt-4 p-4 border rounded-lg">
                    <p className="text-lg font-semibold text-blue-600">Admin Panel</p>
                    <p>Kelola user, kursus, dan instructor.</p>
                </div>
            )}

            {/* contoh student */}
            {user.role === "student" && (
                <div className="mt-4 p-4 border rounded-lg">
                    <p className="text-lg font-semibold text-green-600">Student Area</p>
                    <p>Lihat course yang sedang kamu ambil.</p>
                </div>
            )}

            {/* instructor */}
            {user.role === "instructor" && (
                <div className="mt-4 p-4 border rounded-lg">
                    <p className="text-lg font-semibold text-purple-600">Instructor Tools</p>
                    <p>Buat course, upload materi, kelola peserta.</p>
                </div>
            )}
        </div>
    );
}
