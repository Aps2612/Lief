import React from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const AnalyticsDashboard = ({ tasks }) => {
  const completedTasks = tasks.filter((task) => task.completed);
  const completedRatio = tasks.length > 0 ? completedTasks.length / tasks.length : 0;

  const data = [
    { name: "Completed", value: completedRatio },
    { name: "Incomplete", value: 1 - completedRatio },
  ];

  const colors = ["#4BC0C0", "#FF6384"];

  const timeSpent = 0; 
  const productivity = (completedTasks.length / tasks.length)*100 ;

  return (
    <div>
      <h2>Analytics Dashboard</h2>
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>

      <div>
        <h3>Completed Tasks</h3>
        <p>{`${(completedRatio * 100).toFixed(0)}%`}</p>
      </div>

      <div>
        <h3>Time Spent</h3>
        <p>{`${timeSpent} hours`}</p>
      </div>

      <div>
        <h3>Productivity</h3>
        <p>{`${productivity}%`}</p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
