import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { directCustomerDetails } from "../../../../../schema";
import {
  Box,
  Stack,
  Typography,
  TextField as MuiTextField,
  Checkbox,
} from "@mui/material";
import { Textfield } from "../../../../../components/Fields";
import { setClientDetails } from "../../../../../services/store/customerDetailsSlice";
import { useDispatch } from "react-redux";

export const CustomerDetails = ({ selectedRowData, fields, setCanNext }) => {
  const requiredFieldLabelStyle = {
    "& .MuiFormLabel-root": {
      color: "red !important",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black !important",
    },
    "& .MuiInputLabel-root.MuiInputLabel-shrink": {
      color: "black !important",
    },
  };

  const dispatch = useDispatch();

  const {
    watch,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(directCustomerDetails),
    defaultValues: fields.customer_details,
  });

  const handleSameAddress = (isChecked) => {
    if (isChecked) {
      setValue("businessAddress", selectedRowData?.address);
    }
  };

  const handleCheckboxChecked = () => {
    let isChecked;
    if (selectedRowData?.address !== watch("businessAddress")) {
      isChecked = false;
    } else {
      isChecked = true;
    }
    return isChecked;
  };

  const isRequiredFieldsFilled = () => {
    const formData = getValues();
    if (
      watch("businessAddress") &&
      watch("representativeName") &&
      watch("representativePosition") &&
      watch("cluster")
    ) {
      dispatch(setClientDetails(formData));
      setCanNext(true);
    } else {
      setCanNext(false);
    }
  };

  useEffect(() => {
    isRequiredFieldsFilled();

    return () => {
      setCanNext(false);
    };
  }, [
    watch("businessAddress"),
    watch("representativeName"),
    watch("representativePosition"),
    watch("cluster"),
  ]);

  return (
    <>
      <Stack component="form" justifyContent="space-between" gap={4}>
        <Stack gap={1}>
          <Typography
            fontWeight="bold"
            fontSize="13px"
            textTransform="uppercase"
          >
            Business Name
          </Typography>
          <Box display="flex" flexDirection="row" gap={1}>
            <MuiTextField
              value={selectedRowData?.businessName || ""}
              label="Name"
              size="small"
              fullWidth
              variant="filled"
              sx={{ background: "#c5c9c6" }}
              inputProps={{
                readOnly: true,
                style: {
                  cursor: "not-allowed",
                },
              }}
            />
          </Box>
        </Stack>
        <Stack gap={1}>
          <Typography
            fontWeight="bold"
            fontSize="13px"
            textTransform="uppercase"
          >
            Customer's Information
          </Typography>
          <Box display="flex" flexDirection="row" gap={1}>
            <MuiTextField
              value={selectedRowData?.ownersName || ""}
              label="Owner's Name"
              size="small"
              fullWidth
              variant="filled"
              sx={{ background: "#c5c9c6" }}
              inputProps={{
                readOnly: true,
                style: {
                  cursor: "not-allowed",
                },
              }}
            />
          </Box>
        </Stack>
        <Stack gap={1}>
          <Typography
            fontWeight="bold"
            fontSize="13px"
            textTransform="uppercase"
          >
            Owner's Address
          </Typography>
          <Box display="flex" flexDirection="row" gap={1}>
            <MuiTextField
              value={selectedRowData?.address || ""}
              label="Name"
              size="small"
              fullWidth
              variant="filled"
              sx={{ background: "#c5c9c6" }}
              inputProps={{
                readOnly: true,
                style: {
                  cursor: "not-allowed",
                },
              }}
            />
          </Box>
        </Stack>

        <Stack gap={1}>
          <Typography
            fontWeight="bold"
            fontSize="13px"
            textTransform="uppercase"
          >
            Business Address (Same as Owner's Address
            <Checkbox
              checked={handleCheckboxChecked()}
              onChange={(e) => handleSameAddress(e.target.checked)}
              sx={{ mb: "2.5px" }}
            />
            )
          </Typography>
          <Box display="flex" flexDirection="row" gap={1}>
            <Textfield
              required
              sx={requiredFieldLabelStyle}
              name="businessAddress"
              control={control}
              label={`Block Number, Street, Barangay, City, Province, Zip Code`}
              size="small"
              autoComplete="off"
            />
          </Box>
        </Stack>
        <Stack gap={1}>
          <Typography
            fontWeight="bold"
            fontSize="13px"
            textTransform="uppercase"
          >
            Name of Authorized Representative
          </Typography>
          <Box display="flex" flexDirection="row" gap={1}>
            <Textfield
              required
              sx={requiredFieldLabelStyle}
              name="representativeName"
              control={control}
              label={`Givent Name, Middle Name(Optional), Last Name, Suffix`}
              size="small"
              autoComplete="off"
            />
          </Box>
        </Stack>
        <Stack gap={1}>
          <Typography
            fontWeight="bold"
            fontSize="13px"
            textTransform="uppercase"
          >
            Cluster
          </Typography>
          <Textfield
            required
            sx={requiredFieldLabelStyle}
            name="cluster"
            control={control}
            label="Cluster"
            size="small"
            autoComplete="off"
            type="number"
            inputProps={{
              min: 1,
            }}
            onWheel={(e) => e.target.blur()}
            onKeyDown={(e) =>
              ["E", "e", ".", "+", "-"].includes(e.key) && e.preventDefault()
            }
            onPaste={(e) => e.preventDefault()}
          />
        </Stack>
      </Stack>
    </>
  );
};
