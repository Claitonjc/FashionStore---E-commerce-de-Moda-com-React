import { useFetch } from "../../hooks/useFetch";
import { ProductCard } from "../ProductCard/ProductCard";
import { getProdutos } from "../../service/productService";
import { getProdutosPorCategoria } from "../../service/productService";
import { ProductCardSkeleton } from "../ProductCardSkeleton/ProductCardSkeleton";

export const ProductList = ({ filter }) => {
  const productsFilter =
    filter === "all" ? getProdutos : () => getProdutosPorCategoria(filter);

  const { data: produtos, loading, error } = useFetch(productsFilter, [filter]);

  if (error) return <p>{error}</p>;

  return (
    <ul className="mt-10 mb-5 flex w-[90%] flex-wrap justify-center gap-6 px-4 pt-5 md:px-6 lg:px-8">
      {loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        : (produtos || []).map((produto) => (
            <ProductCard key={produto.id} produto={produto} />
          ))}
    </ul>
  );
};
