import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePassword as updatePasswordApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useUpdatePassword() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdatePassword, mutate: updatePassword } = useMutation({
    mutationFn: updatePasswordApi,
    onSuccess: () => {
      toast.success("Password change successfully");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdatePassword, updatePassword };
}
