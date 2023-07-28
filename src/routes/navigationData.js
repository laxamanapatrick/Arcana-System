
export const sidebarNavigationData = [
  {
    id: 1,
    path: "/dashboard",
    name: "Dashboard",
    icon: "Dashboard",
  },
  {
    id: 2,
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
    id: 3,
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
        name: "Groups",
        path: "/masterlist/groups",
      },
      {
        id: 3,
        name: "Discount Type",
        path: "/masterlist/discount-type",
      },
    ],
  },
  {
    id: 4,
    path: "/inventory",
    name: "Inventory",
    icon: "Inventory",
    sub: [
      {
        id: 1,
        name: "MRP",
        path: "/inventory/mrp",
      },
    ],
  },
];
