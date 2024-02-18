import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ( props ) => {
  console.log("props",props)
  const {Component}=props
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return <div>
    <Component/>
  </div>
};

export default PrivateRoute;
