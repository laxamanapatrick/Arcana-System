import React from "react";
import Login from "../pages/login/Login";
import { useRoutes } from "react-router-dom";
import { useDisclosure } from "../hooks/useDisclosure";
import UserManagement from "../pages/user-management";
import { UserAccount } from "../pages/user-management/user-account/User-Account";
import { UserRole } from "../pages/user-management/user-role/User-Role";
import Setup from "../pages/setup/masterlist";
import { Products } from "../pages/setup/masterlist/products/Products";
import Inventory from "../pages/setup/inventory";
import { MRP } from "../pages/setup/inventory/mrp/MRP";
import AuthenticatedRoutes from "./Authenticated-Routes";
import { PageNotFound } from "../components/Lottie-Components";

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
      path: "*",
      element: <PageNotFound text={''} />,
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
