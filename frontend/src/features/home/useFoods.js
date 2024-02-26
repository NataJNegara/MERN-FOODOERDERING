import { useQuery } from "@tanstack/react-query";
import { getFoods } from "../../services/apiFoods";
import { useSearchParams } from "react-router-dom";

export function useFoods() {
  const [searchParams] = useSearchParams();
  // FILTER
  const filterValue = searchParams.get("tags");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "tags", value: filterValue };

  // //SEARCH
  // const search = searchParams.get("search");

  const {
    isLoading,
    data: foods,
    error,
  } = useQuery({
    queryKey: ["foods", filter],
    queryFn: () => getFoods({ filter }),
  });

  return { isLoading, foods, error };
}
