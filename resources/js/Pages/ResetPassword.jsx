import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "../axios";

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");
    const emailFromUrl = searchParams.get("email");

    const [email] = useState(emailFromUrl || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!password || !confirmPassword) {
            setError("Please complete all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const res = await axios.post("/reset-password", {
                email,
                token,
                password,
                password_confirmation: confirmPassword,
            });

            if (res.data.status === "success") {
                setSuccess("Password successfully updated! Redirecting...");
                setTimeout(() => navigate("/login"), 1800);
            } else {
                setError("Failed to reset password.");
            }
        } catch (err) {
            setError("Something went wrong. Token may be invalid or expired.");
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border">
                <h2 className="text-2xl font-bold mb-2 text-gray-800">
                    Reset Password
                </h2>
                <p className="text-gray-600 text-sm mb-6">
                    Enter your new password below.
                </p>

                {error && (
                    <p className="text-red-500 text-sm mb-3 font-medium">
                        {error}
                    </p>
                )}

                {success && (
                    <p className="text-green-600 text-sm mb-3 font-medium">
                        {success}
                    </p>
                )}

                <form onSubmit={handleReset} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label className="text-gray-700 font-medium text-sm">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            disabled
                            className="mt-1.5 w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-sm"
                        />
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="text-gray-700 font-medium text-sm">
                            New Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="mt-1.5 w-full p-3 border border-gray-300 rounded-lg 
                            focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-gray-700 font-medium text-sm">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="mt-1.5 w-full p-3 border border-gray-300 rounded-lg 
                            focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold 
                        hover:bg-blue-700 transition text-sm shadow-sm"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </section>
    );
}
