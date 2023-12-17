import { Product } from "../models";

export const productsAdapter = (productsBack: any) => {
  const productsFront: Product[] = productsBack.map((product: any) => ({
    id: product.id,
    name: product.name,
    brand: product.brand,
    description: product.description,
    base_price: product.base_price,
    price: product.price,
    stock: product.stock,
    image_url: product.image,
    category: product.category,
    seller: product.seller
  }))
  return productsFront;
}