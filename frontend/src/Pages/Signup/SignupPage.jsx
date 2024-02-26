import { Link, Navigate } from "react-router-dom";
import styles from "./SignupPage.module.css";
import SignupForm from "../../features/auth/SignupForm";
import { useUser } from "../../features/auth/useUser";

export default function SignupPage() {
  const { user } = useUser();

  if (user) return <Navigate to="/" />;

  return (
    <div className={styles.container}>
      <div className={styles.form_container}>
        <h1 className={styles.header}>Login Form</h1>
        <SignupForm />
        <p className={styles.signup_link}>
          Already have an account? <Link to={"/login"}>login</Link>
        </p>
      </div>
    </div>
  );
}
