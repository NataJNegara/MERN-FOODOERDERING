import { useQuery } from "@tanstack/react-query";
import { getTags } from "../../services/apiFoods";

export function useTags() {
  const {
    isLoading,
    data: tags,
    error,
  } = useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });

  return { isLoading, tags, error };
}
