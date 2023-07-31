export const sidebarNavigationData = [
  {
    id: 1,
    path: "/admin-dashboard",
    name: "Admin Dashboard",
    icon: "Dashboard",
  },
  {
    id: 2,
    path: "/user-dashboard",
    name: "Dashboard",
    icon: "Dashboard",
  },
  {
    id: 3,
    path: "/user-management",
    name: "User Management",
    icon: "AccountBox",
    sub: [
      {
        id: 1,
        name: "User Account",
        path: "/user-management/user-account",
      },
      {
        id: 2,
        name: "User Role",
        path: "/user-management/user-role",
      },
      {
        id: 3,
        name: "Company",
        path: "/user-management/company",
      },
      {
        id: 4,
        name: "Department",
        path: "/user-management/department",
      },
      {
        id: 5,
        name: "Location",
        path: "/user-management/location",
      },
    ],
  },
  {
    id: 4,
    path: "/masterlist",
    name: "Masterlist",
    icon: "Dataset",
    sub: [
      {
        id: 1,
        name: "Products",
        path: "/masterlist/products",
      },
      {
        id: 2,
        name: "Meat Type",
        path: "/masterlist/meat-type",
      },
      {
        id: 3,
        name: "UOM",
        path: "/masterlist/uom",
      },
      {
        id: 4,
        name: "Discount Type",
        path: "/masterlist/discount-type",
      },
      {
        id: 5,
        name: "Terms",
        path: "/masterlist/terms",
      },
    ],
  },
  {
    id: 5,
    path: "/customer-registration",
    name: "Customer Registration",
    icon: "AddBusiness",
    sub: [
      {
        id: 1,
        path: "/prospect",
        name: "Prospect",
      },
      {
        id: 2,
        path: "/direct",
        name: "Direct",
      },
    ],
  },
  {
    id: 6,
    path: "/freebies",
    name: "Freebies",
    icon: "PostAdd",
  },
  {
    id: 7,
    path: "/inventory",
    name: "Inventory",
    icon: "Inventory",
    sub: [
      {
        id: 1,
        name: "MRP",
        path: "/inventory/mrp",
      },
      {
        id: 2,
        name: "Other",
        path: "/inventory/other",
      },
    ],
  },
];
