import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiArrowLeft } from "react-icons/fi";
import StudentLayout from "../../../layouts/StudentLayout";
import PaymentFailedModal from "../../../Components/Payment/PaymentFailedModal";
import PaymentLoadingModal from "../../../Components/Payment/PaymentLoadingModal";
import PaymentSuccessModal from "../../../Components/Payment/PaymentSuccessModal";
import axios from "../../../axios";

export default function CheckoutPage() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [course, setCourse] = useState(null);
    const [loadingCourse, setLoadingCourse] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState("qris");

    //Payment
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);

    const [invoice, setInvoice] = useState(null);

    // Fetch course data
    useEffect(() => {
        fetchCourseData();
    }, [courseId]);

    const fetchCourseData = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`/courses/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            // Clean thumbnail path
            let thumbnailPath = res.data.thumbnail;
            if (!thumbnailPath || thumbnailPath === 'null' || thumbnailPath.trim() === '') {
                thumbnailPath = "/images/course-thumb.jpg";
            } else if (!thumbnailPath.startsWith('/') && !thumbnailPath.startsWith('http')) {
                thumbnailPath = '/' + thumbnailPath;
            }
            
            setCourse({
                id: res.data.id,
                title: res.data.title,
                price: res.data.price,
                thumbnail: thumbnailPath,
            });
        } catch (err) {
            console.error("Failed to fetch course:", err);
        } finally {
            setLoadingCourse(false);
        }
    };

    const handlePlaceOrder = async () => {
        if (!course || !user) return;
        
        console.log("DEBUG: user =", user);
        console.log("DEBUG: course =", course);
        
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            // Create enrollment
            console.log("DEBUG: Creating enrollment with course_id=" + course.id);
            
            const enrollRes = await axios.post(
                "/enrollments",
                {
                    course_id: course.id,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            const enrollmentId = enrollRes.data.enrollment.id;

            // Create QRIS dynamic payment via Midtrans
            const paymentRes = await axios.post(
                "/payments/qris",
                {
                    enrollment_id: enrollmentId,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            // Directly navigate to payment page (no success popup)
            navigate(`/student/payment/${enrollmentId}`);
        } catch (err) {
            console.error("Failed to place order:", err);
            const errMsg = err.response?.data?.message || err.message;
            console.error("Error details:", errMsg);
            // If already enrolled, fetch existing enrollment and redirect to payment page
            if (err.response?.status === 400 && errMsg === 'You are already enrolled in this course.') {
                try {
                    const token = localStorage.getItem("token");
                    const listRes = await axios.get("/enrollments", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    const existing = (listRes.data.enrollments || []).find(e => e.course?.id === course.id);
                    if (existing) {
                        navigate(`/student/payment/${existing.id}`);
                        return;
                    }
                } catch (listErr) {
                    console.error("Failed to fetch enrollments:", listErr);
                }
            }
            alert("Error: " + errMsg);
            setFailed(true);
        } finally {
            setLoading(false);
        }
    };

    // Ambil data user
    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    if (loadingCourse) {
        return (
            <StudentLayout>
                <div className="flex items-center justify-center py-12">
                    <p className="text-gray-500">Loading checkout...</p>
                </div>
            </StudentLayout>
        );
    }

    if (!course) {
        return (
            <StudentLayout>
                <div className="flex items-center justify-center py-12">
                    <p className="text-gray-500">Course not found</p>
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
                                    alt={course.title}
                                    onError={(e) => {
                                        e.currentTarget.src = "/images/course-thumb.jpg";
                                    }}
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
