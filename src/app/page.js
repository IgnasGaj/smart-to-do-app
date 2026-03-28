"use client";

import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import TaskList from "../components/TaskList/TaskList";
import styles from "./page.module.css";

export default function Home() {
  const { tasks, addTask, deleteTask, toggleTask } = useTasks();

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");

  const handleAdd = () => {
    if (!input.trim()) return;

    addTask(input, priority, dueDate);
    setInput("");
    setDueDate("");
  };

  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch = task.text
        .toLowerCase()
        .includes(search.toLowerCase());

      if (filter === "active") return !task.completed && matchesSearch;
      if (filter === "completed") return task.completed && matchesSearch;

      return matchesSearch;
    })
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return new Date(a.dueDate) - new Date(b.dueDate);
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

        <select
          className={styles.select}
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={styles.input}
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

      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />

      <TaskList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTask}
      />
    </main>
  );
}
