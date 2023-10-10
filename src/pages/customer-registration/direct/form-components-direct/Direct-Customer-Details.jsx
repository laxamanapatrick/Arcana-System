import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Box, Stack, Typography, Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";
import { directRegistration } from "../../../../schema";
import { setDirectClientDetails } from "../../../../services/store/directRegistrationSlice";
import { Textfield } from "../../../../components/Fields";
import PinLocation from "../../../../components/Pin-Location";

export const DirectCustomerDetails = ({
  fields,
  setCanNext,
  pinLocation,
  setPinLocation,
}) => {
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
    resolver: yupResolver(directRegistration),
    defaultValues: fields.customer_details,
  });

  const handleSameAddress = (isChecked) => {
    if (isChecked) {
      setValue("businessAddress", watch("ownersAddress"));
    }
  };

  const handleCheckboxChecked = () => {
    let isChecked;
    if (watch("ownersAddress") !== watch("businessAddress")) {
      isChecked = false;
    } else {
      isChecked = true;
    }
    return isChecked;
  };

  const isRequiredFieldsFilled = () => {
    const formData = getValues();
    if (
      watch("businessName") &&
      watch("ownersName") &&
      watch("ownersAddress") &&
      watch("businessAddress") &&
      watch("representativeName") &&
      watch("representativePosition") &&
      watch("cluster")
    ) {
      dispatch(setDirectClientDetails(formData));
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
    watch("businessName"),
    watch("ownersName"),
    watch("ownersAddress"),
    watch("businessAddress"),
    watch("representativeName"),
    watch("representativePosition"),
    watch("cluster"),
  ]);

  return (
    <>
      <Stack component="form" justifyContent="space-between" gap={3}>
        <Stack gap={1}>
          <Typography
            fontWeight="bold"
            fontSize="13px"
            textTransform="uppercase"
          >
            Business Name
          </Typography>
          <Box display="flex" flexDirection="row" gap={1}>
            <Textfield
              required
              sx={requiredFieldLabelStyle}
              name="businessName"
              control={control}
              label={`Name of Business`}
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
            Owner's Name
          </Typography>
          <Box display="flex" flexDirection="row" gap={1}>
            <Textfield
              required
              sx={requiredFieldLabelStyle}
              name="ownersName"
              control={control}
              label={`Name of Business Owner`}
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
            Owner's Address
          </Typography>
          <Box display="flex" flexDirection="row" gap={1}>
            <Textfield
              required
              sx={requiredFieldLabelStyle}
              name="ownersAddress"
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
            Business Address (Same as Owner's Address
            <Checkbox
              className="checkbox"
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

        <Stack sx={{ mt: "-2px" }}>
          <Typography
            fontWeight="bold"
            fontSize="13px"
            textTransform="uppercase"
          >
            <PinLocation
              iconSize={"30px"}
              businessAddress={watch("businessAddress")}
              pinLocation={pinLocation}
              setPinLocation={setPinLocation}
            />
            Click the icon to register current location
          </Typography>
          {(!pinLocation.latitude || !pinLocation.longitude) && (
            <Typography
              ml={5}
              fontWeight="bold"
              color="error"
              fontSize="10.5px"
            >
              Pin location must be registered. Please click on the Icon to
              register location.
            </Typography>
          )}
        </Stack>
      </Stack>
    </>
  );
};
