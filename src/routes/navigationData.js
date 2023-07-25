
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
    ],
  },
  {
    id: 3,
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

// const subNavigationHeight = 8;
// <Box
//   height={`${subNavigationHeight}%`}
//   maxHeight={`${subNavigationHeight}%`}
//   display="flex"
//   alignItems="center"
//   color={theme.palette.secondary.main}
//   px={2}
// >
//   <Typography sx={{ textDecoration: "underline" }}>Sub Navigation</Typography>
// </Box>;