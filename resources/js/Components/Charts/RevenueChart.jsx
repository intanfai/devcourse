import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function RevenueChart() {
    const data = {
        labels: ["Feb", "Apr", "Jun", "Aug", "Oct", "Dec"],
        datasets: [
            {
                label: "expenses",
                data: [2500, 3500, 4000, 3800, 4200, 4700],
                backgroundColor: "#3b82f6",
                borderRadius: 4,
            },
            {
                label: "profit",
                data: [3000, 4500, 5000, 5200, 6000, 6500],
                backgroundColor: "#a855f7",
                borderRadius: 4,
            },
            {
                label: "revenue",
                data: [4500, 6500, 7000, 7500, 8200, 9000],
                backgroundColor: "#22c55e",
                borderRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    pointStyle: "circle"
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: "#EAEAEA" }
            },
            x: {
                grid: { display: false }
            }
        }
    };

    return <Bar data={data} options={options} />;
}
