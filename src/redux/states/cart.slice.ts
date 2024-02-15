import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../models";

export type CartState = {
  cartItems: Product[];
};

type AddProductToCartAction = {
  isUserCustomer: boolean;
  product: Product;
};

type RemoveProductFromCartAction = {
  isUserCustomer: boolean;
  productId: number;
};

type UpdateProductCartAction = {
  isUserCustomer: boolean;
  product: Product;
};

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (
      state,
      action: PayloadAction<AddProductToCartAction>
    ) => {
      const { isUserCustomer, product } = action.payload;
      if (isUserCustomer) {
        state.cartItems.push(product);
      }
    },
    removeProductFromCart: (
      state,
      action: PayloadAction<RemoveProductFromCartAction>
    ) => {
      const { isUserCustomer, productId } = action.payload;
      if (isUserCustomer) {
        state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== productId);
      }
    },
    updateProductCart: (
      state,
      action: PayloadAction<UpdateProductCartAction>
    ) => {
      const { isUserCustomer, product } = action.payload;
      if (isUserCustomer) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem.id === product.id ? product : cartItem
        );
      }
    },
  },
});

export const {
  addProductToCart, removeProductFromCart, updateProductCart
} = cartSlice.actions;

export default cartSlice.reducer;