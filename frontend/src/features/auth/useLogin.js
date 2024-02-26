import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isLogin, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      // what if i dont set the query data
      queryClient.setQueryData(["user"], user);
      toast.success("Login successfully");
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(err.response.data.error);
    },
  });

  return { isLogin, login };
}
