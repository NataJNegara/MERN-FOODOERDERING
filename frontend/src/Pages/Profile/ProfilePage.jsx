import FormRow from "../../components/FormRow/FormRow";
import { useUser } from "../../features/auth/useUser";
import { useForm } from "react-hook-form";
import styles from "./ProfilePage.module.css";
import { useUpdateUser } from "../../features/auth/useUpdateUser";
import ChangePasswordForm from "../../features/auth/ChangePasswordForm";

export default function ProfilePage() {
  const { user } = useUser();

  const { isUpdating, updateUser } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    updateUser(data);
  }

  return (
    <div className={styles.container}>
      <h1>Profile Page</h1>

      <div className={styles.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormRow label="User Name" error={errors?.username?.message}>
            <input
              type="text"
              id="username"
              className={styles.input}
              defaultValue={user.username}
              {...register("username", { required: "This field is required!" })}
              disabled={isUpdating}
            />
          </FormRow>
          <FormRow label="Address" error={errors?.address?.message}>
            <input
              type="text"
              id="address"
              className={styles.input}
              defaultValue={user.address}
              {...register("address", { required: "This field is required!" })}
              disabled={isUpdating}
            />
          </FormRow>
          <button className={styles.button} disabled={isUpdating}>
            Update
          </button>
        </form>

        <div className={styles.password_container}>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
