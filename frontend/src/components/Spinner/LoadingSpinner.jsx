import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className={styles.spinner_container}>
      <div className={styles.dots3}></div>
    </div>
  );
}
