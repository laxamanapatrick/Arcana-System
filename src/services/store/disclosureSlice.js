import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  drawers: {
    isSidebar: false,
    isCompanyForm: false,
    isDepartmentForm: false,
  },
  modals: {
  },
  // menus: {
  //   isUserAccountMenu: false
  // },
};

const disclosureSlice = createSlice({
  name: 'disclosure',
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
    // openMenu: (state, action) => {
    //   state.menus[action.payload] = true;
    //   state.anchorRef = action.payload.anchorRef; 
    // },
    // closeMenu: (state, action) => {
    //   state.menus[action.payload] = false;
    //   state.anchorRef = null; 
    // },
    // toggleMenu: (state, action) => {
    //   state.menus[action.payload] = !state.menus[action.payload];
    //   state.anchorRef = action.payload.anchorRef;
    // },
  },
});

export const {
  openDrawer,
  closeDrawer,
  toggleDrawer,
  openModal,
  closeModal,
  toggleModal,
  // openMenu,
  // closeMenu,
  // toggleMenu,
} = disclosureSlice.actions;

export default disclosureSlice.reducer;
