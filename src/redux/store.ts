import { configureStore } from "@reduxjs/toolkit";
import { UserState } from "./states/user.slice";
import { productReducer, userReducer } from "./states";
import { ProductState } from "./states/product.slice.ts";

export interface AppStore {
  user: UserState;
  product: ProductState;
}

export const store = configureStore<AppStore>({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
