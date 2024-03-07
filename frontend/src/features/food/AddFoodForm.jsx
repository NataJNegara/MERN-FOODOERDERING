import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useFood } from "./useFood";
import FormRow from "../../components/FormRow/FormRow";
import styles from "./AddFoodForm.module.css";
import { useEffect, useState } from "react";
import { uploadImage } from "../../services/apiUpload";
import LoadingSpinner from "../../components/Spinner/LoadingSpinner";
import { useUpdate } from "./useUpdate";
import { useAddFood } from "./useAddFood";

export default function AddFoodForm() {
  const { foodId } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const isEdit = Boolean(foodId);

  const { food, isLoading } = useFood();
  const { isUpdating, update } = useUpdate();
  const { isAdding, addFood } = useAddFood();

  const isWorking = isAdding || isUpdating;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: isEdit ? food : {} });

  useEffect(() => {
    reset(food);
    setImageUrl(food?.imageUrl);
  }, [food?.imageUrl, reset, food]);

  function onSubmit(data) {
    const food = { ...data, imageUrl };

    // if edit session
    if (isEdit) {
      update(food);
      return;
    }

    // create session
    addFood(food);
  }

  const upload = async (event) => {
    setImageUrl(null);
    const imageUrl = await uploadImage(event);
    setImageUrl(imageUrl);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <h1>{isEdit ? "Edit Form" : "Add Form"}</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormRow label="Image">
          <input
            className={styles.input}
            type="file"
            id="imageUrl"
            accept="image/jpeg"
            onChange={upload}
            disabled={isWorking}
          />
        </FormRow>

        {imageUrl && (
          <a href={imageUrl} target="blank" className={styles.image_link}>
            <img src={imageUrl} alt="Uploaded img" />
          </a>
        )}

        <FormRow label="Name" error={errors?.name?.message}>
          <input
            className={styles.input}
            type="text"
            id="name"
            {...register("name", { required: "This field is required" })}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="Price" error={errors?.price?.message}>
          <input
            className={styles.input}
            type="number"
            id="price"
            {...register("price", { required: "This field is required" })}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="Tags" error={errors?.tags?.message}>
          <input
            className={styles.input}
            type="text"
            id="tags"
            {...register("tags", { required: "This field is required" })}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="Origins" error={errors?.origins?.message}>
          <input
            className={styles.input}
            type="text"
            id="origins"
            {...register("origins", { required: "This field is required" })}
            disabled={isWorking}
          />
        </FormRow>
        <FormRow label="Preparing Time" error={errors?.preparingTime?.message}>
          <input
            className={styles.input}
            type="text"
            id="preparingTime"
            {...register("preparingTime", {
              required: "This field is required",
            })}
            disabled={isWorking}
          />
        </FormRow>

        <button className={styles.btn} disabled={isWorking}>
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
