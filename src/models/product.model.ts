import { Seller, Category } from ".";

export interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  base_price: number;
  price: number;
  stock: number;
  image_url: string | null;
  category: Category;
  seller: Seller;
}