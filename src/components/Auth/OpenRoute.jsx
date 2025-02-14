import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function OpenRoute({ children }) {
  const { token, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (token === null) {
    return children;
  } else {
    if (user.role === "user") {
      navigate("/dashboard-user");
    } else {
      navigate("/dashboard");
    }
  }
}

export default OpenRoute;
