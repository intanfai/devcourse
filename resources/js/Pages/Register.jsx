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

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Password dan konfirmasi tidak cocok");
            return;
        }

        try {
            const res = await axios.post("/register", {
                name,
                email,
                password,
            });

            // Jika berhasil, backend mengembalikan token + user
            if (res.data && res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));

                // Redirect langsung ke dashboard student
                navigate("/student/dashboard");
            } else {
                setError("Terjadi kesalahan saat mendaftar");
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else if (err.response && err.response.data && err.response.data.errors) {
                // Ambil pesan error pertama
                const firstKey = Object.keys(err.response.data.errors)[0];
                setError(err.response.data.errors[firstKey][0]);
            } else {
                setError("Terjadi kesalahan, coba lagi.");
            }
        }
    };

    return (
        <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-white to-blue-50/30">
            {/* LEFT — FORM */}
            <div className="flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 py-16">
                <div className="max-w-md w-full">
                    {/* Back to Home Button */}
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition-all duration-300 hover:gap-3 w-fit group"
                    >
                        <FaArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </button>
                    
                    <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Create Account</h2>
                    <p className="text-gray-600 mb-8 text-base">Start your learning journey today</p>

                    {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                    <form className="space-y-5 w-full" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-gray-700 font-semibold text-sm block mb-2">Full Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-sm transition-all duration-200"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 font-semibold text-sm block mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-sm transition-all duration-200"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 font-semibold text-sm block mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-sm transition-all duration-200"
                                placeholder="Create a password"
                                required
                                minLength={6}
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 font-semibold text-sm block mb-2">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="mt-1 w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none text-sm transition-all duration-200"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-3 my-6">
                            <hr className="flex-grow border-gray-300" />
                            <span className="text-gray-500 text-xs font-medium">or register with</span>
                            <hr className="flex-grow border-gray-300" />
                        </div>

                        <button
                            type="button"
                            className="w-full border-2 border-gray-300 py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-sm font-medium shadow-sm"
                        >
                            <FcGoogle size={22} />
                            Google
                        </button>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] transition-all duration-300 text-sm shadow-md"
                        >
                            Create Account
                        </button>
                    </form>

                    <p className="mt-8 text-gray-600 text-sm text-center">
                        Already have an account?{" "}
                        <a href="/login" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">Sign in now</a>
                    </p>
                </div>
            </div>

            {/* RIGHT — ILLUSTRATION AREA */}
            <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100/40 p-8 relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
                
                <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm border-2 border-blue-600 rounded-3xl px-10 pt-10 pb-12 flex flex-col shadow-2xl relative z-10 overflow-hidden">
                    {/* Illustration — TOP CENTER */}
                    <div className="w-full flex justify-center mb-10">
                        <img src="/images/illustration.png" className="w-[70%] max-w-md" />
                    </div>

                    {/* Logo + Name — LEFT */}
                    <div className="flex items-center gap-3 mb-6">
                        <img src="/images/logo.png" className="w-12" alt="DevCourse Logo" />
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">DevCourse</h3>
                    </div>

                    {/* Description — LEFT */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 pl-1">
                        Learning technology is easier than ever with DevCourse. Explore coding, design, and more
                        through fun, interactive lessons. Gain real experience while working on projects that matter.
                        Join a growing community of learners who inspire each other every day.
                    </p>

                    {/* Social Icons — CENTER */}
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
