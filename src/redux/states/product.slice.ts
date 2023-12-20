import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../models";

export type ProductState = {
  allProducts: Product[];
  sellerProducts: Product[];
};

type AddProductAction = {
  isSellerProduct: boolean;
  product: Product;
};

type RemoveProductAction = {
  isSellerProduct: boolean;
  productId: number;
};

const initialState: ProductState = {
  allProducts: [],
  sellerProducts: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    saveAllProducts: (state, action: PayloadAction<Product[]>) => {
      state.allProducts = action.payload;
    },
    saveSellerProducts: (state, action: PayloadAction<Product[]>) => {
      state.sellerProducts = action.payload;
    },
    addProduct: (state, action: PayloadAction<AddProductAction>) => {
      const { isSellerProduct, product } = action.payload;
      if (isSellerProduct) {
        state.sellerProducts.push(product);
      }
    },
    removeProduct: (state, action: PayloadAction<RemoveProductAction>) => {
      const { isSellerProduct, productId } = action.payload;
      if (isSellerProduct) {
        state.sellerProducts = state.sellerProducts.filter(
          (sellerProduct) => sellerProduct.id !== productId
        );
      }
    },
  },
});

export const {
  saveAllProducts,
  saveSellerProducts,
  addProduct,
  removeProduct,
} = productSlice.actions;

export default productSlice.reducer;
