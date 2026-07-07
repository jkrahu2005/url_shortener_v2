import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Loader from "../common/Loader";

function PublicRoute({ children }) {
  const { loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  //   console.log({
  //   loading,
  //   isAuthenticated,
  // });

  if (loading) {
    return <Loader />;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default PublicRoute;