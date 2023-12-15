import { Product } from "../models";

export const productsAdapter = (productsBack: any) => {
  const productsFront: Product[] = productsBack.map((product: any) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image_url: product.image,
    category: product.category.name,
    category_code: product.category.code,
    seller: product.seller
  }))
  return productsFront;
}