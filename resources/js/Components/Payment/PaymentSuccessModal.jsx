import React from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function PaymentSuccessModal({ open, invoice, onClose }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-center">

                <FiCheckCircle className="text-green-500 mx-auto" size={60} />

                <h2 className="mt-4 text-2xl font-bold text-green-600">
                    Payment Successful!
                </h2>

                <p className="text-gray-600 mt-2">
                    Your order has been completed.
                </p>

                {/* Invoice Box */}
                <div className="mt-6 p-4 border rounded-xl bg-gray-50 text-left space-y-2">
                    <p><strong>Invoice ID:</strong> {invoice?.id}</p>
                    <p><strong>Course:</strong> {invoice?.course}</p>
                    <p>
                        <strong>Total:</strong> Rp{" "}
                        {invoice?.amount?.toLocaleString("id-ID")}
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                >
                    Continue
                </button>
            </div>
        </div>
    );
}
