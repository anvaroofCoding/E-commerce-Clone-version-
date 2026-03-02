import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  isOpen: false,
  product_data: "",
};

export const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
    },
    openDrawer: (state, action) => {
      state.isOpen = true;
      state.product_data = action.payload;
    },
    closeDrawer: (state) => {
      state.isOpen = false;
      state.product_data = "";
    },
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggle, openDrawer, closeDrawer, toggleDrawer } =
  navbarSlice.actions;
export default navbarSlice.reducer;
