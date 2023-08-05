import {
  AccountBox,
  AddBusiness,
  AlignVerticalCenter,
  Approval,
  Dashboard,
  Dataset,
  Discount,
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
    Discount: <Discount />,
    AlignVerticalCenter: <AlignVerticalCenter />,
    Approval: <Approval />
  };

  return iconMap[iconName] || <IcecreamOutlined />;
};
