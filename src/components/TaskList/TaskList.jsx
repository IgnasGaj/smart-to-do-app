import TaskItem from "../TaskItem/TaskItem";
import styles from "./TaskList.module.css";

export default function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
}
