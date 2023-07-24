
export const sidebarNavigationData = [
  {
    id: 1,
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
    ],
  },
  {
    id: 2,
    path: "/setup",
    name: "Setup",
    icon: "Dataset",
    sub: [
      {
        id: 1,
        name: "Products",
        path: "/setup/products",
      },
      {
        id: 2,
        name: "Groups",
        path: "/setup/groups",
      },
    ],
  },
  {
    id: 3,
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
