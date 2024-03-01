import { useForm } from "react-hook-form";
import FormRow from "../../components/FormRow/FormRow";
import styles from "./ChangePasswordForm.module.css";
import { useUpdatePassword } from "./useUpdatePassword";

export default function ChangePasswordForm() {
  const { isUpdatePassword, updatePassword } = useUpdatePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  function onSubmit(data) {
    const newPassword = {
      currPassword: data.currPassword,
      newPassword: data.newPassword,
    };
    updatePassword(newPassword, { onSettled: reset() });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Current Password" error={errors?.currPassword?.message}>
        <input
          type="password"
          id="currPassword"
          className={styles.input}
          {...register("currPassword", { required: "This field is required!" })}
          disabled={isUpdatePassword}
        />
      </FormRow>
      <FormRow label="New Password" error={errors?.newPassword?.message}>
        <input
          type="password"
          id="newPassword"
          className={styles.input}
          {...register("newPassword", {
            required: "This field is required!",
            minLength: {
              value: 8,
              message: "password should be at least 8 characters",
            },
          })}
          disabled={isUpdatePassword}
        />
      </FormRow>
      <FormRow
        label="Confirm New Password"
        error={errors?.newPassword2?.message}>
        <input
          type="password"
          id="newPassword2"
          className={styles.input}
          {...register("newPassword2", {
            required: "This field is required!",
            validate: (value) =>
              value === getValues("newPassword") || "New password is not match",
          })}
          disabled={isUpdatePassword}
        />
      </FormRow>
      <button className={styles.button} disabled={isUpdatePassword}>
        Change Password
      </button>
    </form>
  );
}
