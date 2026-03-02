import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import navbarReducer from "./features/navbar/navbar.moda";
import { pokemonApi } from "./features/api/pokemon_Api";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    navbar: navbarReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});
