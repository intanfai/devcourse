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
        <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT — FORM */}
            <div className="flex flex-col justify-center px-28 py-12 bg-white">
                <h2 className="text-3xl font-bold mb-2">Register</h2>
                <p className="text-gray-600 mb-8">Create a new account.</p>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <form className="space-y-5 max-w-sm" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-gray-700 font-medium text-sm">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1.5 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-medium text-sm">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1.5 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-medium text-sm">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1.5 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                            placeholder="Password"
                            required
                            minLength={6}
                        />
                    </div>

                    <div>
                        <label className="text-gray-700 font-medium text-sm">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-1.5 w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                            placeholder="Confirm Password"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <hr className="flex-grow border-gray-300" />
                        <span className="text-gray-500 text-xs">or register with</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <button
                        type="button"
                        className="w-full border border-gray-300 py-2.5 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition text-sm"
                    >
                        <FcGoogle size={22} />
                        Google
                    </button>

                    <button
                        type="submit"
                        className="w-full bg-[#004FC5] text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition text-sm"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-5 text-gray-600 text-xs">
                    Already have an account?{" "}
                    <a href="/login" className="text-[#004FC5] font-semibold hover:underline">Login here</a>
                </p>
            </div>

            {/* RIGHT — ILLUSTRATION AREA */}
            <div className="hidden lg:flex items-start justify-center bg-white p-0">
                <div className="w-[93%] h-[93%] my-4 border-2 border-[#004FC5] rounded-3xl px-10 pt-10 pb-12 flex flex-col">
                    {/* Illustration — TOP CENTER */}
                    <div className="w-full flex justify-center mb-10">
                        <img src="/images/illustration.png" className="w-[70%] max-w-md" />
                    </div>

                    {/* Logo + Name — LEFT */}
                    <div className="flex items-center gap-3 mb-4">
                        <img src="/images/logo.png" className="w-12" />
                        <h3 className="text-3xl font-bold text-[#004FC5]">DevCourse</h3>
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
