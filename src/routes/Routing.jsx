import React from "react";
import Login from "../pages/login/Login";
import Layout from "../layout";
import { Navigate, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDisclosure } from "../hooks/useDisclosure";
import UserManagement from "../pages/user-management";
import { UserAccount } from "../pages/user-management/user-account/User-Account";
import { UserRole } from "../pages/user-management/user-role/User-Role";
import Setup from "../pages/setup/masterlist";
import { Products } from "../pages/setup/masterlist/products/Products";
import Inventory from "../pages/setup/inventory";
import { MRP } from "../pages/setup/inventory/mrp/MRP";

const AuthenticatedRoutes = ({ isDrawer, closeDrawer, toggleDrawer }) => {
  const fullname = useSelector((state) => state.fullname.fullname);
  const permissions = useSelector((state) => state.permissions.permissions);

  return !fullname || permissions?.length === 0 ? (
    <Navigate to="/login" />
  ) : (
    <Layout
      isDrawer={isDrawer}
      closeDrawer={closeDrawer}
      toggleDrawer={toggleDrawer}
    />
  );
};

const Routing = () => {
  const {
    isOpen: isDrawer,
    onClose: closeDrawer,
    onToggle: toggleDrawer,
  } = useDisclosure();
  let routing = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <AuthenticatedRoutes
          isDrawer={isDrawer}
          closeDrawer={closeDrawer}
          toggleDrawer={toggleDrawer}
        />
      ),
      children: [
        {
          path: "user-management",
          element: <UserManagement toggleDrawer={toggleDrawer} />,
          children: [
            {
              path: "user-account",
              element: <UserAccount />,
            },
            {
              path: "user-role",
              element: <UserRole />,
            },
          ],
        },
        {
          path: "setup",
          element: <Setup toggleDrawer={toggleDrawer} />,
          children: [
            {
              path: "products",
              element: <Products />,
            },
          ],
        },
        {
          path: "inventory",
          element: <Inventory />,
          children: [
            {
              path: "mrp",
              element: <MRP />,
            },
          ],
        },
      ],
    },
  ]);

  return routing;
};

export default Routing;
