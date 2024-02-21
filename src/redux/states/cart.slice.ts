import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product, CartProduct } from "../../models";

export type CartState = {
  cartItems: CartProduct[];
  cartTotalQuantity: number;
  cartTotalPrice: number;
};

type AddProductToCartAction = {
  product: Product;
};

type RemoveProductFromCartAction = {
  isUserCustomer: boolean;
  productId: number;
};

type UpdateProductCartAction = {
  productId: number;
  updatedQuantity: number;
};

// Making use of localStorage
const initialItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
const initialTotalQuantity = JSON.parse(
  localStorage.getItem("cartTotalQuantity") || "0"
);
const initialTotalPrice = JSON.parse(
  localStorage.getItem("cartTotalPrice") || "0"
);

const setStateInLocalStorage = (
  cartItems: CartProduct[],
  cartTotalQuantity: number,
  cartTotalPrice: number
) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  localStorage.setItem("cartTotalQuantity", JSON.stringify(cartTotalQuantity));
  localStorage.setItem("cartTotalPrice", JSON.stringify(cartTotalPrice));
};

const initialState: CartState = {
  cartItems: initialItems,
  cartTotalQuantity: initialTotalQuantity,
  cartTotalPrice: initialTotalPrice,
};

const calculateTotal = (
  cartItems: CartProduct[],
  property: "quantity" | "price"
) => {
  return cartItems.reduce((acum: number, curr: CartProduct) => {
    const multiplier = property === "price" ? curr["quantity"] : 1;
    return acum + curr[property] * multiplier;
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
      const { product } = action.payload;
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
      state.cartTotalQuantity = calculateTotal(state.cartItems, "quantity");
      // Recalculate total price
      state.cartTotalPrice = calculateTotal(state.cartItems, "price");

      // Save in local storage
      setStateInLocalStorage(
        state.cartItems,
        state.cartTotalQuantity,
        state.cartTotalPrice
      );
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
      state.cartTotalQuantity = calculateTotal(state.cartItems, "quantity");
      // Recalculate total price
      state.cartTotalPrice = calculateTotal(state.cartItems, "price");

      // Save in local storage
      setStateInLocalStorage(
        state.cartItems,
        state.cartTotalQuantity,
        state.cartTotalPrice
      );
    },
    updateProductCart: (
      state,
      action: PayloadAction<UpdateProductCartAction>
    ) => {
      const { productId, updatedQuantity } = action.payload;
      const productIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === productId
      );
      if (productIndex !== -1) {
      // Product is already in shopping cart
      state.cartItems[productIndex].quantity += updatedQuantity;
      } 
      // Recalculate total quantity
      state.cartTotalQuantity = calculateTotal(state.cartItems, "quantity");
      // Recalculate total price
      state.cartTotalPrice = calculateTotal(state.cartItems, "price");

      // Save in local storage
      setStateInLocalStorage(
        state.cartItems,
        state.cartTotalQuantity,
        state.cartTotalPrice
      );
    },
  },
});

export const { addProductToCart, removeProductFromCart, updateProductCart } =
  cartSlice.actions;

export default cartSlice.reducer;
