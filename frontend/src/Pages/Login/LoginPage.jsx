import { Link } from "react-router-dom";
import LoginForm from "../../features/auth/LoginForm";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h1 className={styles.header}>Login Form</h1>
        <LoginForm />
        <p className={styles.signup_link}>
          Do not have an account? <Link to={"/signup"}>sign up</Link>
        </p>
      </div>
    </div>
  );
}
