import {
  AccountBox,
  Dataset,
  IcecreamOutlined,
  Inventory,
} from "@mui/icons-material";

export const getIconElement = (iconName) => {
  const iconMap = {
    AccountBox: <AccountBox />,
    Dataset: <Dataset />,
    Inventory: <Inventory />,
  };

  return iconMap[iconName] || <IcecreamOutlined />;
};
