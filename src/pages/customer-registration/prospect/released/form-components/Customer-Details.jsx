import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
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

export const CustomerDetails = () => {
  const ownersAddress = "This, Is, A, Sample, Default Address";
  const [block, street, barangay, municipality, province] =
    ownersAddress.split(", ");

  const {
    handleSubmit,
    watch,
    getValues,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(directCustomerDetails),
    defaultValues: {
      businessBlock: "",
      businessStreet: "",
      businessBarangay: "",
      businessMunicipality: "",
      businessProvince: "",
      businessAddress: "",
      givenName: "",
      middleName: "",
      lastName: "",
      suffix: "",
      representativeName: "",
      representativePosition: "NA",
      cluster: "",
    },
  });

  const {
    businessBlock,
    businessStreet,
    businessBarangay,
    businessMunicipality,
    businessProvince,
  } = getValues();
  const updateBusinessAddress = () => {
    const businessAddress = `${businessBlock || "NA"}, ${
      businessStreet || "NA"
    }, ${businessBarangay || "NA"}, ${businessMunicipality || "NA"}, ${
      businessProvince || "NA"
    }`;
    setValue("businessAddress", businessAddress);
  };

  const { givenName, middleName, lastName, suffix } = getValues();
  const updateRepresentativeName = () => {
    const representativeName = `${givenName}, ${middleName}, ${lastName}, ${suffix}`;
    setValue("representativeName", representativeName);
  };

  const handleSameAddress = (isChecked) => {
    if (isChecked) {
      setValue("businessBlock", block || "NA");
      setValue("businessStreet", street || "NA");
      setValue("businessBarangay", barangay || "NA");
      setValue("businessMunicipality", municipality || "NA");
      setValue("businessProvince", province || "NA");
      const businessAddress = `${block || "NA"}, ${street || "NA"}, ${
        barangay || "NA"
      }, ${municipality || "NA"}, ${province || "NA"}`;
      setValue("businessAddress", businessAddress);
    } else {
      setValue("businessBlock", "");
      setValue("businessStreet", "");
      setValue("businessBarangay", "");
      setValue("businessMunicipality", "");
      setValue("businessProvince", "");
      setValue("businessAddress", "");
    }
  };

  const handleCheckboxChecked = () => {
    let isChecked;
    if (
      block !== watch("businessBlock") ||
      street !== watch("businessStreet") ||
      barangay !== watch("businessBarangay") ||
      municipality !== watch("businessMunicipality") ||
      province !== watch("businessProvince")
    ) {
      isChecked = false;
    } else {
      isChecked = true;
    }
    return isChecked;
  };

  return (
    <>
      <Stack component="form" gap={2}>
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
              value={"Details"}
              label="Owner's Name"
              size="small"
              inputProps={{
                readOnly: true,
                style: {
                  cursor: "not-allowed",
                },
              }}
            />
            <MuiTextField
              value={"Details"}
              label="Owner's Name"
              size="small"
              inputProps={{
                readOnly: true,
                style: {
                  cursor: "not-allowed",
                },
              }}
            />
            <MuiTextField
              value={"Details"}
              label="Owner's Name"
              size="small"
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
              value={block}
              label="Name"
              size="small"
              fullWidth
              inputProps={{
                readOnly: true,
                style: {
                  cursor: "not-allowed",
                },
              }}
            />
            <MuiTextField
              value={street}
              label="Name"
              size="small"
              fullWidth
              inputProps={{
                readOnly: true,
                style: {
                  cursor: "not-allowed",
                },
              }}
            />
            <MuiTextField
              value={barangay}
              label="Name"
              size="small"
              fullWidth
              inputProps={{
                readOnly: true,
                style: {
                  cursor: "not-allowed",
                },
              }}
            />
          </Box>
          <Box display="flex" flexDirection="row" gap={1}>
            <MuiTextField
              value={municipality}
              label="Name"
              size="small"
              fullWidth
              inputProps={{
                readOnly: true,
                style: {
                  cursor: "not-allowed",
                },
              }}
            />

            <MuiTextField
              value={province}
              label="Name"
              size="small"
              fullWidth
              inputProps={{
                readOnly: true,
                style: {
                  cursor: "not-allowed",
                },
              }}
            />

            <Textfield
              name="dummy"
              control={control}
              label=""
              size="small"
              autoComplete="off"
              sx={{ visibility: "hidden" }}
              inputProps={{ readOnly: true }}
            />
          </Box>
        </Stack>
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
              value={"Details"}
              label="Name"
              size="small"
              fullWidth
              inputProps={{
                readOnly: true,
                style: {
                  cursor: "not-allowed",
                },
              }}
            />
            <Textfield
              required
              name="cluster"
              control={control}
              label="Cluster"
              size="small"
              autoComplete="off"
              error={!!errors?.cluster}
              helperText={errors?.city?.cluster}
            />
            <Textfield
              name="dummy"
              control={control}
              label=""
              size="small"
              autoComplete="off"
              sx={{ visibility: "hidden" }}
              inputProps={{ readOnly: true }}
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
              name="businessBlock"
              control={control}
              label="City"
              size="small"
              autoComplete="off"
              error={!!errors?.businessBlock}
              helperText={errors?.city?.businessBlock}
              onChange={updateBusinessAddress}
            />
            <Textfield
              required
              name="businessStreet"
              control={control}
              label="Street"
              size="small"
              autoComplete="off"
              error={!!errors?.businessStreet}
              helperText={errors?.street?.businessStreet}
              onChange={updateBusinessAddress}
            />
            <Textfield
              required
              name="businessBarangay"
              control={control}
              label="Barangay"
              size="small"
              autoComplete="off"
              error={!!errors?.businessBarangay}
              helperText={errors?.barangay?.businessBarangay}
              onChange={updateBusinessAddress}
            />
          </Box>
          <Box display="flex" flexDirection="row" gap={1}>
            <Textfield
              required
              name="businessMunicipality"
              control={control}
              label="Business Address"
              size="small"
              autoComplete="off"
              error={!!errors?.businessMunicipality}
              helperText={errors?.municipality?.businessMunicipality}
            />

            <Textfield
              required
              name="businessProvince"
              control={control}
              label="Business Address"
              size="small"
              autoComplete="off"
              error={!!errors?.businessProvince}
              helperText={errors?.province?.businessProvince}
            />

            <Textfield
              name="dummy"
              control={control}
              label=""
              size="small"
              autoComplete="off"
              sx={{ visibility: "hidden" }}
              inputProps={{ readOnly: true }}
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
              name="givenName"
              control={control}
              label="Given Name"
              size="small"
              autoComplete="off"
              error={!!errors?.givenName}
              helperText={errors?.city?.givenName}
              onChange={updateRepresentativeName}
            />
            <Textfield
              name="middleName"
              control={control}
              label="Middle Name (Optional)"
              size="small"
              autoComplete="off"
              error={!!errors?.middleName}
              helperText={errors?.street?.middleName}
              onChange={updateRepresentativeName}
            />
            <Textfield
              required
              name="lastName"
              control={control}
              label="Last Name"
              size="small"
              autoComplete="off"
              error={!!errors?.lastName}
              helperText={errors?.barangay?.lastName}
              onChange={updateRepresentativeName}
            />
          </Box>
          <Box display="flex" flexDirection="row" gap={1}>
            <Textfield
              name="suffix"
              control={control}
              label="Suffix (Optional)"
              size="small"
              autoComplete="off"
              error={!!errors?.suffix}
              helperText={errors?.municipality?.suffix}
              onChange={updateRepresentativeName}
            />
            <Textfield
              name="dummy"
              control={control}
              label=""
              size="small"
              autoComplete="off"
              sx={{ visibility: "hidden" }}
              inputProps={{ readOnly: true }}
            />

            <Textfield
              name="dummy"
              control={control}
              label=""
              size="small"
              autoComplete="off"
              sx={{ visibility: "hidden" }}
              inputProps={{ readOnly: true }}
            />
          </Box>
        </Stack>
      </Stack>
    </>
  );
};
