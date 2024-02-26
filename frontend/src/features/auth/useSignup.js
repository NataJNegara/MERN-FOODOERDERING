import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const { isLoading: isSignup, mutate: signup } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success("Your account has been registered!");
      navigate("/login");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isSignup, signup };
}
