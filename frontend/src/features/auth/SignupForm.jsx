import { useForm } from "react-hook-form";
import FormRow from "../../components/FormRow/FormRow";
import styles from "./LoginForm.module.css";
import { useSignup } from "./useSignup";

export default function SignupForm() {
  const { isSignup, signup } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  function onSubmit({ email, username, password, address }) {
    signup({ email, username, password, address });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Username" error={errors?.username?.message}>
        <input
          className={styles.input}
          type="username"
          id="username"
          autoComplete="username"
          {...register("username", { required: "This field is required" })}
          disabled={isSignup}
        />
      </FormRow>
      <FormRow label="Email" error={errors?.email?.message}>
        <input
          className={styles.input}
          type="email"
          id="email"
          autoComplete="username"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please input a valid email address",
            },
          })}
          disabled={isSignup}
        />
      </FormRow>
      <FormRow label="Password" error={errors?.password?.message}>
        <input
          className={styles.input}
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password should be at least 8 characters",
            },
          })}
          disabled={isSignup}
        />
      </FormRow>
      <FormRow label="Confirm Password" error={errors?.password2?.message}>
        <input
          className={styles.input}
          type="password"
          id="password2"
          {...register("password2", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Password is not match",
          })}
          disabled={isSignup}
        />
      </FormRow>
      <FormRow label="Address" error={errors?.address?.message}>
        <input
          className={styles.input}
          type="text"
          id="address"
          {...register("address", { required: "This field is required" })}
          disabled={isSignup}
        />
      </FormRow>
      <button className={styles.btn} disabled={isSignup}>
        Login
      </button>
    </form>
  );
}
