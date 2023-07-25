import React from "react";
import { useSelector } from "react-redux";
import Layout from "../layout";
import { sidebarNavigationData } from "./navigationData";
import { useLocation } from "react-router-dom";
import { AccessDeniedDisplay } from "../components/Lottie-Components";

const PermittedRoutes = ({ isDrawer, closeDrawer, toggleDrawer }) => {
  const { pathname } = useLocation();
  const permissions = useSelector((state) => state.permissions.permissions);

  const allowedNavigationData = sidebarNavigationData.filter((item) => {
    return permissions.includes(item.name);
  });
  const currentNavItem = allowedNavigationData.find((item) =>
    pathname.includes(item.path)
  );
  const currentSubNav = currentNavItem?.sub?.filter((subItem) =>
    permissions.includes(subItem.name)
  );

  const permittedParentPath = allowedNavigationData?.map((item) => {
    return permissions?.includes(item.name) ? item.path : null;
  });

  const permittedSubPath = currentSubNav?.map((item) => {
    return permissions?.includes(item.name) ? item.path : null;
  });

  if (
    permittedParentPath?.includes(pathname) ||
    permittedSubPath?.includes(pathname) ||
    pathname === "/"
  ) {
    return (
      <Layout
        isDrawer={isDrawer}
        closeDrawer={closeDrawer}
        toggleDrawer={toggleDrawer}
      />
    );
  }

  return <><AccessDeniedDisplay text={'You are not permitted to access this page'} /></>;
};

export default PermittedRoutes;
