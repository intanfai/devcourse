import { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTelegram,
} from "react-icons/fa";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("/login", { email, password });

            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                // role bisa berupa string ('student') atau null — fallback ke role_id
                const roleName =
                    res.data.user.role ||
                    (res.data.user.role_id === 1
                        ? "admin"
                        : res.data.user.role_id === 2
                        ? "instructor"
                        : res.data.user.role_id === 3
                        ? "student"
                        : null);

                // REDIRECT SESUAI ROLE
                if (roleName === "admin") {
                    navigate("/admin/dashboard");
                } else if (roleName === "instructor") {
                    navigate("/instructor/dashboard");
                } else if (roleName === "student") {
                    navigate("/student/dashboard");
                } else {
                    // jika tidak diketahui, tetap di halaman saat ini dan tampilkan pesan
                    setError("Role pengguna tidak dikenali");
                }

                if (role === "admin") navigate("/dashboard");
                else if (role === "instructor")
                    navigate("/instructor/dashboard");
                else if (role === "student") navigate("/student/dashboard");
            } else {
                setError("Email atau password salah!");
            }
        } catch (err) {
            setError("Email atau password salah!");
        }
    };

    return (
        <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
            {/* ================= LEFT: FORM ================= */}
            <div className="flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 py-16 bg-white">
                <h2 className="text-3xl font-bold mb-2 text-gray-900">Login</h2>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                    Welcome back! Please login.
                </p>

                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <form
                    className="space-y-5 max-w-sm w-full"
                    onSubmit={handleSubmit}
                >
                    {/* Email */}
                    <div>
                        <label className="text-gray-700 font-medium text-sm">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1.5 w-full p-3 border border-gray-300 rounded-lg 
                            focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-gray-700 font-medium text-sm">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1.5 w-full p-3 border border-gray-300 rounded-lg 
                            focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                            placeholder="Password"
                        />
                    </div>
                    <p className="text-right text-sm mt-1">
                        <a
                            href="/forgot-password"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Forgot password?
                        </a>
                    </p>

                    {/* Google Button */}
                    <button
                        type="button"
                        className="w-full border border-gray-300 py-2.5 rounded-lg 
                        flex items-center justify-center gap-3 hover:bg-gray-100 transition text-sm"
                    >
                        <FcGoogle size={22} />
                        Login with Google
                    </button>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold 
                        hover:bg-blue-700 transition text-sm shadow-sm"
                    >
                        Login
                    </button>
                </form>

                {/* Register */}
                <p className="mt-6 text-gray-600 text-xs sm:text-sm">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Register here
                    </a>
                </p>
            </div>

            {/* ================= RIGHT: ILLUSTRATION ================= */}
            <div className="hidden lg:flex items-start justify-center bg-white p-0">
                <div className="w-[92%] h-[92%] my-6 border-2 border-[#004FC5] rounded-3xl px-10 pt-10 pb-12 flex flex-col">
                    {/* Illust */}
                    <div className="w-full flex justify-center mb-10">
                        <img
                            src="/images/illustration.png"
                            className="w-[70%] max-w-md"
                        />
                    </div>

                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-4">
                        <img src="/images/logo.png" className="w-12" />
                        <h3 className="text-3xl font-bold text-[#004FC5]">
                            DevCourse
                        </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 pl-1">
                        Learning technology is easier than ever with DevCourse.
                        Explore coding, design, and more through fun,
                        interactive lessons. Join a growing community of
                        learners who inspire each other every day.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-5 mt-2">
                        <FaFacebook size={28} color="#1877F2" />
                        <FaInstagram size={28} color="#E1306C" />
                        <FaTelegram size={28} color="#0088cc" />
                        <FaLinkedin size={28} color="#0A66C2" />
                    </div>
                </div>
            </div>
        </section>
    );
}
