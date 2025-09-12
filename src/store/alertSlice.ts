// store/alertSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomAlertType } from "@/types/alert.type";

interface AlertState {
  alert: CustomAlertType | null;
}

const initialState: AlertState = {
  alert: null,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<CustomAlertType | null>) => {
      state.alert = action.payload;
    },
    clearAlert: (state) => {
      state.alert = null;
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;