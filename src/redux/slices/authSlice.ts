import { removeAxiosToken, setAxiosToken } from "@/api";
import { LS_ACCOUNT, LS_TOKEN } from "@/constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AccountState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    roleType: string;
    firstName: string;
    lastName: string;
  } | null;
  token: string;
}

// Helper function to load initial state from LocalStorage (for SSR compatibility)
export const loadFromLocalStorage = (): AccountState => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem(LS_ACCOUNT);
    if (storedData) {
      return JSON.parse(storedData);
    }
  }
  return { isAuthenticated: false, user: null, token: "" }; // Fallback for SSR
};

// Initial state
const initialState: AccountState = loadFromLocalStorage();

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountData(
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        email: string;
        roleType: string;
        firstName: string;
        lastName: string;
        token: string;
      }>,
    ) {
      state.isAuthenticated = true;
      state.user = action.payload;
      setAxiosToken(action.payload.token);
      localStorage // Save to LocalStorage
        .setItem(LS_ACCOUNT, JSON.stringify(state)); // Ensure full state is serialized
      localStorage.setItem(LS_TOKEN, action.payload.token);
    },
    clearAccountData(state) {
      state.isAuthenticated = false;
      state.user = null;
      // Remove from LocalStorage
      removeAxiosToken();
      localStorage.removeItem(LS_ACCOUNT);
      localStorage.removeItem(LS_TOKEN);
    },
  },
});

export const { setAccountData, clearAccountData } = accountSlice.actions;
export default accountSlice.reducer;
