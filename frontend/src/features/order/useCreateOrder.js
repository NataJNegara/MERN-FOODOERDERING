import { useMutation } from "@tanstack/react-query";
import { createOrder as createOrderApi } from "../../services/apiOrder";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useCreateOrder() {
  const navigate = useNavigate();
  const { isLoading: isCreatingOrder, mutate: createOrder } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: () => {
      toast.success("Order created!");
      navigate("/payment");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreatingOrder, createOrder };
}
