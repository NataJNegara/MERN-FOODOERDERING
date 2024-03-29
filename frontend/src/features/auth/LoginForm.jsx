import { useForm } from "react-hook-form";
import { useLogin } from "./useLogin";
import FormRow from "../../components/FormRow/FormRow";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const { isLogin, login } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    login(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email" error={errors?.email?.message}>
        <input
          className={styles.input}
          type="email"
          id="email"
          autoComplete="username"
          {...register("email", { required: "This field is required" })}
          disabled={isLogin}
        />
      </FormRow>
      <FormRow label="Password" error={errors?.password?.message}>
        <input
          className={styles.input}
          type="password"
          id="password"
          autoComplete="username"
          {...register("password", { required: "This field is required" })}
          disabled={isLogin}
        />
      </FormRow>
      <button className={styles.btn} disabled={isLogin}>
        Login
      </button>
    </form>
  );
}
