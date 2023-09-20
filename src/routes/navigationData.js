export const sidebarNavigationData = [
  // {
  //   id: 1,
  //   path: "/",
  //   name: "Admin Dashboard",
  //   icon: "Dashboard",
  // },
  // {
  //   id: 2,
  //   path: "/",
  //   name: "Dashboard",
  //   icon: "Dashboard",
  // },
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
    path: "/setup",
    name: "Setup",
    icon: "Dataset",
    sub: [
      {
        id: 1,
        name: "Products",
        path: "/setup/items",
      },
      {
        id: 2,
        name: "Product Category",
        path: "/setup/product-category",
      },
      {
        id: 3,
        name: "Product Sub Category",
        path: "/setup/product-sub-category",
      },
      {
        id: 4,
        name: "Meat Type",
        path: "/setup/meat-type",
      },
      {
        id: 5,
        name: "Unit of Measurements",
        path: "/setup/uom",
      },
      {
        id: 6,
        name: "Store Type",
        path: "/setup/store-type",
      },
    ],
  },
  {
    id: 5,
    path: "/discount",
    name: "Discount",
    icon: "Discount",
    sub: [
      {
        id: 1,
        name: "Discount Type",
        path: "/discount/discount-type",
      },
    ],
  },
  {
    id: 6,
    path: "/terms",
    name: "Terms",
    icon: "AlignVerticalCenter",
    sub: [
      {
        id: 1,
        name: "Term Days",
        path: "/terms/term-days",
      },
    ],
  },
  {
    id: 7,
    path: "/customer-registration",
    name: "Customer Registration",
    icon: "AddBusiness",
    sub: [
      {
        id: 1,
        path: "/customer-registration/prospect",
        name: "Prospect",
      },
      {
        id: 2,
        path: "/customer-registration/direct",
        name: "Direct",
      },
    ],
  },
  // {
  //   id: 8,
  //   path: "/freebies",
  //   name: "Freebies",
  //   icon: "PostAdd",
  // },
  {
    id: 9,
    path: "/approval",
    name: "Approval",
    icon: "Approval",
    sub: [
      // {
      //   id: 2,
      //   name: "Prospect Approval",
      //   path: "/approval/prospect-approval",
      // },
      {
        id: 1,
        name: "Freebie Approval",
        path: "/approval/freebie-approval",
      },
      {
        id: 2,
        name: "Direct Approval",
        path: "/approval/direct-approval",
      },
    ],
  },
  // {
  //   id: 10,
  //   path: "/inventory",
  //   name: "Inventory",
  //   icon: "Inventory",
  //   sub: [
  //     {
  //       id: 1,
  //       name: "MRP",
  //       path: "/inventory/mrp",
  //     },
  //     {
  //       id: 2,
  //       name: "Other",
  //       path: "/inventory/other",
  //     },
  //   ],
  // },
];

