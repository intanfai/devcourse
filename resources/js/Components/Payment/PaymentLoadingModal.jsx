import React from "react";

export default function PaymentLoadingModal({ open }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center w-[90%] max-w-sm">

                {/* Loader */}
                <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

                <h2 className="mt-5 text-xl font-semibold text-gray-800">
                    Processing Payment...
                </h2>

                <p className="text-gray-500 mt-2 text-sm">
                    Please wait while we confirm your transaction.
                </p>
            </div>
        </div>
    );
}
