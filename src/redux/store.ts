import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "./slices/errorSlice";
import accountSlice from "./slices/authSlice";
import promptBoxSlice from "./slices/promptSlice";

const store = configureStore({
  reducer: {
    error: errorSlice,
    account: accountSlice,
    prompt: promptBoxSlice,
  },
  devTools: false,
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
