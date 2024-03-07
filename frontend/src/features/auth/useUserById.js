import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/apiAuth";
import { useParams } from "react-router-dom";

export function useUserById() {
  const { userId } = useParams();

  const { isLoading, data: userById } = useQuery({
    queryFn: () => getUserById(userId),
    queryKey: ["userById", userId],
  });

  return { isLoading, userById };
}
