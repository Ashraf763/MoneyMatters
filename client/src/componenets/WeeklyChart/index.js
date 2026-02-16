// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { day: "Sat", type: "debit", amount: 340 },
//   { day: "Sat", type: "credit", amount: 580 },
//   { day: "Sun", type: "debit", amount: 260 },
//   { day: "Sun", type: "credit", amount: 480 },
// ];

// function WeeklyChart() {
// import { useEffect, useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";

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

const WeeklyChart = () => {
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Debit",
        data: [340, 260, 250, 550, 380, 400, 460],
        backgroundColor: "#4F6EF7",
        borderRadius: 5,
        barThickness: 18,
      },
      {
        label: "Credit",
        data: [580, 480, 350, 300, 540, 260, 560],
        backgroundColor: "#F59E0B",
        borderRadius: 5,
        barThickness: 18,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          // usePointStyle: true,
          boxWidth: 15,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        grid: { color: "#f1f1f1" },
        ticks: {
          stepSize: 100,
        },
      },
    },
  };

  return (
    <Bar
      data={data}
      options={options}
      className="p-lg-5 p-2 w-100"
      style={{ height: "fit-content" }}
    />
  );
};

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// const WeeklyChart = () => {
//   const [chartData, setChartData] = useState(null);

//   useEffect(() => {
//     const fetchChartData = async () => {
//       try {
//         const res = await fetch("https://api.example.com/weekly-chart");
//         const apiData = await res.json();

//         // Days order
//         const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

//         const debitMap = {};
//         const creditMap = {};

//         apiData.forEach((item) => {
//           if (item.type === "debit") debitMap[item.day] = item.amount;
//           if (item.type === "credit") creditMap[item.day] = item.amount;
//         });

//         setChartData({
//           labels: days,
//           datasets: [
//             {
//               label: "Debit",
//               data: days.map((d) => debitMap[d] || 0),
//               backgroundColor: "#4F6EF7",
//               borderRadius: 10,
//               barThickness: 18,
//             },
//             {
//               label: "Credit",
//               data: days.map((d) => creditMap[d] || 0),
//               backgroundColor: "#F59E0B",
//               borderRadius: 10,
//               barThickness: 18,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error("Chart API error:", error);
//       }
//     };

//     fetchChartData();
//   }, []);

//   if (!chartData) return <p>Loading chart...</p>;

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top",
//         align: "end",
//         labels: {
//           usePointStyle: true,
//           boxWidth: 8,
//         },
//       },
//     },
//     scales: {
//       x: { grid: { display: false } },
//       y: {
//         grid: { color: "#f1f1f1" },
//         ticks: { stepSize: 100 },
//       },
//     },
//   };

//   return <Bar data={chartData} options={options} />;
// };

export default WeeklyChart;
