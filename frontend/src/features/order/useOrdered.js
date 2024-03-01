import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../../services/apiOrder";
import { useParams } from "react-router-dom";

export function useOrdered() {
  const { orderId } = useParams();

  const { isLoading, data: ordered } = useQuery({
    queryKey: ["ordered", orderId],
    queryFn: () => getOrderById(orderId),
    retry: false,
  });

  return { isLoading, ordered };
}
