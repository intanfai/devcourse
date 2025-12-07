import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import StudentLayout from "../../../layouts/StudentLayout";
import PaymentFailedModal from "../../../Components/Payment/PaymentFailedModal";
import PaymentLoadingModal from "../../../Components/Payment/PaymentLoadingModal";
import PaymentSuccessModal from "../../../Components/Payment/PaymentSuccessModal";

export default function CheckoutPage() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("qris");

    //Payment
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);

    const [invoice, setInvoice] = useState(null);

    const handlePlaceOrder = () => {
        setLoading(true);

        // simulasi pembayaran API
        setTimeout(() => {
            const random = Math.random();

            if (random > 0.2) {
                // 80% success
                setLoading(false);
                setSuccess(true);

                setInvoice({
                    id: "INV-" + Math.floor(Math.random() * 999999),
                    course: course.title,
                    amount: course.price,
                });
            } else {
                // 20% gagal
                setLoading(false);
                setFailed(true);
            }
        }, 2000);
    };

    // Ambil data user
    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    // Dummy course data
    const course = {
        id: courseId,
        title: "React Fundamentals",
        price: 1,
        thumbnail: "/images/course-thumb.jpg",
    };

    return (
        <StudentLayout>
            <div className="pb-6">
                {/* BACK */}
                <div className="flex items-center gap-4 mb-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white"
                    >
                        <FiArrowLeft size={18} />
                    </button>

                    <h1 className="text-2xl font-bold text-gray-900">
                        Checkout
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* ================= LEFT FORM ================= */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* YOU ARE BUYING */}
                        <div className="bg-white p-6 rounded-2xl shadow-md border">
                            <h2 className="text-xl font-semibold mb-4">
                                You're buying:
                            </h2>

                            <div className="flex items-center gap-4">
                                <img
                                    src={course.thumbnail}
                                    className="w-20 h-20 rounded-xl object-cover"
                                />
                                <div>
                                    <p className="font-bold text-gray-800 text-lg">
                                        {course.title}
                                    </p>
                                    <p className="text-blue-600 font-semibold">
                                        Rp{" "}
                                        {course.price.toLocaleString("id-ID")}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* BILLING DETAILS */}
                        <div className="bg-white p-6 rounded-2xl shadow-md border">
                            <h2 className="text-xl font-semibold mb-4">
                                Billing Details
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* FIRST NAME */}
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={
                                            user?.name?.split(" ")[0] || ""
                                        }
                                        className="mt-1 w-full px-4 py-2 rounded-xl border bg-gray-50 outline-none"
                                    />
                                </div>

                                {/* LAST NAME */}
                                <div>
                                    <label className="text-sm font-medium text-gray-600">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={
                                            user?.name?.split(" ")[1] || ""
                                        }
                                        className="mt-1 w-full px-4 py-2 rounded-xl border bg-gray-50 outline-none"
                                    />
                                </div>
                            </div>

                            {/* EMAIL */}
                            <div className="mt-4">
                                <label className="text-sm font-medium text-gray-600">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    defaultValue={user?.email || ""}
                                    className="mt-1 w-full px-4 py-2 rounded-xl border bg-gray-50 outline-none"
                                />
                            </div>
                        </div>

                        {/* PAYMENT METHOD */}
                        <div className="bg-white p-6 rounded-2xl shadow-md border">
                            <h2 className="text-xl font-semibold mb-4">
                                Payment Method
                            </h2>

                            <div className="space-y-3">
                                {/* QRIS */}
                                <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        checked={paymentMethod === "qris"}
                                        onChange={() =>
                                            setPaymentMethod("qris")
                                        }
                                    />
                                    <span className="font-medium">QRIS</span>
                                    <img
                                        src="/images/qris.png"
                                        className="h-6 ml-auto"
                                    />
                                </label>

                                {/* BCA VA */}
                                <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        checked={paymentMethod === "bca"}
                                        onChange={() => setPaymentMethod("bca")}
                                    />
                                    <span className="font-medium">
                                        BCA Virtual Account
                                    </span>
                                </label>

                                {/* BNI VA */}
                                <label className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        checked={paymentMethod === "bni"}
                                        onChange={() => setPaymentMethod("bni")}
                                    />
                                    <span className="font-medium">
                                        BNI Virtual Account
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* ================= RIGHT ORDER SUMMARY ================= */}
                    <div className="bg-white rounded-2xl shadow-md p-6 h-fit border">
                        <h2 className="text-xl font-semibold mb-4">
                            Order Summary
                        </h2>

                        <div className="border-b pb-4 mb-4">
                            <div className="flex justify-between">
                                <p className="font-medium text-gray-800">
                                    {course.title}
                                </p>
                                <p className="font-semibold text-blue-600">
                                    Rp {course.price.toLocaleString("id-ID")}
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span className="text-blue-600">
                                Rp {course.price.toLocaleString("id-ID")}
                            </span>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>

            <PaymentLoadingModal open={loading} />

            <PaymentSuccessModal
                open={success}
                invoice={invoice}
                onClose={() => navigate("/student/courses")}
            />

            <PaymentFailedModal
                open={failed}
                onRetry={() => {
                    setFailed(false);
                    handlePlaceOrder();
                }}
                onClose={() => setFailed(false)}
            />
        </StudentLayout>
    );
}
