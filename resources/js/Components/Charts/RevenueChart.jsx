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
                label: "Revenue",
                data: [4500, 6500, 7000, 7500, 8200, 9000],
                backgroundColor: "#4f46e5",
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
                    pointStyle: "circle",
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: "#EAEAEA" },
            },
            x: {
                grid: { display: false },
            },
        },
    };

    return <Bar data={data} options={options} />;
}
