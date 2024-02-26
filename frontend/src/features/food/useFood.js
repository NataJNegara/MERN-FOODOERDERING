import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getFoodByID } from "../../services/apiFoods";

export function useFood() {
  const { foodId } = useParams();

  const {
    data: food,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["food", foodId],
    queryFn: () => getFoodByID(foodId),
    retry: false,
  });

  return { food, isLoading, error };
}
