import { useQuery } from "@tanstack/react-query";
import { getCurrOrders } from "../../services/apiOrder";
import { useSearchParams } from "react-router-dom";

export function useOrders() {
  const [searchParams] = useSearchParams();
  // filter
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const { isLoading, data: orders } = useQuery({
    queryFn: () => getCurrOrders({ filter }),
    queryKey: ["userOrders", filter],
  });
  return { isLoading, orders };
}
