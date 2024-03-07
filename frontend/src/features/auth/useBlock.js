import { useMutation, useQueryClient } from "@tanstack/react-query";
import { block as blockApi } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useBlock() {
  const queryClient = useQueryClient();

  const { isLoading: isBlocking, mutate: block } = useMutation({
    mutationFn: blockApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isBlocking, block };
}
