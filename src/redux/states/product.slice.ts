import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../models";

export type ProductState = {
  allProducts: Product[];
  sellerProducts: Product[];
};

type AddProductAction = {
  isDashboardProduct: boolean;
  product: Product;
};

type EditProductAction = {
  isDashboardProduct: boolean;
  productToEdit: Product;
};

type RemoveProductAction = {
  isDashboardProduct: boolean;
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
      const { isDashboardProduct, product } = action.payload;
      if (isDashboardProduct) {
        state.sellerProducts.push(product);
      }
    },
    removeProduct: (state, action: PayloadAction<RemoveProductAction>) => {
      const { isDashboardProduct, productId } = action.payload;
      if (isDashboardProduct) {
        state.sellerProducts = state.sellerProducts.filter(
          (sellerProduct) => sellerProduct.id !== productId
        );
      }
    },
    editProduct: (state, action: PayloadAction<EditProductAction>) => {
      const { isDashboardProduct, productToEdit } = action.payload;
      if (isDashboardProduct) {
        state.sellerProducts = state.sellerProducts.map((sellerProduct) =>
          sellerProduct.id === productToEdit.id ? productToEdit : sellerProduct
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
  editProduct,
} = productSlice.actions;

export default productSlice.reducer;
