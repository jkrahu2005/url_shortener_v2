import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../common/Loader";

function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;