import React from "react";
import Login from "../pages/login/Login";
import { useRoutes } from "react-router-dom";
import UserManagement from "../pages/user-management";
import { UserAccount } from "../pages/user-management/user-account/User-Account";
import { UserRole } from "../pages/user-management/user-role/User-Role";
import { Company } from "../pages/user-management/company/Company";
import { Department } from "../pages/user-management/department/Department";
import { Location } from "../pages/user-management/location/Location";
import Setup from "../pages/setup/masterlist";
import { Products } from "../pages/setup/masterlist/products/Products";
import Inventory from "../pages/setup/inventory";
import { MRP } from "../pages/setup/inventory/mrp/MRP";
import AuthenticatedRoutes from "./Authenticated-Routes";
import { PageNotFound } from "../components/Lottie-Components";

const Routing = () => {
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
        />
      ),
      children: [
        {
          path: "user-management",
          element: <UserManagement  />,
          children: [
            {
              path: "user-account",
              element: <UserAccount />,
            },
            {
              path: "user-role",
              element: <UserRole />,
            },
            {
              path: "company",
              element: <Company />,
            },
            {
              path: "department",
              element: <Department />,
            },
            {
              path: "location",
              element: <Location />,
            },
          ],
        },
        {
          path: "masterlist",
          element: <Setup  />,
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
            {
              path: "other",
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
