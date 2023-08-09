import React from "react";
import { useRoutes } from "react-router-dom";
import Login from "../pages/login/Login";
import AuthenticatedRoutes from "./Authenticated-Routes";
import { PageNotFound } from "../components/Lottie-Components";
import UserManagement from "../pages/user-management";
import { UserAccount } from "../pages/user-management/user-account/User-Account";
import { UserRole } from "../pages/user-management/user-role/User-Role";
import { Company } from "../pages/user-management/company/Company";
import { Department } from "../pages/user-management/department/Department";
import { Location } from "../pages/user-management/location/Location";
import Setup from "../pages/setup/masterlist";
import { Items } from "../pages/setup/masterlist/products/Items";
import { ProductCategory } from "../pages/setup/masterlist/products/Product-Category";
import { ProductSubCategory } from "../pages/setup/masterlist/products/Product-Sub-Category";
import { MeatType } from "../pages/setup/masterlist/products/Meat-Type";
import { UOM } from "../pages/setup/masterlist/uom/UOM";
import Discount from "../pages/setup/discount/index";
import { DiscountType } from "../pages/setup/discount/discount-type/Discount-Type";
import Terms from "../pages/setup/terms";
import { TermDays } from "../pages/setup/terms/terms-and-conditions/TermDays";
import Inventory from "../pages/setup/inventory";
import { MRP } from "../pages/setup/inventory/mrp/MRP";
import CustomerRegistration from "../pages/customer-registration/index.jsx";
import { Prospect } from "../pages/customer-registration/prospect/Prospect";
import Approval from "../pages/approval";
import { ProspectApproval } from "../pages/approval/prospect-approval/Prospect-Approval";
import { FreebieApproval } from "../pages/approval/freebie-approval/Freebie-Approval";
import StoreType from "../pages/setup/masterlist/products/Store-Type";

const Routing = () => {
  let routing = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <PageNotFound text={""} />,
    },
    {
      path: "/",
      element: <AuthenticatedRoutes />,
      children: [
        {
          path: "user-management",
          element: <UserManagement />,
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
          path: "setup",
          element: <Setup />,
          children: [
            {
              path: "items",
              element: <Items />,
            },
            {
              path: "product-category",
              element: <ProductCategory />,
            },
            {
              path: "product-sub-category",
              element: <ProductSubCategory />,
            },
            {
              path: "meat-type",
              element: <MeatType />,
            },
            {
              path: "uom",
              element: <UOM />,
            },
            {
              path: "store-type",
              element: <StoreType />,
            },
          ],
        },
        {
          path: "discount",
          element: <Discount />,
          children: [
            {
              path: "discount-type",
              element: <DiscountType />,
            },
          ],
        },
        {
          path: "terms",
          element: <Terms />,
          children: [
            {
              path: "term-days",
              element: <TermDays />,
            },
          ],
        },
        {
          path: "customer-registration",
          element: <CustomerRegistration />,
          children: [
            {
              path: "prospect",
              element: <Prospect />,
            },
            {
              path: "direct",
              element: "",
            },
          ],
        },
        {
          path: "approval",
          element: <Approval />,
          children: [
            {
              path: "prospect-approval",
              element: <ProspectApproval />,
            },
            {
              path: "freebie-approval",
              element: <FreebieApproval />,
            },
            {
              path: "direct-approval",
              element: "",
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
