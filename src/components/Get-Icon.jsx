import {
  AccountBox,
  AddBusiness,
  Dashboard,
  Dataset,
  IcecreamOutlined,
  Inventory,
  PostAdd,
} from "@mui/icons-material";

export const getIconElement = (iconName) => {
  const iconMap = {
    Dashboard: <Dashboard />,
    AccountBox: <AccountBox />,
    Dataset: <Dataset />,
    Inventory: <Inventory />,
    AddBusiness: <AddBusiness />,
    PostAdd: <PostAdd />,
  };

  return iconMap[iconName] || <IcecreamOutlined />;
};
