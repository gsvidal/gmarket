import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../models';

const emptyUser: User = {
  id: '',
  username: '',
  role: 'seller',
  creationDate: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState: emptyUser,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      return {...state, ...action.payload}
    },
    resetUser: () => {
      return emptyUser
    }
  }
})

export const { createUser, updateUser } = userSlice.actions

export default userSlice.reducer
