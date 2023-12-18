import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../models";

export type ProductState = {
  allProducts: Product[];
  sellerProducts: Product[];
};

type ProductAction = {
  isSellerProduct: boolean;
  product: Product;
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
    addProduct: (state, action: PayloadAction<ProductAction>) => {
      const { isSellerProduct, product } = action.payload;
      if (isSellerProduct) {
        state.sellerProducts.push(product);
      }
    },
    deleteProduct: (state, action: PayloadAction<ProductAction>) => {
      const { isSellerProduct, product } = action.payload;
      if (isSellerProduct) {
        state.sellerProducts = state.sellerProducts.filter(
          (sellerProduct) => sellerProduct.id !== product.id
        );
      }
    },
  },
});

export const { saveAllProducts, saveSellerProducts, addProduct, deleteProduct } = productSlice.actions 

export default productSlice.reducer