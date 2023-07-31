import {
  Box,
  Button,
  Checkbox,
  Divider,
  Modal,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../services/store/disclosureSlice";
import { sidebarNavigationData } from "../../../routes/navigationData"; // Replace with the actual path
import { useUpdateTaggedUserRoleMutation } from "../../../services/api";
import { BasicToast } from "../../../components/SweetAlert-Components";

const Tagging = () => {
  const theme = useTheme();
  const [updateTaggedUserRole] = useUpdateTaggedUserRoleMutation();
  const dispatch = useDispatch();
  const { isTagging } = useSelector((state) => state.disclosure.modals);
  const { selectedRowData } = useSelector((state) => state.selectedRowData);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "white",
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: 24,
    p: 4,
  };

  const [checkedItems, setCheckedItems] = useState([]);

  useEffect(() => {
    if (selectedRowData?.permissions) {
      setCheckedItems(selectedRowData.permissions);
    } else {
      setCheckedItems([]); // Set to empty array if row.permissions is null
    }
  }, [selectedRowData]);

  const handleCheckboxChange = (itemName, subItemName) => {
    if (!subItemName) {
      // If it's an item.name checkbox, toggle its state
      if (checkedItems.includes(itemName)) {
        // Uncheck the main item and remove it from checkedItems
        setCheckedItems(checkedItems.filter((item) => item !== itemName));
      } else {
        // Check the main item and add it to checkedItems
        setCheckedItems([...checkedItems, itemName]);
      }
    } else {
      // If it's an itemSub.name checkbox, toggle its state and check parent if needed
      const subItemValue = subItemName;
      if (checkedItems.includes(subItemValue)) {
        // Uncheck the sub item and remove it from checkedItems
        setCheckedItems(checkedItems.filter((item) => item !== subItemValue));
      } else {
        // Check the sub item and add it to checkedItems
        setCheckedItems([...checkedItems, subItemValue]);
        // Check the main item and add it to checkedItems if all of its sub items are checked
        const allSubItemsChecked = sidebarNavigationData
          .find((item) => item.name === itemName)
          ?.sub?.every((subItem) =>
            checkedItems.includes(`${itemName}:${subItem.name}`)
          );

        if (allSubItemsChecked) {
          setCheckedItems([...checkedItems, itemName]);
        }
      }
    }
  };

  const handleTagging = async () => {
    if (checkedItems?.length > 0) {
      const payload = { permissions: checkedItems };
      console.log(payload)
      try {
        await updateTaggedUserRole({
          payload: payload,
          id: selectedRowData?.id,
        });
        BasicToast(
          "success",
          `Permissions for ${selectedRowData?.roleName} has been updated`,
          1500
        );
        dispatch(toggleModal("isTagging"));
      } catch (error) {}
    }
  };

  return (
    <Stack width="auto" flexDirection="row">
      <Modal open={isTagging || false} onClose={() => {}}>
        <Box sx={style}>
          <Typography mb={3}>Tagging of Permissions</Typography>
          <Box sx={{ maxHeight: "600px", overflow: "auto" }}>
            {sidebarNavigationData?.map((item) => (
              <Stack key={item.id} sx={{ border: "2px solid black" }}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Checkbox
                    checked={checkedItems?.includes(item.name)}
                    onChange={() => handleCheckboxChange(item.name)}
                  />
                  <Typography>{item.name}</Typography>
                </Box>
                <Box marginLeft={2} mb={2}>
                  {item?.sub?.map((subItem) => (
                    <Box
                      sx={{ display: "flex", flexDirection: "row" }}
                      key={subItem.id}
                    >
                      <Checkbox
                        checked={checkedItems?.includes(subItem.name)}
                        onChange={() =>
                          handleCheckboxChange(item.name, subItem.name)
                        }
                      />
                      <Typography>{subItem.name}</Typography>
                    </Box>
                  ))}
                </Box>
              </Stack>
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", mt: 3, gap: 1 }}>
            <Button
              sx={{
                bgcolor: theme.palette.secondary.main,
                color: theme.palette.common.white,
                ":hover": {
                  color: theme.palette.common.white,
                  bgcolor: theme.palette.primary.main,
                  variant: "contained",
                },
              }}
              onClick={handleTagging}
            >
              Save
            </Button>
            <Button
              sx={{ bgcolor: "witesmoke", color: theme.palette.secondary.main }}
              onClick={() => dispatch(toggleModal("isTagging"))}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Stack>
  );
};

export default Tagging;
