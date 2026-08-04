import { getProductById } from "../service/productService";
import { useFetch } from "./useFetch";

export const useProduct = (id) => {
  const { data, loading, error } = useFetch(() => getProductById(id), [id]);

  return {
    product: data,
    loading,
    error,
  };
};
