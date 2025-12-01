import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
);

export default function InstructorEarningsChart() {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Earnings (IDR)",
                data: [1200000, 1500000, 1000000, 1800000, 2200000, 2000000],
                borderColor: "#3C64EF",
                backgroundColor: "rgba(60, 100, 239, 0.2)",
                fill: true,
                tension: 0.4,
                pointBorderWidth: 2,
                pointRadius: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) =>
                        "Rp " + value.toLocaleString("id-ID"),
                },
            },
        },
    };

    return <Line data={data} options={options} height={280} />;
}
