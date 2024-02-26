import { useNavigate } from "react-router-dom";
import { useUser } from "../../features/auth/useUser";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return !user ? children : null;
}
