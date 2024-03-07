import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFood as deleteFoodApi } from "../../services/apiFoods";
import { toast } from "react-toastify";

export function useDeleteFood() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteFood } = useMutation({
    mutationFn: deleteFoodApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["foods"],
      });
      toast.success("Food deleted successfully");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteFood };
}
