import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  drawers: {
    isSidebar: false,
    isCompanyForm: false,
    isDepartmentForm: false,
    isLocationForm: false,
    isUserRoleForm: false,
    isUserAccountForm: false,
    isUOMForm: false,
    isProductSubCategoryForm: false,
    isMeatTypeForm: false,
    isStoreTypeForm: false,
    isItemsForm: false,
    isDiscountForm: false,
    isTermDaysForm: false,
    isRequestProspectForm: false,
    isFreebieForm: false,
  },
  modals: {
    isTagging: false,
  },
};

const disclosureSlice = createSlice({
  name: "disclosure",
  initialState,
  reducers: {
    openDrawer: (state, action) => {
      state.drawers[action.payload] = true;
    },
    closeDrawer: (state, action) => {
      state.drawers[action.payload] = false;
    },
    toggleDrawer: (state, action) => {
      state.drawers[action.payload] = !state.drawers[action.payload];
    },
    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },
    toggleModal: (state, action) => {
      state.modals[action.payload] = !state.modals[action.payload];
    },
  },
});

export const {
  openDrawer,
  closeDrawer,
  toggleDrawer,
  openModal,
  closeModal,
  toggleModal,
} = disclosureSlice.actions;

export default disclosureSlice.reducer;
