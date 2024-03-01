import { useNavigate } from "react-router-dom";
import { useUser } from "../../features/auth/useUser";
import { useEffect } from "react";
import LoadingSpinner from "../Spinner/LoadingSpinner";

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading) {
      navigate("/login");
    }
  }, [user, navigate, isLoading]);

  if (isLoading) return <LoadingSpinner />;

  return user ? children : null;
}
