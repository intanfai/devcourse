import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function InstructorCourseChart() {
    const data = {
        labels: ["React Basics", "UI/UX", "NodeJS", "CSS Mastery", "Laravel API"],
        datasets: [
            {
                label: "Students Enrolled",
                data: [120, 80, 140, 90, 70],
                backgroundColor: "#3C64EF",
                borderRadius: 8,
                barThickness: 35,
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
                ticks: { stepSize: 20 },
            },
        },
    };

    return <Bar data={data} options={options} height={280} />;
}
