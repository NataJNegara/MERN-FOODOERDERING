import { useMutation } from "@tanstack/react-query";
import { updateUserById as updateUserByIdApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function useUpdateUserById() {
  const navigate = useNavigate();

  const { isLoading: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateUserByIdApi,
    onSuccess: () => {
      toast.success("User has been updated successfully");
      navigate(-1, { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateUser };
}
