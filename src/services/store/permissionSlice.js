import { createSlice } from "@reduxjs/toolkit";

const storePermissions = sessionStorage.getItem("Permissions")
const parseData = JSON.parse(storePermissions)

const initialState = {
  permissions: parseData || [],
};

const permissionSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setPermissions: (state, action) => {
      sessionStorage.setItem("Permissions", JSON.stringify(action.payload));
      state.permissions = action.payload;
    },
  },
});

export const { setPermissions } = permissionSlice.actions;

export default permissionSlice.reducer;
