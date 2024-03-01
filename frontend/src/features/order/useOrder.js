import { useQuery } from "@tanstack/react-query";
import { getCurrOrder } from "../../services/apiOrder";

export function useOrder() {
  const { isLoading, data: order } = useQuery({
    queryFn: getCurrOrder,
    queryKey: ["userOrder"],
  });
  return { isLoading, order };
}
