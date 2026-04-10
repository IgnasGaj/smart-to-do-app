"use client";

import { useEffect, useState } from "react";
import { getTasks } from "@/lib/api";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error(err);
        alert("Not authorized ❌");
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>My Tasks</h1>

      {tasks.map((task) => (
        <div key={task._id}>{task.title}</div>
      ))}
    </div>
  );
}
