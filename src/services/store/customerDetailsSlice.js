//Will handle values during Direct Registration - Remove values after submit

import { createSlice } from "@reduxjs/toolkit";

// ------- Register
// BusinessAddress | string;
// RepresentiveName | string;
// RepresentivePosition | string;
// Cluster | int;

// ------- Attachedments
// ClientId | int;
// Attachetmnets(List) | IformFile;

// ------- TermsAndConditions
// ClientId | int;
// Freezer | boolean;
// TypeOfCustomer | string;
// DirectDelivery | boolean;
// BookingCoverage | int;
// ModeOfPayment | int;
// Terms | int;
// CreditLimit | int;
// TermDays | int;
// DiscountTypes | int;

const initialState = {
  clientId: sessionStorage.getItem("Client ID") || null,
  clientDetails: sessionStorage.getItem("Client Details") || null,
  attachments: sessionStorage.getItem("Attachments") || null,
  termsAndConditions: sessionStorage.getItem("Terms and Conditions") || null,
};

const directDetailsSlice = createSlice({
  name: "directRegistrationFields",
  initialState,
  reducers: {
    setClientId: (state, action) => {
      state.clientId = action.payload;
      sessionStorage.setItem("Client ID", action.payload);
    },
    setClientDetails: (state, action) => {
      state.clientDetails = action.payload;
      sessionStorage.setItem("Client Details", action.payload);
    },
    setAttachments: (state, action) => {
      state.attachments = action.payload;
      sessionStorage.setItem("Attachments", action.payload);
    },
    setTermsAndConditions: (state, action) => {
      state.termsAndConditions = action.payload;
      sessionStorage.setItem("Terms and Conditions", action.payload);
    },
  },
});

export const {
  setClientId,
  setClientDetails,
  setAttachments,
  setTermsAndConditions,
} = directDetailsSlice.actions;

export default directDetailsSlice.reducer;
