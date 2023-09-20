import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  FormLabel,
  Stack,
  TextField as MuiTextField,
  Button,
} from "@mui/material";
import { useGetTermDaysQuery } from "../../../../services/api";
import { realeasedToDirectdirectTermsAndConditions } from "../../../../schema";
import { setDirectTermsAndConditions } from "../../../../services/store/directRegistrationSlice";
import { FreebieForm } from "../../prospect/freebies/Freebie-Form";
import {
  toggleDrawer,
  toggleModal,
} from "../../../../services/store/disclosureSlice";
import {
  AutoComplete,
  RadioField,
  Textfield,
} from "../../../../components/Fields";
import { Add } from "@mui/icons-material";

export const DirectTermsAndConditions = ({ fields, setCanNext }) => {
  const { directFreebieRequest } = useSelector(
    (state) => state.directRegistrationData
  );
  const formStyle = {
    bgcolor: "primary.main",
    color: "white !important",
    textAlign: "center",
    borderRadius: "10px",
    width: "200px",
  };
  const dispatch = useDispatch();
  const { data: termData } = useGetTermDaysQuery();
  const {
    watch,
    getValues,
    formState: { isValid, errors },
    control,
  } = useForm({
    resolver: yupResolver(realeasedToDirectdirectTermsAndConditions),
    defaultValues: fields.terms_and_conditions,
  });

  const isRequiredFieldsFilled = () => {
    const formData = getValues();
    const termConditions =
      (watch("terms") === "creditlimit"
        ? watch("creditLimit")
        : watch("terms")) ||
      (watch("terms") === "1up1down" || watch("terms") === "creditlimit"
        ? watch("termDays")
        : watch("terms"));
    if (
      watch("freezer") &&
      watch("typeOfCustomer") &&
      watch("directDelivery") &&
      watch("bookingCoverage") &&
      watch("modeOfPayment") &&
      // (
      // watch("terms")
      // || termConditions
      // )
      // &&
      watch("discountTypes")
    ) {
      dispatch(setDirectTermsAndConditions(formData));
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
    watch("freezer"),
    watch("typeOfCustomer"),
    watch("directDelivery"),
    watch("bookingCoverage"),
    watch("modeOfPayment"),
    watch("terms"),
    watch("discountTypes"),
  ]);

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
          {watch("terms") === "1up1down" ? (
            <AutoComplete
              name="termDays"
              sx={{ width: "95%" }}
              control={control}
              options={termData?.data?.termDays}
              getOptionLabel={(option) => JSON.stringify(option?.days)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <MuiTextField
                  {...params}
                  label="Term Days"
                  size="small"
                  error={!!errors?.termDays}
                  helperText={errors?.termDays?.message}
                />
              )}
              disablePortal
              disableClearable
            />
          ) : watch("terms") === "creditlimit" ? (
            <>
              <Textfield
                name="creditLimit"
                sx={{ width: "95%" }}
                control={control}
                label="Credit Limit"
                type="number"
                size="small"
                autoComplete="off"
                error={!!errors?.creditLimit}
                helperText={errors?.creditLimit?.message}
              />
              <AutoComplete
                name="termDays"
                sx={{ width: "95%" }}
                control={control}
                options={termData?.data?.termDays || ""}
                getOptionLabel={(option) => JSON.stringify(option?.days)}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <MuiTextField
                    {...params}
                    label="Term Days"
                    size="small"
                    error={!!errors?.termDays}
                    helperText={errors?.termDays?.message}
                  />
                )}
                disablePortal
                disableClearable
              />
            </>
          ) : (
            <></>
          )}
          <RadioField
            row
            name="modeOfPayment"
            control={control}
            label="Mode Of Payment"
            formLabelStyle={formStyle}
            options={[
              { value: "cash", label: "Cash" },
              { value: "check/online", label: "Check/Online" },
            ]}
          />
          <RadioField
            row
            name="discountTypes"
            control={control}
            label="Discount"
            formLabelStyle={formStyle}
            options={[
              { value: "variable", label: "Variable" },
              { value: "fixed", label: "Fixed" },
            ]}
          />
          {watch("discountTypes") === "fixed" ? (
            <Textfield
              name="fixedValue"
              sx={{ width: "95%" }}
              control={control}
              label="Percentage"
              size="small"
              type="number"
              autoComplete="off"
              error={!!errors?.fixedValue}
              helperText={errors?.fixedValue?.message}
            />
          ) : (
            <></>
          )}
          <Button
            onClick={() => dispatch(toggleDrawer("isFreebieForm"))}
            startIcon={<Add />}
            sx={{
              cursor: "pointer",
              color: "black !important",
              textAlign: "center",
              borderRadius: "10px",
              width: "200px",
            }}
          >
            {directFreebieRequest?.freebies?.length > 0 ? "Edit" : "Add"}{" "}
            Freebies
          </Button>
          <FreebieForm isDirect={true} />
        </Stack>
      </Stack>
    </>
  );
};
