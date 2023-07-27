import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedRowData: null,
};

const selectedRowSlice = createSlice({
  name: "selectedRow",
  initialState,
  reducers: {
    setSelectedRow: (state, action) => {
      state.selectedRowData = action.payload;
    },
  },
});

export const { setSelectedRow } = selectedRowSlice.actions;

export default selectedRowSlice.reducer;
