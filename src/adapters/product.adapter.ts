import { Product } from "../models";

export const productAdapter = (product: any) => {
  const productFront: Product = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    description: product.description,
    base_price: product.base_price,
    price: product.price,
    stock: product.stock,
    image_url: product.image,
    category: product.category,
    seller: product.seller,
  };
  return productFront;
};
