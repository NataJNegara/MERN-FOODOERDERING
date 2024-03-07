import { useMutation, useQueryClient } from "@tanstack/react-query";
import { update as updateApi } from "../../services/apiFoods";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useUpdate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: update } = useMutation({
    mutationFn: updateApi,
    onSuccess: () => {
      toast.success("Food updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["foods"],
      });
      navigate(-1, { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, update };
}
