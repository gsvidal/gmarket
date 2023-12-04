import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from "./states/user.slice.ts";

export interface AppStore {
  user: UserState
}

export const store = configureStore<AppStore>({
  reducer: {
    user: userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
