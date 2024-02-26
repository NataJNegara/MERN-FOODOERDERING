import { Link } from "react-router-dom";
import styles from "./SignupPage.module.css";
import SignupForm from "../../features/auth/SignupForm";

export default function SignupPage() {
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
