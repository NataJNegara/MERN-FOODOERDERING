import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFood as addFoodApi } from "../../services/apiFoods";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useAddFood() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isAdding, mutate: addFood } = useMutation({
    mutationFn: addFoodApi,
    onSuccess: () => {
      toast.success("Food added successfully");
      queryClient.invalidateQueries({
        queryKey: ["foods"],
      });
      navigate(-1, { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isAdding, addFood };
}
