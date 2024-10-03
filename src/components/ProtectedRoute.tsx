import React from "react";
import { auth } from "../firebase/firebase";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute: React.FC = () => {
  const [user, setUser] = React.useState(auth.currentUser);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  React.useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? <Outlet /> : null;
};

export default ProtectedRoute;
