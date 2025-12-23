import { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaTelegram,
    FaArrowLeft,
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
        <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-white to-blue-50/30">
            {/* ================= LEFT: FORM ================= */}
            <div className="flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 py-16">
                <div className="max-w-md w-full">
                    {/* Back to Home Button */}
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-all duration-300 hover:gap-3 w-fit group"
                    >
                        <FaArrowLeft
                            size={16}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                        <span className="text-sm font-medium">
                            Back to Home
                        </span>
                    </button>

                    <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        Welcome Back
                    </h2>
                    <p className="text-gray-600 mb-6 text-sm sm:text-base">
                        Welcome back! Please login.
                    </p>

                    {error && (
                        <p className="text-red-500 text-sm mb-3">{error}</p>
                    )}

                    <form className="space-y-5 w-full" onSubmit={handleSubmit}>
                        {/* Email */}
                        <div>
                            <label className="text-gray-700 font-semibold text-sm block mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-full p-3 border-2 border-gray-300 rounded-xl 
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-sm transition-all duration-200"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-gray-700 font-semibold text-sm block mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 w-full p-3 border-2 border-gray-300 rounded-xl 
                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-sm transition-all duration-200"
                                placeholder="Enter your password"
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
                            className="w-full border-2 border-gray-300 py-3 rounded-xl 
                            flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-sm font-medium shadow-sm"
                        >
                            <FcGoogle size={22} />
                            Login with Google
                        </button>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-xl font-semibold 
                            hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300 text-sm shadow-md"
                        >
                            Login
                        </button>
                    </form>

                    {/* Register */}
                    <p className="mt-8 text-gray-600 text-sm text-center">
                        Don't have an account?{" "}
                        <a
                            href="/register"
                            className="text-blue-600 font-bold hover:text-blue-700 transition-colors"
                        >
                            Sign up now
                        </a>
                    </p>
                </div>
            </div>

            {/* ================= RIGHT: ILLUSTRATION ================= */}
            <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100/40 p-8 relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>

                <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm border-2 border-blue-600 rounded-3xl px-10 pt-10 pb-12 flex flex-col shadow-2xl relative z-10 overflow-hidden">
                    {/* Illust */}
                    <div className="w-full flex justify-center mb-10">
                        <img
                            src="/images/illustration.png"
                            className="w-[70%] max-w-md"
                        />
                    </div>

                    {/* Logo */}
                    <div className="flex items-center gap-3 mb-6">
                        <img
                            src="/images/logo.png"
                            className="w-12"
                            alt="DevCourse Logo"
                        />
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
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
