import {
  AccountBox,
  Dashboard,
  Dataset,
  IcecreamOutlined,
  Inventory,
} from "@mui/icons-material";

export const getIconElement = (iconName) => {
  const iconMap = {
    Dashboard: <Dashboard />,
    AccountBox: <AccountBox />,
    Dataset: <Dataset />,
    Inventory: <Inventory />,
  };

  return iconMap[iconName] || <IcecreamOutlined />;
};
