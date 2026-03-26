import styles from "./TaskItem.module.css";

export default function TaskItem({ task, onDelete, onToggle }) {
  return (
    <li className={`${styles.item} ${styles[task.priority]}`}>
      <span
        className={`${styles.text} ${task.completed ? styles.completed : ""}`}
        onClick={() => onToggle(task.id)}
      >
        {task.text}
      </span>

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
