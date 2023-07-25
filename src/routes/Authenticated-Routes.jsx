import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import PermittedRoutes from "./Permitted-Routes";

const AuthenticatedRoutes = ({ isDrawer, closeDrawer, toggleDrawer }) => {
  const fullname = useSelector((state) => state.fullname.fullname);
  const permissions = useSelector((state) => state.permissions.permissions);

  return !fullname || permissions?.length === 0 ? (
    <Navigate to="/login" />
  ) : (
    <PermittedRoutes
      isDrawer={isDrawer}
      closeDrawer={closeDrawer}
      toggleDrawer={toggleDrawer}
    />
  );
};

export default AuthenticatedRoutes;
