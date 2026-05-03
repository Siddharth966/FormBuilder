import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState("pie");

  const [stats, setStats] = useState({
    totalForms: 0,
    totalResponses: 0,
    mostPopularForm: "",
    avgResponses: 0,
  });

  useEffect(() => {
    fetch("http://localhost:3000/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        const labels = data.data.map((item) => item.title);
        const values = data.data.map((item) => item.responseCount);

        const totalResponses = values.reduce((a, b) => a + b, 0);

        const maxIndex = values.indexOf(Math.max(...values));
        const mostPopularForm = labels[maxIndex];

        const avgResponses = (totalResponses / labels.length).toFixed(2);

        setStats({
          totalForms: data.totalForms,
          totalResponses,
          mostPopularForm,
          avgResponses,
        });

        setChartData({
          labels,
          datasets: [
            {
              label: "Responses",
              data: values,
              backgroundColor: [
                "#6366F1",
                "#22C55E",
                "#F59E0B",
                "#EF4444",
                "#06B6D4",
              ],
              borderRadius: 6,
            },
          ],
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        📊 Analytics Dashboard
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card title="Total Forms" value={stats.totalForms} />
        <Card title="Total Responses" value={stats.totalResponses} />
        <Card title="Most Popular" value={stats.mostPopularForm} />
        <Card title="Avg Responses" value={stats.avgResponses} />
      </div>

      {/* CHART SECTION */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Form Analytics</h2>

          <div>
            <button
              onClick={() => setChartType("pie")}
              className={`px-3 py-1 mr-2 rounded ${
                chartType === "pie"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Pie
            </button>

            <button
              onClick={() => setChartType("bar")}
              className={`px-3 py-1 rounded ${
                chartType === "bar"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              Bar
            </button>
          </div>
        </div>

        {/* ✅ BIG CHART FIX */}
        <div className="flex justify-center items-center h-[400px] md:h-[500px]">
          <div className="w-[90%] md:w-[60%] h-full">
            {chartData ? (
              chartType === "pie" ? (
                <Pie
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                      padding: 20,
                    },
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                    },
                  }}
                />
              ) : (
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              )
            ) : (
              <p className="text-center">Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ✅ CARD COMPONENT */
const Card = ({ title, value }) => (
  <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300">
    <h3 className="text-gray-500 text-sm">{title}</h3>
    <p className="text-xl font-bold mt-2 text-gray-800">{value}</p>
  </div>
);

export default Dashboard;