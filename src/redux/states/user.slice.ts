import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models";

export type UserState = User & {
  isUserAuth: boolean;
};

const emptyUser: UserState = {
  id: 0,
  username: "",
  role: "Seller",
  creationDate: "",
  token: "",
  isUserAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState: emptyUser,
  reducers: {
    authUser: (state, action: PayloadAction<User>) => {
      return { ...action.payload, isUserAuth: true };
    },
    updateUser: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    resetUser: () => {
      return emptyUser;
    },
  },
});

export const { authUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
