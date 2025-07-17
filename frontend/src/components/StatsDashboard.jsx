import React, { useContext, useEffect, useRef } from 'react';
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  Tooltip,
  Legend,
  PointElement // <--- Ensure this is here
} from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { StatsContext } from '../contexts/StatsContext.jsx';
import { client } from '../api.js';

Chart.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  Tooltip,
  Legend,
  PointElement // <--- Ensure this is here
);

export default function StatsDashboard() {
  const { genres, ratings, runtimes, setGenres, setRatings, setRuntimes } = useContext(StatsContext);

  // These refs will hold the chart instances
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    // Fetch data
    client.get('/stats/genres').then(res => setGenres(res.data));
    client.get('/stats/ratings').then(res => setRatings(res.data));
    client.get('/stats/runtime').then(res => setRuntimes(res.data));

    // Cleanup function to destroy charts when the component unmounts
    // or before the effect re-runs (though with [] dependency, it's mainly for unmount)
    return () => {
      // Access the chart instance through the ref's current property
      // The chart instance itself is typically available at .current.chart
      if (pieChartRef.current && pieChartRef.current.chart) {
        pieChartRef.current.chart.destroy();
      }
      if (barChartRef.current && barChartRef.current.chart) {
        barChartRef.current.chart.destroy();
      }
      if (lineChartRef.current && lineChartRef.current.chart) {
        lineChartRef.current.chart.destroy();
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const pieData = {
    labels: genres.map(g => g._id),
    datasets: [{ data: genres.map(g => g.count), backgroundColor: ['#f87171', '#60a5fa', '#34d399', '#fbbf24'] }]
  };

  const barData = {
    labels: ratings.map(r => r._id),
    datasets: [{ data: ratings.map(r => r.avgRating), backgroundColor: '#60a5fa' }]
  };

  const lineData = {
    labels: runtimes.map(r => r._id),
    datasets: [{ data: runtimes.map(r => r.avgRuntime), borderColor: '#34d399', fill: false }]
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Genre Distribution</h2>
        <Pie ref={pieChartRef} data={pieData} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Average Rating by Genre</h2>
        <Bar ref={barChartRef} data={barData} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Average Runtime by Year</h2>
        <Line ref={lineChartRef} data={lineData} />
      </div>
    </div>
  );
}