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
import { useState, useEffect } from "react";
import axios from "axios";

ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
);

export default function InstructorEarningsChart() {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMonthlyEarnings();
    }, []);

    const fetchMonthlyEarnings = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.get(
                "http://localhost:8000/api/dashboard/monthly-earnings",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const earnings = response.data.monthly_earnings || [];
            const labels = earnings.map((e) => e.month);
            const data = earnings.map((e) => e.amount);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: "Earnings (IDR)",
                        data: data,
                        borderColor: "#3C64EF",
                        backgroundColor: "rgba(60, 100, 239, 0.2)",
                        fill: true,
                        tension: 0.4,
                        pointBorderWidth: 2,
                        pointRadius: 4,
                    },
                ],
            });
        } catch (error) {
            console.error("Error fetching monthly earnings:", error);
            // Set default empty data on error
            setChartData({
                labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                datasets: [
                    {
                        label: "Earnings (IDR)",
                        data: [0, 0, 0, 0, 0, 0],
                        borderColor: "#3C64EF",
                        backgroundColor: "rgba(60, 100, 239, 0.2)",
                        fill: true,
                        tension: 0.4,
                        pointBorderWidth: 2,
                        pointRadius: 4,
                    },
                ],
            });
        } finally {
            setLoading(false);
        }
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

    if (loading || !chartData) {
        return (
            <div className="flex items-center justify-center h-[280px]">
                <p className="text-gray-400">Loading chart...</p>
            </div>
        );
    }

    return <Line data={chartData} options={options} height={280} />;
}
