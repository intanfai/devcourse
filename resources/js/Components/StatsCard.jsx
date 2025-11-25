import React from "react";

export default function StatsCard({ icon, title, value, color }) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-5 flex items-center gap-4 border border-gray-100">
      {/* ICON */}
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full ${color}`}
      >
        {icon}
      </div>

      {/* TEXT */}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
