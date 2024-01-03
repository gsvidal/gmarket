import { Product } from "../models";
import { productAdapter } from "./product.adapter";

export const productsAdapter = (productsBack: any) => {
  const productsFront: Product[] = productsBack.map((productBack: any) => productAdapter(productBack))
  return productsFront;
}