import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../models";

type CartState = {
  cart: Product[];
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
  cart: [],
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
        state.cart.push(product);
      }
    },
    removeProductFromCart: (
      state,
      action: PayloadAction<RemoveProductFromCartAction>
    ) => {
      const { isUserCustomer, productId } = action.payload;
      if (isUserCustomer) {
        state.cart = state.cart.filter((cartItem) => cartItem.id !== productId);
      }
    },
    updateProductCart: (
      state,
      action: PayloadAction<UpdateProductCartAction>
    ) => {
      const { isUserCustomer, product } = action.payload;
      if (isUserCustomer) {
        state.cart = state.cart.map((cartItem) =>
          cartItem.id === product.id ? product : cartItem
        );
      }
    },
  },
});
