import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !currentUser) {
      Swal.fire({
        title: "Login Required",
        text: "Please login to access this feature.",
        icon: "warning",
        confirmButtonColor: "#2563eb",
        confirmButtonText: "Go to Login",
      });
    }
  }, [loading, currentUser]);

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  }

  if (currentUser) {
    return children;
  }

  // Redirect after alert
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
