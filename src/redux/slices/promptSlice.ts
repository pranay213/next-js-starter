import { createSlice } from "@reduxjs/toolkit";

type PromptBoxState = {
  title: string | null;
  isVisible: boolean;
  onOkay?: () => void;
  onCancel?: () => void;
};

const initialState: PromptBoxState = {
  title: null,
  isVisible: false,
  onOkay: undefined,
  onCancel: undefined,
};

const promptBoxSlice = createSlice({
  name: "promptBox",
  initialState,
  reducers: {
    showPromptBox: (state, action) => {
      const { title, onOkay, onCancel } = action.payload;
      state.title = title;
      state.isVisible = true;
      state.onOkay = onOkay;
      state.onCancel = onCancel;
    },
    hidePromptBox: (state) => {
      state.title = null;
      state.isVisible = false;
      state.onOkay = undefined;
      state.onCancel = undefined;
    },
    triggerOkay: (state) => {
      if (state.onOkay) {
        state.onOkay();
      }
      state.isVisible = false;
    },
    triggerCancel: (state) => {
      if (state.onCancel) {
        state.onCancel();
      }
      state.isVisible = false;
    },
  },
});

export const { showPromptBox, hidePromptBox, triggerOkay, triggerCancel } =
  promptBoxSlice.actions;
export default promptBoxSlice.reducer;
