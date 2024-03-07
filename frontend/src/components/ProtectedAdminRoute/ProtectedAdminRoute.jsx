import { useEffect } from "react";
import { useUser } from "../../features/auth/useUser";
import LoadingSpinner from "../Spinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.isAdmin) {
      navigate("/dashboard");
    }
  }, [user.isAdmin, navigate]);

  if (isLoading) return <LoadingSpinner />;

  return user ? children : null;
}
