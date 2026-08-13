// Hooks
import { useFetch } from "../../hooks/useFetch";

// Services
import {
  getProducts,
  getProductsByCategory,
} from "../../service/productService";

// Components
import { ProductCard } from "../ProductCard/ProductCard";
import { ProductCardSkeleton } from "../ProductCardSkeleton/ProductCardSkeleton";

export const ProductList = ({ filter }) => {
  // =========================================================================
  // 1. DERIVED DATA
  // =========================================================================
  const productsFilter =
    filter === "all" ? getProducts : () => getProductsByCategory(filter);

  // =========================================================================
  // 2. STATES & HOOKS
  // =========================================================================
  const { data: products, loading, error } = useFetch(productsFilter, [filter]);

  // =========================================================================
  // 3. GUARDS (Early Returns)
  // =========================================================================
  if (error) {
    return (
      <div className="mb-10 flex w-full justify-center pt-20">
        <p className="text-alert font-medium">
          Erro ao carregar os produtos: {error}
        </p>
      </div>
    );
  }

  // ==========================================================================
  // 4. RENDER
  // ==========================================================================
  return (
    <ul className="mt-10 mb-5 flex w-full flex-wrap justify-center gap-3 px-4 pt-5 sm:w-[90%] md:gap-6 md:px-6 lg:px-8">
      {loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        : (products || []).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </ul>
  );
};
