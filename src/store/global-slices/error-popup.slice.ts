import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ErrorPopupState {
  isOpen: boolean;
  message: string;
}

const initialState: ErrorPopupState = {
  isOpen: false,
  message: "",
};

const errorPopupSlice = createSlice({
  name: "errorPopup",
  initialState,
  reducers: {
    showErrorPopup: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.message = action.payload;
    },
    closeErrorPopup: (state) => {
      state.isOpen = false;
      state.message = "";
    },
  },
});

export const { showErrorPopup, closeErrorPopup } = errorPopupSlice.actions;
export const selectErrorPopup = (state: RootState) => state.errorPopup;
export const errorPopupReducer = errorPopupSlice.reducer;
