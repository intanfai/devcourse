import StudentLayout from "../../../layouts/StudentLayout";
import { useNavigate } from "react-router-dom";
import {
    FiArrowLeft,
    FiBell,
    FiCheckCircle,
    FiInfo,
    FiAlertTriangle,
} from "react-icons/fi";

export default function NotificationsPage() {
    const navigate = useNavigate();

    const notifications = [
        {
            id: 1,
            type: "course",
            title: "New lesson available!",
            message: "React Fundamentals · Module 4 is now unlocked.",
            time: "2 hours ago",
            isNew: true,
        },
        {
            id: 2,
            type: "success",
            title: "Congratulations!",
            message: "You earned a certificate for completing Laravel Basics.",
            time: "Yesterday",
            isNew: false,
        },
        {
            id: 3,
            type: "info",
            title: "Account Info",
            message: "Your profile information was updated.",
            time: "2 days ago",
            isNew: false,
        },
        {
            id: 4,
            type: "warning",
            title: "Password Reminder",
            message: "Your password hasn’t been updated in 120 days.",
            time: "3 days ago",
            isNew: false,
        },
    ];

    const getIcon = (type) => {
        switch (type) {
            case "success":
                return <FiCheckCircle className="text-green-600" size={22} />;
            case "info":
                return <FiInfo className="text-blue-600" size={22} />;
            case "warning":
                return <FiAlertTriangle className="text-yellow-500" size={22} />;
            case "course":
                return <FiBell className="text-purple-600" size={22} />;
            default:
                return <FiInfo className="text-gray-600" size={22} />;
        }
    };

    return (
        <StudentLayout>
            <div className="pb-6">

                {/* BACK + TITLE */}
                <div className="flex items-center gap-4 mb-8">
                    {/* <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button> */}

                    <h1 className="text-2xl font-bold text-gray-900">
                        Notifications
                    </h1>
                </div>

                {/* NOTIFICATIONS LIST */}
                <div className="space-y-4">
                    {notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className="
                                bg-white border shadow-sm rounded-xl p-4
                                flex items-start gap-4 hover:shadow-md transition
                            "
                        >
                            <div className="mt-1">{getIcon(notif.type)}</div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-gray-800">
                                        {notif.title}
                                    </h3>

                                    {notif.isNew && (
                                        <span className="
                                            text-xs bg-blue-600 text-white
                                            px-2 py-0.5 rounded-full
                                        ">
                                            NEW
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-gray-600 mt-1">
                                    {notif.message}
                                </p>

                                <p className="text-xs text-gray-400 mt-2">
                                    {notif.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* EMPTY STATE */}
                {notifications.length === 0 && (
                    <div className="text-center text-gray-500 mt-20">
                        <FiBell className="mx-auto text-4xl mb-3 text-gray-400" />
                        <p>No notifications yet.</p>
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
