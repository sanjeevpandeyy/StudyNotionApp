import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Privateroute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  console.log("Token:", token);
  console.log("User:", user);

  if (token && user) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default Privateroute;

