import {
  Box,
  Button,
  Checkbox,
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
    padding: theme.spacing(3),
    backgroundColor: theme.palette.common.white,
    outline: "none",
    borderRadius: theme.shape.borderRadius,
  };

  const headerStyle = {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(3),
  };

  const mainContainerStyle = {
    maxHeight: 400,
    overflow: "auto",
  };

  const itemContainerStyle = {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.secondary.main}`,
  };

  const itemNameStyle = {
    fontWeight: theme.typography.fontWeightBold,
  };

  const subItemContainerStyle = {
    marginLeft: theme.spacing(3),
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(3),
    gap: theme.spacing(2),
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
    // if (checkedItems?.length > 0) {
    const payload = { permissions: checkedItems };
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
    // }
  };

  const CustomBackdrop = () => {
    return (
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.25)", // Change the alpha value for transparency
        }}
      />
    );
  };

  console.log(checkedItems);

  return (
    <Stack width="auto" flexDirection="row">
      <Modal
        open={isTagging || false}
        onClose={() => {}}
        BackdropComponent={CustomBackdrop} // Use the custom backdrop
        BackdropProps={{
          timeout: 500, // Set the timeout for the backdrop transition (optional)
        }}
      >
        <Box sx={style}>
          <Typography variant="h6" sx={headerStyle}>
            Tagging of Permissions
          </Typography>
          {/* <Box sx={{ display: "flex", flexDirection: "row", mb: 1 }}>
            <Checkbox
              checked={checkedItems?.includes("No Permission for this user")}
              onChange={() => setCheckedItems(["No Permission for this user"])}
            />
            <Typography>No Permissions</Typography>
          </Box> */}
          <Box sx={mainContainerStyle}>
            {sidebarNavigationData?.map((item) => (
              <Box key={item.id} sx={itemContainerStyle}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Checkbox
                    checked={checkedItems?.includes(item.name)}
                    onChange={() => handleCheckboxChange(item.name)}
                  />
                  <Typography sx={itemNameStyle}>{item.name}</Typography>
                </Box>
                <Box sx={subItemContainerStyle}>
                  {item?.sub?.map((subItem) => (
                    <Box
                      key={subItem.id}
                      sx={{ display: "flex", flexDirection: "row" }}
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
              </Box>
            ))}
          </Box>
          <Box sx={buttonContainerStyle}>
            <Button variant="contained" color="primary" onClick={handleTagging}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="secondary"
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
