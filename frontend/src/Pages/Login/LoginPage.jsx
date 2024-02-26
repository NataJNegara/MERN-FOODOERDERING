import { Link, Navigate } from "react-router-dom";
import LoginForm from "../../features/auth/LoginForm";
import styles from "./LoginPage.module.css";
import { useUser } from "../../features/auth/useUser";

export default function LoginPage() {
  const { user } = useUser();

  if (user) return <Navigate to="/" />;

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
