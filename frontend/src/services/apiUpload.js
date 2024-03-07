import axios from "axios";
import { toast } from "react-toastify";

export const uploadImage = async (event) => {
  let toastId = null;
  const image = await getImage(event);
  if (!image) return null;

  const formData = new FormData();
  formData.append("image", image, image.name);
  const res = await axios.post("/api/upload/", formData, {
    onUploadProgress: ({ progress }) => {
      if (toastId) toast.update(toastId, { progress });
      else toastId = toast.success("Uploading...", { progress });
    },
  });
  toast.dismiss(toastId);
  return res.data.imageUrl;
};

const getImage = async (event) => {
  const files = event.target.files;
  if (!files || files.length <= 0) {
    toast.warning("Upload file is not selected", "File Upload");
    return null;
  }

  const file = files[0];

  if (file.type !== "image/jpeg") {
    toast.error("Only image type is allowed", "File type error");
    return null;
  }

  return file;
};
