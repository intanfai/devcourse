import { useState } from "react";
import InstructorLayout from "../../../../layouts/InstructorLayout";
import { FiSave, FiLock } from "react-icons/fi";

export default function InstructorSettingsPage() {
    /* ============================
       STATE: ACCOUNT SETTINGS
    ============================ */
    const [account, setAccount] = useState({
        name: "Rina Instructor",
        email: "rina@example.com",
        phone: "08123456789",
        language: "English",
        timezone: "GMT+7",
    });

    const updateAccount = (key, value) =>
        setAccount((prev) => ({ ...prev, [key]: value }));

    /* ============================
       STATE: NOTIFICATIONS
    ============================ */
    const [notif, setNotif] = useState({
        newStudent: true,
        review: true,
        payment: true,
        classDecision: true,
        systemAlert: false,
    });

    const toggleNotif = (key) =>
        setNotif((prev) => ({ ...prev, [key]: !prev[key] }));

    /* ============================
       STATE: PAYOUT SETTINGS
    ============================ */
    const [payout, setPayout] = useState({
        method: "bank",
        bankName: "",
        accountNumber: "",
        accountHolder: "",
        ewallet: "",
    });

    const updatePayout = (key, value) =>
        setPayout((prev) => ({ ...prev, [key]: value }));

    /* ============================
       STATE: PASSWORD CHANGE
    ============================ */
    const [password, setPassword] = useState({
        current: "",
        newPass: "",
        confirm: "",
    });

    const updatePassword = (key, value) =>
        setPassword((p) => ({ ...p, [key]: value }));

    return (
        <InstructorLayout>
            <div className="px-1 pb-10 space-y-10">
                {/* ===================== ACCOUNT SETTINGS ===================== */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4 border-l-4 pl-3 border-[#3C64EF]">
                        Account Settings
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* FULL NAME */}
                        <input
                            className="border px-4 py-2 rounded-lg"
                            placeholder="Full Name"
                            value={account.name}
                            onChange={(e) =>
                                updateAccount("name", e.target.value)
                            }
                        />

                        {/* EMAIL */}
                        <input
                            className="border px-4 py-2 rounded-lg"
                            placeholder="Email"
                            value={account.email}
                            onChange={(e) =>
                                updateAccount("email", e.target.value)
                            }
                        />

                        {/* PHONE */}
                        <input
                            className="border px-4 py-2 rounded-lg"
                            placeholder="Phone Number"
                            value={account.phone}
                            onChange={(e) =>
                                updateAccount("phone", e.target.value)
                            }
                        />

                        {/* LOCATION */}
                        <input
                            className="border px-4 py-2 rounded-lg"
                            placeholder="Location (e.g., Jakarta, Indonesia)"
                            value={account.location}
                            onChange={(e) =>
                                updateAccount("location", e.target.value)
                            }
                        />

                        {/* PORTFOLIO / WEBSITE */}
                        <input
                            className="border px-4 py-2 rounded-lg"
                            placeholder="Website / Portfolio URL"
                            value={account.website}
                            onChange={(e) =>
                                updateAccount("website", e.target.value)
                            }
                        />

                        {/* LINKEDIN */}
                        <input
                            className="border px-4 py-2 rounded-lg"
                            placeholder="LinkedIn Profile URL"
                            value={account.linkedin}
                            onChange={(e) =>
                                updateAccount("linkedin", e.target.value)
                            }
                        />
                    </div>

                    {/* SHORT BIO */}
                    <textarea
                        className="border px-4 py-2 rounded-lg w-full mt-4"
                        rows={3}
                        placeholder="Short bio about yourself..."
                        value={account.bio}
                        onChange={(e) => updateAccount("bio", e.target.value)}
                    />

                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <FiSave /> Save Changes
                    </button>
                </div>

                {/* ===================== NOTIFICATIONS ===================== */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4 border-l-4 pl-3 border-[#3C64EF]">
                        Notifications
                    </h2>

                    <div className="space-y-3">
                        {[
                            ["newStudent", "New student enrollment"],
                            ["review", "New review on your class"],
                            ["payment", "Payment received"],
                            ["classDecision", "Class approved/rejected"],
                            ["systemAlert", "System notifications"],
                        ].map(([key, label]) => (
                            <label
                                key={key}
                                className="flex items-center gap-3"
                            >
                                <input
                                    type="checkbox"
                                    checked={notif[key]}
                                    onChange={() => toggleNotif(key)}
                                    className="w-4 h-4"
                                />
                                <span>{label}</span>
                            </label>
                        ))}
                    </div>

                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <FiSave /> Save Notification Settings
                    </button>
                </div>

                {/* ===================== PAYOUT SETTINGS ===================== */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4 border-l-4 pl-3 border-[#3C64EF]">
                        Payout Settings
                    </h2>

                    <div className="space-y-4">
                        {/* METHOD SELECTOR */}
                        <div>
                            <p className="text-sm text-gray-600 mb-1">
                                Payout Method
                            </p>
                            <select
                                className="border px-4 py-2 rounded-lg"
                                value={payout.method}
                                onChange={(e) =>
                                    updatePayout("method", e.target.value)
                                }
                            >
                                <option value="bank">Bank Transfer</option>
                                <option value="ewallet">E-Wallet</option>
                            </select>
                        </div>

                        {/* BANK FIELDS */}
                        {payout.method === "bank" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    className="border px-4 py-2 rounded-lg"
                                    placeholder="Bank Name"
                                    value={payout.bankName}
                                    onChange={(e) =>
                                        updatePayout("bankName", e.target.value)
                                    }
                                />
                                <input
                                    className="border px-4 py-2 rounded-lg"
                                    placeholder="Account Number"
                                    value={payout.accountNumber}
                                    onChange={(e) =>
                                        updatePayout(
                                            "accountNumber",
                                            e.target.value
                                        )
                                    }
                                />
                                <input
                                    className="border px-4 py-2 rounded-lg"
                                    placeholder="Account Holder"
                                    value={payout.accountHolder}
                                    onChange={(e) =>
                                        updatePayout(
                                            "accountHolder",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        )}

                        {/* E-WALLET FIELDS */}
                        {payout.method === "ewallet" && (
                            <input
                                className="border px-4 py-2 rounded-lg"
                                placeholder="E-Wallet Number (Dana / OVO / Gopay)"
                                value={payout.ewallet}
                                onChange={(e) =>
                                    updatePayout("ewallet", e.target.value)
                                }
                            />
                        )}
                    </div>

                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <FiSave /> Save Payout Settings
                    </button>
                </div>

                {/* ===================== CHANGE PASSWORD ===================== */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-lg font-semibold mb-4 border-l-4 pl-3 border-[#3C64EF]">
                        Security - Change Password
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            type="password"
                            className="border px-4 py-2 rounded-lg"
                            placeholder="Current Password"
                            value={password.current}
                            onChange={(e) =>
                                updatePassword("current", e.target.value)
                            }
                        />

                        <input
                            type="password"
                            className="border px-4 py-2 rounded-lg"
                            placeholder="New Password"
                            value={password.newPass}
                            onChange={(e) =>
                                updatePassword("newPass", e.target.value)
                            }
                        />

                        <input
                            type="password"
                            className="border px-4 py-2 rounded-lg"
                            placeholder="Confirm Password"
                            value={password.confirm}
                            onChange={(e) =>
                                updatePassword("confirm", e.target.value)
                            }
                        />
                    </div>

                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <FiLock /> Update Password
                    </button>
                </div>
            </div>
        </InstructorLayout>
    );
}
