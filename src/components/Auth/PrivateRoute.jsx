import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role === "user") {
      navigate("/dashboard-user");
    } else {
      navigate("/dashboard");
    }
  }, [token, user, navigate]);

  return token ? children : null;
};

export default PrivateRoute;
