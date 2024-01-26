// toastSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Toast } from "../../models";

export type ToastState = {
  notification: Toast;
  isShown: boolean;
};

type SetToastNotificationAction = {
  message: string;
  type: "success" | "warning" | "danger" | "";
};

let nextNotificationId = 1;

const initialState: ToastState = {
  notification: { id: 0, message: "", type: "" },
  isShown: false
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToastNotification: (
      state,
      action: PayloadAction<SetToastNotificationAction>
    ) => {
      const id = nextNotificationId++;
      state.notification = {
        id: id,
        message: action.payload.message,
        type: action.payload.type,
      };
      state.isShown = true;
    },
    clearToastNotification: (state) => {
      state.notification = { id: 0, message: "", type: "" };
      state.isShown = false;
    },
  },
});

export const { setToastNotification, clearToastNotification } =
  toastSlice.actions;
export default toastSlice.reducer;
