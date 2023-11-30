import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models";

const emptyUser: User = {
  id: 0,
  username: "",
  role: "seller",
  creationDate: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: emptyUser,
  reducers: {
    authUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      return { ...state, ...action.payload };
    },
    resetUser: () => {
      return emptyUser;
    },
  },
});

export const { authUser, updateUser } = userSlice.actions;


export default userSlice.reducer;