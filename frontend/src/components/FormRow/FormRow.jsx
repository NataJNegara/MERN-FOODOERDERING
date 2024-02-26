import styles from "./FormRow.module.css";

export default function FormRow({ children, error, label }) {
  return (
    <div className={styles.container}>
      {label && (
        <label htmlFor={children.props.id} className={styles.label}>
          {label}
        </label>
      )}
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
