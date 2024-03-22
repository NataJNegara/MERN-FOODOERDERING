import { Link } from "react-router-dom";
import { useUser } from "../../features/auth/useUser";
import styles from "./hero.module.css";

export default function Hero() {
  const { user } = useUser();

  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroText}>
        <p className={styles.welcome}>Welcome to Food Addict</p>
        <h1>Good food, good mood</h1>
        <p className={styles.detail}>
          we offer fresh delicious food every day. open from 10 am to 10 pm
        </p>
      </div>
      {!user && (
        <Link to={`/login`} className={styles.button}>
          Order now
        </Link>
      )}
    </div>
  );
}
