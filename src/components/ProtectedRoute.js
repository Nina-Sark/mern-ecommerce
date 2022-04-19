import Cookies from "js-cookie";
import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({
  children,
  redirect,
}) => {
  const user = Cookies.get("auth");

  if (!user) {
    return <Navigate to={redirect} />;
  }

  return children;
};