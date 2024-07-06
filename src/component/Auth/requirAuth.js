import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const token = localStorage.getItem("token_user");
  if (token) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} />;
  }
};
export default RequireAuth;
