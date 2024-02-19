import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product, CartProduct } from "../../models";

export type CartState = {
  cartItems: CartProduct[];
  totalQuantity: number;
  totalPrice: number;
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
  updatedQuantity: number;
};

// Making use of localStorage
const initialItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
const initialTotalQuantity = JSON.parse(
  localStorage.getItem("totalQuantity") || "0"
);
const initialTotalPrice = JSON.parse(localStorage.getItem("totalPrice") || "0");

const setStateInLocalStorage = (
  items: CartProduct[],
  totalQuantity: number,
  totalPrice: number
) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
  localStorage.setItem("cartTotalQuantity", JSON.stringify(totalQuantity));
  localStorage.setItem("cartTotalPrice", JSON.stringify(totalPrice));
};

const initialState: CartState = {
  cartItems: initialItems,
  totalQuantity: initialTotalQuantity,
  totalPrice: initialTotalPrice,
};

const calculateTotal = (
  cartItems: CartProduct[],
  property: "quantity" | "price"
) => {
  return cartItems.reduce((acum: number, curr: CartProduct) => {
    return acum + curr[property];
  }, 0);
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
        const existingItemIndex = state.cartItems.findIndex(
          (cartItem) => cartItem.id === product.id
        );
        if (existingItemIndex !== -1) {
          // Product is already in shopping cart
          state.cartItems[existingItemIndex].quantity++;
        } else {
          // In case doesn't exist yet in shopping cart
          state.cartItems.push({ ...product, quantity: 1 });
        }
        // Recalculate total quantity
        state.totalQuantity = calculateTotal(state.cartItems, "quantity");
        // Recalculate total price
        state.totalPrice = calculateTotal(state.cartItems, "price");

        // Save in local storage
        setStateInLocalStorage(
          state.cartItems,
          state.totalQuantity,
          state.totalPrice
        );
      }
    },
    removeProductFromCart: (
      state,
      action: PayloadAction<RemoveProductFromCartAction>
    ) => {
      const { isUserCustomer, productId } = action.payload;
      if (isUserCustomer) {
        state.cartItems = state.cartItems.filter(
          (cartItem) => cartItem.id !== productId
        );
      }
      // Recalculate total quantity
      state.totalQuantity = calculateTotal(state.cartItems, "quantity");
      // Recalculate total price
      state.totalPrice = calculateTotal(state.cartItems, "price");

      // Save in local storage
      setStateInLocalStorage(
        state.cartItems,
        state.totalQuantity,
        state.totalPrice
      );
    },
    updateProductCart: (
      state,
      action: PayloadAction<UpdateProductCartAction>
    ) => {
      const { isUserCustomer, product, updatedQuantity } = action.payload;
      if (isUserCustomer) {
        const existingItemIndex = state.cartItems.findIndex(
          (cartItem) => cartItem.id === product.id
        );
        if (existingItemIndex !== -1) {
          // Product is already in shopping cart
          state.cartItems[existingItemIndex].quantity = updatedQuantity;
        }
        // Recalculate total quantity
        state.totalQuantity = calculateTotal(state.cartItems, "quantity");
        // Recalculate total price
        state.totalPrice = calculateTotal(state.cartItems, "price");

        // Save in local storage
        setStateInLocalStorage(
          state.cartItems,
          state.totalQuantity,
          state.totalPrice
        );
      }
    },
  },
});

export const { addProductToCart, removeProductFromCart, updateProductCart } =
  cartSlice.actions;

export default cartSlice.reducer;
