import { useState, useEffect } from "react";
import { saveTasks, loadTasks } from "../services/taskService";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = loadTasks();
    setTasks(storedTasks);
  }, []);

  const addTask = (text, priority) => {
    if (!text.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTask,
  };
};
