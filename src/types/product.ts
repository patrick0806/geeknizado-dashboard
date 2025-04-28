import { Category } from "./category";
import { Theme } from "./theme";

export type Product = {
    id: string;
    sku: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    discount: number;
    amount: number;
    weight: number;
    width: number;
    height: number;
    depth: number;
    category: Category;
    theme: Theme;
    images: ProductImage[];
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export type ProductImage = {
  id: string;
  url: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}