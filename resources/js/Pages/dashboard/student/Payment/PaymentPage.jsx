import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiArrowLeft, FiCheck, FiX } from "react-icons/fi";
import StudentLayout from "../../../../layouts/StudentLayout";
import axios from "../../../../axios";

export default function PaymentPage() {
    const { enrollmentId } = useParams();
    const navigate = useNavigate();

    // Fallback QR image using public asset
    const fallbackQr = "/images/qris-payment.png";

    const [enrollment, setEnrollment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [paymentStatus, setPaymentStatus] = useState("pending"); // pending, success, failed
    const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
    const [payment, setPayment] = useState(null); // holds qr_url, order_id, expires_at

    // Load enrollment data + payment info
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");

                const [enrollRes, payRes] = await Promise.all([
                    axios.get(`/enrollments/${enrollmentId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`/payments/enrollment/${enrollmentId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }).catch(() => null),
                ]);

                setEnrollment(enrollRes.data);

                if (payRes && payRes.data?.payment) {
                    setPayment(payRes.data.payment);
                    if (payRes.data.payment.status === 'completed') {
                        setPaymentStatus('success');
                    }

                    // Robust expiry parsing: support MySQL timestamp "YYYY-MM-DD HH:MM:SS"
                    const rawExpiry = payRes.data.payment.expires_at;
                    if (rawExpiry) {
                        let expiryMs = Date.parse(rawExpiry);
                        if (isNaN(expiryMs)) {
                            // Convert "YYYY-MM-DD HH:MM:SS" to ISO by replacing space with 'T'
                            const iso = rawExpiry.replace(' ', 'T') + 'Z';
                            expiryMs = Date.parse(iso);
                        }
                        if (!isNaN(expiryMs)) {
                            const now = Date.now();
                            const diff = Math.max(0, Math.floor((expiryMs - now) / 1000));
                            setTimeLeft(diff || 1800);
                        } else {
                            setTimeLeft(1800);
                        }
                    } else {
                        setTimeLeft(1800);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [enrollmentId]);

    // Timer countdown
    useEffect(() => {
        if (paymentStatus !== "pending") return;

        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setPaymentStatus("expired");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [paymentStatus]);

    // Check payment status every 10 seconds via order_id
    useEffect(() => {
        if (paymentStatus !== "pending" || !payment?.order_id) return;

        const checkPayment = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`/payments/order/${payment.order_id}/status`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const newStatus = res.data?.payment?.status;
                if (newStatus === "completed") {
                    setPaymentStatus("success");
                } else if (newStatus === "failed") {
                    setPaymentStatus("failed");
                }
            } catch (err) {
                console.error("Error checking payment:", err);
            }
        };

        const interval = setInterval(checkPayment, 10000);
        return () => clearInterval(interval);
    }, [paymentStatus, payment?.order_id]);

    // Dummy mode: if no QR and pending, auto-complete after 3 seconds
    useEffect(() => {
        if (paymentStatus !== 'pending') return;
        // If payment exists but has no qr_url (dummy mode), simulate success
        if (payment && !payment.qr_url && payment.order_id) {
            const timer = setTimeout(async () => {
                try {
                    const token = localStorage.getItem("token");
                    const res = await axios.get(`/payments/order/${payment.order_id}/status`, {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const newStatus = res.data?.payment?.status;
                    if (newStatus === 'completed' || newStatus === 'success') {
                        setPaymentStatus('success');
                        return;
                    }
                    // Fallback: force success even if response is pending (dummy mode)
                    setPaymentStatus('success');
                } catch (e) {
                    console.error('Dummy completion failed:', e);
                    // Fallback to success to keep demo flow smooth
                    setPaymentStatus('success');
                }
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [paymentStatus, payment]);

    // Format time remaining
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const qrImage = payment?.qr_url || fallbackQr;

    if (loading) {
        return (
            <StudentLayout>
                <div className="flex items-center justify-center py-12">
                    <p className="text-gray-500">Loading payment...</p>
                </div>
            </StudentLayout>
        );
    }

    if (!enrollment) {
        return (
            <StudentLayout>
                <div className="flex items-center justify-center py-12">
                    <p className="text-gray-500">Enrollment not found</p>
                </div>
            </StudentLayout>
        );
    }

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
                        Complete Payment
                    </h1>
                </div>

                {/* SUCCESS STATE */}
                {paymentStatus === "success" && (
                    <div className="bg-white rounded-2xl shadow-md p-8 mb-6 border-2 border-green-500">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <FiCheck className="text-green-600" size={32} />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-center text-green-600 mb-2">
                            Payment Successful!
                        </h2>

                        <p className="text-center text-gray-600 mb-6">
                            Your payment has been confirmed.
                        </p>

                        <button
                            onClick={() => navigate("/student/courses")}
                            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
                        >
                            Go to My Courses
                        </button>
                    </div>
                )}

                {/* FAILED/EXPIRED STATE */}
                {(paymentStatus === "failed" || paymentStatus === "expired") && (
                    <div className="bg-white rounded-2xl shadow-md p-8 mb-6 border-2 border-red-500">
                        <div className="flex items-center justify-center mb-4">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <FiX className="text-red-600" size={32} />
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-center text-red-600 mb-2">
                            {paymentStatus === "expired"
                                ? "Payment Time Expired"
                                : "Payment Failed"}
                        </h2>

                        <p className="text-center text-gray-600 mb-6">
                            {paymentStatus === "expired"
                                ? "The 30-minute payment window has expired. Please try again."
                                : "Your payment could not be processed. Please try again."}
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate("/student/courses")}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold"
                            >
                                Back to Courses
                            </button>
                            <button
                                onClick={() => navigate(-1)}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* PENDING STATE */}
                {paymentStatus === "pending" && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* LEFT - PAYMENT DETAILS */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* TIMER */}
                            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
                                <p className="text-red-600 font-semibold mb-2">
                                    Time Remaining:
                                </p>
                                <p className="text-3xl font-bold text-red-600">
                                    {formatTime(timeLeft)}
                                </p>
                                <p className="text-sm text-red-600 mt-2">
                                    Complete your payment within 30 minutes
                                </p>
                            </div>

                            {/* PAYMENT METHOD */}
                            <div className="bg-white p-6 rounded-2xl shadow-md border">
                                <h2 className="text-xl font-semibold mb-4">
                                    Payment Method
                                </h2>

                                <div className="space-y-3">
                                    <label className="flex items-center gap-3 p-4 border rounded-xl bg-blue-50 border-blue-500">
                                        <input type="radio" checked readOnly />
                                        <span className="font-medium">QRIS (selected)</span>
                                    </label>
                                </div>
                            </div>

                            {/* PAYMENT DETAILS */}
                            <div className="bg-white p-6 rounded-2xl shadow-md border">
                                <h2 className="text-xl font-semibold mb-4">
                                    Pay with QRIS
                                </h2>

                                <div className="bg-gray-100 p-6 rounded-xl flex flex-col items-center justify-center mb-4">
                                    {qrImage ? (
                                        <img
                                            src={qrImage}
                                            alt="QRIS Code"
                                            className="w-56 h-56 object-contain bg-white p-2 rounded-lg border"
                                            onError={(e) => {
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-56 h-56 bg-white p-2 rounded-lg border flex items-center justify-center">
                                            <span className="text-gray-500 text-sm text-center">
                                                Dummy QR — payment will auto-complete
                                            </span>
                                        </div>
                                    )}
                                    <div className="text-center text-gray-500 text-sm mt-2">
                                        <p>Scan this QR code with your banking app</p>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-center text-sm">
                                    Scan this QR code using your mobile banking app to complete payment
                                </p>
                            </div>

                            {/* PAYMENT INSTRUCTIONS */}
                            <div className="bg-white p-6 rounded-2xl shadow-md border">
                                <h2 className="text-xl font-semibold mb-4">
                                    How to Pay
                                </h2>

                                <ol className="space-y-3">
                                    <>
                                        <li className="flex gap-3">
                                            <span className="font-semibold text-blue-600 min-w-fit">
                                                1.
                                            </span>
                                            <span className="text-gray-700">
                                                Open your mobile banking app
                                            </span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="font-semibold text-blue-600 min-w-fit">
                                                2.
                                            </span>
                                            <span className="text-gray-700">
                                                Select "Scan QRIS" or "Pay with QR"
                                            </span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="font-semibold text-blue-600 min-w-fit">
                                                3.
                                            </span>
                                            <span className="text-gray-700">
                                                Point your camera at the QR code above
                                            </span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="font-semibold text-blue-600 min-w-fit">
                                                4.
                                            </span>
                                            <span className="text-gray-700">
                                                Review the payment details and confirm
                                            </span>
                                        </li>
                                        <li className="flex gap-3">
                                            <span className="font-semibold text-blue-600 min-w-fit">
                                                5.
                                            </span>
                                            <span className="text-gray-700">
                                                Wait for payment confirmation
                                            </span>
                                        </li>
                                    </>
                                </ol>
                            </div>
                        </div>

                        {/* RIGHT - ORDER SUMMARY */}
                        <div className="bg-white rounded-2xl shadow-md p-6 h-fit border">
                            <h2 className="text-xl font-semibold mb-4">
                                Order Summary
                            </h2>

                            <div className="border-b pb-4 mb-4">
                                <p className="text-sm text-gray-600 mb-2">
                                    Course
                                </p>
                                <p className="font-semibold text-gray-800">
                                    {enrollment.course?.title || "Course"}
                                </p>
                                <p className="text-blue-600 font-bold text-lg mt-2">
                                    Rp{" "}
                                    {enrollment.course?.price?.toLocaleString(
                                        "id-ID"
                                    ) || 0}
                                </p>
                            </div>

                            <div className="flex justify-between text-lg font-bold mb-6">
                                <span>Total:</span>
                                <span className="text-blue-600">
                                    Rp{" "}
                                    {enrollment.course?.price?.toLocaleString(
                                        "id-ID"
                                    ) || 0}
                                </span>
                            </div>

                            <div className="space-y-2 text-sm text-gray-600">
                                <div>
                                    <p className="font-semibold text-gray-700">
                                        Payment Method:
                                    </p>
                                    <p className="capitalize mt-1">QRIS</p>
                                </div>

                                <div className="mt-4 pt-4 border-t">
                                    <p className="font-semibold text-gray-700">
                                        Time Left:
                                    </p>
                                    <p className="text-red-600 font-bold text-lg mt-1">
                                        {formatTime(timeLeft)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </StudentLayout>
    );
}
