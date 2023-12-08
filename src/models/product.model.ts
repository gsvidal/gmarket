import { User, Category } from ".";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  category: Category[];
  seller: User;
}