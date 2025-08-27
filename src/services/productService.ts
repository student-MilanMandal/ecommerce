export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const BASE_URL = 'https://fakestoreapi.com';

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);
  return response.json();
}

export async function fetchProduct(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  return response.json();
}

export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/products/categories`);
  return response.json();
}
