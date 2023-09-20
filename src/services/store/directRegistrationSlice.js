import { createSlice } from "@reduxjs/toolkit";

// ------- Register
// BusinessName | string;
// CustomerInformation | string;
// OwnerAddress | string;
// BusinessAddress | string;
// RepresentiveName | string;
// RepresentivePosition | string;
// Cluster | int;

// ------- Attachements
// Attachetmnets(List) | IformFile;

// ------- TermsAndConditions
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
  directFreebieRequest:
    JSON.parse(sessionStorage.getItem("Direct Freebie Request")) || null,
  directClientDetails:
    JSON.parse(sessionStorage.getItem("Direct Client Details")) || null,
  directTermsAndConditions:
    JSON.parse(sessionStorage.getItem("DirectTerms and Conditions")) || null,
};

const directRegistrationSlice = createSlice({
  name: "directRegistrationFields",
  initialState,
  reducers: {
    setDirectFreebieRequest: (state, action) => {
      state.directFreebieRequest = action.payload;
      sessionStorage.setItem(
        "Direct Freebie Request",
        JSON.stringify(action.payload)
      );
    },
    setDirectClientDetails: (state, action) => {
      state.directClientDetails = action.payload;
      sessionStorage.setItem(
        "Direct Client Details",
        JSON.stringify(action.payload)
      );
    },
    setDirectTermsAndConditions: (state, action) => {
      state.directTermsAndConditions = action.payload;
      sessionStorage.setItem(
        "Diirect Terms and Conditions",
        JSON.stringify(action.payload)
      );
    },
  },
});

export const {
  setDirectFreebieRequest,
  setDirectClientDetails,
  setDirectTermsAndConditions,
} = directRegistrationSlice.actions;

export default directRegistrationSlice.reducer;
