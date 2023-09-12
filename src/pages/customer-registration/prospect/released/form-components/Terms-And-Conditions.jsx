import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { directTermsAndConditions } from "../../../../../schema";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  useTheme,
} from "@mui/material";
import { RadioField } from "../../../../../components/Fields";
import { toggleModal } from "../../../../../services/store/disclosureSlice";
import { FreebieViewing } from "../../freebies/Freebie-Viewing";
import { useDispatch } from "react-redux";

export const TermsAndConditions = ({ fields, setCanNext }) => {
  const dispatch = useDispatch();

  const formStyle = {
    bgcolor: "primary.main",
    color: "white !important",
    textAlign: "center",
    borderRadius: "10px",
    width: "200px",
  };

  const {
    watch,
    formState: { isValid },
    control,
  } = useForm({
    resolver: yupResolver(directTermsAndConditions),
    defaultValues: fields.terms_and_conditions,
  });

  useEffect(() => {
    setCanNext(true);
  }, []);

  return (
    <>
      <Stack
        component="form"
        justifyContent="center"
        gap="80px"
        mt={3}
        flexDirection="row"
      >
        {/* Left */}
        <Stack justifyContent="space-between" gap={2}>
          <RadioField
            row
            name="freezer"
            control={control}
            label="Freezer"
            formLabelStyle={formStyle}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <RadioField
            row
            name="typeOfCustomer"
            control={control}
            label="Type of Customer"
            formLabelStyle={formStyle}
            options={[
              { value: "dealer", label: "Dealer" },
              { value: "retailer", label: "Retailer" },
            ]}
          />
          <RadioField
            row
            name="directDelivery"
            control={control}
            label="Direct Delivery"
            formLabelStyle={formStyle}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <RadioField
            row
            name="bookingCoverage"
            control={control}
            label="Booking Coverage"
            formLabelStyle={formStyle}
            options={[
              { value: "f1", label: "F1" },
              { value: "f2", label: "F2" },
              { value: "f3", label: "F3" },
              { value: "f4", label: "F4" },
            ]}
          />
        </Stack>

        {/* Right */}
        <Stack justifyContent="space-between" gap={2}>
          <RadioField
            row
            name="terms"
            control={control}
            label="Terms"
            formLabelStyle={formStyle}
            options={[
              { value: "cod", label: "COD" },
              { value: "1up1down", label: "1 Up 1 Down" },
              { value: "creditlimit", label: "Credit Limit" },
            ]}
          />
          <FormControl sx={{ justifyContent: "center", display: "flex" }}>
            <FormLabel sx={formStyle}>Mode Of Payment</FormLabel>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Cash" />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label="Check/Online"
              />
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ justifyContent: "center", display: "flex" }}>
            <FormLabel sx={formStyle}>Discount</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                value="variable"
                control={<Radio />}
                label="Variable"
              />
              <FormControlLabel
                value="fixed"
                control={<Radio />}
                label="Fixed"
              />
            </RadioGroup>
          </FormControl>
          <FormControl sx={{ justifyContent: "center", display: "flex" }}>
            <FormLabel
              onClick={() => dispatch(toggleModal("isFreebieViewing"))}
              sx={{
                cursor: 'pointer',
                bgcolor: "gray",
                color: "black !important",
                textAlign: "center",
                borderRadius: "10px",
                width: "200px",
              }}
            >
              Freebies
            </FormLabel>
          </FormControl>
        </Stack>
      </Stack>
      <FreebieViewing />
    </>
  );
};
