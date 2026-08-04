import { api } from "./api";

// search for all products
export const getProducts = async () => {
  const products = await api("/products");
  return products;
};

// searches for the product by ID
export const getProductById = async (id) => {
  const product = await api(`/products/${id}`);
  return product;
};

// search for products by category
export const getProductsByCategory = async (category) => {
  const products = await api(`/products/category/${category}`);
  return products;
};
