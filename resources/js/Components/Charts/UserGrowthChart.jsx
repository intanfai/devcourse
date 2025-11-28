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

export default function UserGrowthChart() {

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "activeUsers",
                data: [900, 1100, 1300, 1500, 1700, 1900],
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.2)",
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 3,
            },
            {
                label: "users",
                data: [1000, 1300, 1500, 1700, 1900, 2200],
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
