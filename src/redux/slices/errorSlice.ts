import { createSlice } from "@reduxjs/toolkit";

type errorType = {
  errorMessage: string | null;
};

const initialState: errorType = {
  errorMessage: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    storeError: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearError: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { storeError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
