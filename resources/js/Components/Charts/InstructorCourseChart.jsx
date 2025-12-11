import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { useState, useEffect } from "react";
import axios from "axios";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function InstructorCourseChart() {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCoursePerformance();
    }, []);

    const fetchCoursePerformance = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.get(
                "http://localhost:8000/api/dashboard/course-performance",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const courses = response.data.courses || [];
            const labels = courses.map((c) => c.title);
            const data = courses.map((c) => c.students_enrolled);

            setChartData({
                labels: labels,
                datasets: [
                    {
                        label: "Students Enrolled",
                        data: data,
                        backgroundColor: "#3C64EF",
                        borderRadius: 8,
                        barThickness: 35,
                    },
                ],
            });
        } catch (error) {
            console.error("Error fetching course performance:", error);
            // Set default empty data on error
            setChartData({
                labels: [],
                datasets: [
                    {
                        label: "Students Enrolled",
                        data: [],
                        backgroundColor: "#3C64EF",
                        borderRadius: 8,
                        barThickness: 35,
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
                ticks: { stepSize: 20 },
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

    return <Bar data={chartData} options={options} height={280} />;
}
