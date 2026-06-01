import { getProdutoPorId } from "../service/productService";
import { useFetch } from "./useFetch";

export const useProduct = (id) => {
  const { data, loading, error } = useFetch(() => getProdutoPorId(id), [id]);

  return {
    produto: data,
    loading,
    error,
  };
};
