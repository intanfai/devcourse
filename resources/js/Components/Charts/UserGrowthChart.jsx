import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function UserGrowthChart({ instructors = 0, students = 0 }) {

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Instructors",
                data: [instructors, instructors, instructors, instructors, instructors, instructors],
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 3,
            },
            {
                label: "Students",
                data: [students, students, students, students, students, students],
                borderColor: "#10b981",
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                }
            }
        },
        scales: {
            y: {
                beginAtZero: false,
                grid: { color: "#EAEAEA" }
            },
            x: {
                grid: { display: false }
            }
        }
    };

    return <Line data={data} options={options} />;
}
