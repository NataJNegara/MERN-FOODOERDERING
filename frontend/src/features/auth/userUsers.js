import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../services/apiAuth";

export function useUsers() {
  const { isLoading, data: users } = useQuery({
    queryFn: getUsers,
    queryKey: ["users"],
  });

  return { isLoading, users };
}
