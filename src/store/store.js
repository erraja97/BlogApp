import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

//create store
const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
