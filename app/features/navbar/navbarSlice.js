import { createSlice } from "@reduxjs/toolkit";

const getCartFromStorage = () => {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  }
  return [];
};

const saveCartToStorage = (cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const initialState = {
  value: false,
  isOpen: false,
  product_data: "",
  cart: getCartFromStorage(),
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

    // PRODUCT QO‘SHISH
    addToCart: (state, action) => {
      const product = action.payload;

      const existing = state.cart.find((item) => item.id === product.id);

      if (existing) {
        if (existing.count < product.stock) {
          existing.count += 1;
        }
      } else {
        state.cart.push({ ...product, count: 1 });
      }

      saveCartToStorage(state.cart);
    },

    // COUNT OSHIRISH
    increaseCount: (state, action) => {
      const id = action.payload;

      const item = state.cart.find((p) => p.id === id);

      if (item && item.count < item.stock) {
        item.count += 1;
      }

      saveCartToStorage(state.cart);
    },

    // COUNT KAMAYTIRISH
    decreaseCount: (state, action) => {
      const id = action.payload;

      const item = state.cart.find((p) => p.id === id);

      if (item && item.count > 1) {
        item.count -= 1;
      }

      saveCartToStorage(state.cart);
    },

    // PRODUCTNI O‘CHIRISH
    removeFromCart: (state, action) => {
      const id = action.payload;

      state.cart = state.cart.filter((item) => item.id !== id);

      saveCartToStorage(state.cart);
    },
  },
});

export const {
  toggle,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  addToCart,
  increaseCount,
  decreaseCount,
  removeFromCart,
} = navbarSlice.actions;

export default navbarSlice.reducer;
