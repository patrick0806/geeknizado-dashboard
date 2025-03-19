export type Product = {
  id: string;
  code: string;
  name: string;
  description?: string;
  slug: string;
  price: number;
  discount: number;
  category: Category;
  theme: Theme;
  images: ProductImage[];
  stock: Stock;
  weight: number;
  length: number;
  width: number;
  height: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Theme = {
  id: string;
  name: string;
  description?: string;
  slug: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductImage = {
  id: string;
  productId: number;
  url: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Stock = {
  id: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
};
