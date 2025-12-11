import { useState } from "react";
import axios from "../axios";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            const res = await axios.post("/forgot-password", { email });
            setMessage(res.data.message || "Reset link sent to your email.");
        } catch (err) {
            setError("Email tidak ditemukan!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-3">Forgot Password</h2>
                <p className="text-gray-600 text-sm mb-5">
                    Enter your email to receive the password reset link.
                </p>

                {message && <p className="text-green-600 mb-3">{message}</p>}
                {error && <p className="text-red-500 mb-3">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700"
                    >
                        Send Reset Link
                    </button>

                    <p className="text-center text-sm mt-3">
                        <a href="/login" className="text-blue-600 hover:underline">
                            Back to login
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
}
