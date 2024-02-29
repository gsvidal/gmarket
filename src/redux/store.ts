import { configureStore } from "@reduxjs/toolkit";
import { UserState } from "./states/user.slice";
import {
  productReducer,
  userReducer,
  toastNotificationReducer,
  cartReducer,
} from "./states";
import { ProductState } from "./states/product.slice.ts";
import { ToastState } from "./states/toastNotification.slice.ts";
import { CartState } from "./states/cart.slice.ts";

export interface AppStore {
  user: UserState;
  product: ProductState;
  toast: ToastState;
  cart: CartState;
}

export const store = configureStore<AppStore>({
  reducer: {
    user: userReducer,
    product: productReducer,
    toast: toastNotificationReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch
