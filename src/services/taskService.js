export const saveTasks = (tasks) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

export const loadTasks = () => {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem("tasks");

  return data
    ? JSON.parse(data).map((task) => ({
        ...task,
        priority: task.priority || "low",
        dueDate: task.dueDate || "",
      }))
    : [];
};
