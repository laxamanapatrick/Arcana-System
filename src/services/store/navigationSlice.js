import { createSlice } from "@reduxjs/toolkit";

const storedNavigationData = sessionStorage.getItem("Navigation")
const parseData = JSON.parse(storedNavigationData)

const initialState = {
  sidebarNavigation: parseData || [],
};

const sidebarNavigationSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    SetSidebarNavigation: (state, action) => {
      sessionStorage.setItem("Navigation", JSON.stringify(action.payload));
      state.sidebarNavigation = action.payload;
    },
  },
});

export const { SetSidebarNavigation } = sidebarNavigationSlice.actions;

export default sidebarNavigationSlice.reducer;
