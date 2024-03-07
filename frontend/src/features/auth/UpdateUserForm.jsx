import { useEffect } from "react";
import FormRow from "../../components/FormRow/FormRow";
import { useUserById } from "./useUserById";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import styles from "./UpdateUserForm.module.css";
import { useUpdateUserById } from "./useUpdateUserById";

export default function UpdateUserForm() {
  const { isLoading, userById } = useUserById();
  const { isUpdating, updateUser } = useUpdateUserById();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset(userById);
  }, [userById, reset]);

  function onSubmit(data) {
    updateUser(data);
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <h1>Update User Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormRow label="Username" error={errors?.username?.message}>
          <input
            className={styles.input}
            type="text"
            id="username"
            {...register("username", { required: "This field is required" })}
          />
        </FormRow>
        <FormRow label="email" error={errors?.email?.message}>
          <input
            className={styles.input}
            type="email"
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please input a valid email address",
              },
            })}
          />
        </FormRow>
        <FormRow label="Address" error={errors?.address?.message}>
          <input
            className={styles.input}
            type="text"
            id="address"
            {...register("address", { required: "This field is required" })}
          />
        </FormRow>
        <FormRow label="Admin" error={errors?.isAdmin?.message}>
          <input
            className={styles.input}
            type="checkbox"
            id="isAdmin"
            {...register("isAdmin")}
          />
        </FormRow>

        <button className={styles.btn} disabled={isUpdating}>
          Update
        </button>
      </form>
    </div>
  );
}
