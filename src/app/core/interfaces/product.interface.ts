// src/app/core/interfaces/product.interface.ts

export interface Product {
[x: string]: any;
  _id: string;
  title: string;
  description: string;
  imageCover: string;
   images?: string[];
    slug: string; 
  category?: Category;
  brand?: Brand;
  subcategory?: Subcategory[];
  ratingsAverage?: number;
  ratingsQuantity?: number;
  price: number;
  priceAfterDiscount?: number;
  sold?: number;
  quantity?: number;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug?: string;
  image?: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug?: string;
  image?: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug?: string;
  category?: string;
}
