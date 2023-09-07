import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { directTermsAndConditions } from "../../../../../schema";
import { Stack } from "@mui/material";

export const TermsAndConditions = () => {
  const { watch, formState: {isValid} } = useForm({
    resolver: yupResolver(directTermsAndConditions),
    defaultValues: {
      freezer: "",
      typeOfCustomer: "",
      directDelivery: "",
      bookingCoverage: "",
      ModeOfPayment: "",
      Terms: "",
      creditLimit: "",
      termDays: "",
      discountTypes: "",
    },
  });

  return (
    <>
      <Stack>Terms and Condition</Stack>
    </>
  );
};
