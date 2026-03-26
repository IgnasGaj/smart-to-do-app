"use client";

import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskList from "../components/TaskList/TaskList";
import styles from "./page.module.css";

export default function Home() {
  const { tasks, addTask, deleteTask, toggleTask } = useTasks();

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");

  const handleAdd = () => {
    if (!input.trim()) return;
    addTask(input);
    setInput("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Smart To-Do</h1>

      <div className={styles.inputRow}>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />
        <button className={styles.button} onClick={handleAdd}>
          Add
        </button>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filterBtn} ${
            filter === "all" ? styles.activeFilter : ""
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>

        <button
          className={`${styles.filterBtn} ${
            filter === "active" ? styles.activeFilter : ""
          }`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>

        <button
          className={`${styles.filterBtn} ${
            filter === "completed" ? styles.activeFilter : ""
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
    </main>
  );
}
