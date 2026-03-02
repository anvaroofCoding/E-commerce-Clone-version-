import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggle } = navbarSlice.actions;
export default navbarSlice.reducer;
