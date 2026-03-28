import styles from "./TaskItem.module.css";

export default function TaskItem({ task, onDelete, onToggle }) {
  const isOverdue =
    task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;

  return (
    <li
      className={`
        ${styles.item}
        ${styles[task.priority]}
        ${isOverdue ? styles.overdue : ""}
      `}
    >
      <span
        className={`${styles.text} ${task.completed ? styles.completed : ""}`}
        onClick={() => onToggle(task.id)}
      >
        {task.text}
      </span>

      {task.dueDate && <small className={styles.date}>{task.dueDate}</small>}

      <button
        className={styles.deleteBtn}
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
      >
        ❌
      </button>
    </li>
  );
}
