import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound({ btnText, onReset, message }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }

  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
      <button onClick={onReset ? onReset : handleClick}>{btnText}</button>
    </div>
  );
}

NotFound.defaultProps = {
  btnText: "Back to home",
  message: "There is no data to show",
};
