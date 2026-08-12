import { useParams } from "react-router-dom";

// Hooks
import { useProduct } from "../../hooks/useProduct";

// Components
import { ProductInfo } from "../../components/ProductInfo/ProductInfo";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { NavigationLink } from "../../components/NavigationLink/NavigationLink";
import { ProductInfoSkeleton } from "../../components/ProductInfoSkeleton/ProductInfoSkeleton";

export const ProductDetails = () => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const { id } = useParams();

  const { product, loading, error } = useProduct(id);

  // =========================================================================
  // 2. GUARDS & ERROR HANDLING
  // =========================================================================
  if (error) {
    return (
      <div className="flex min-h-screen flex-col font-[inter]">
        <Header title="Fashion Store" />
        <main className="bg-general-background flex flex-1 flex-col items-center">
          <p className="text-alert font-medium">
            Erro ao carregar o produto: {error}
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  // =========================================================================
  // 3. RENDER
  // =========================================================================
  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header title="Fashion Store" />
      <main className="bg-general-background flex flex-1 flex-col items-center">
        <nav className="border-borders/40 flex w-full items-center justify-between border-b-2 p-1">
          <NavigationLink to={"/"} text="← Retornar para a loja" />
        </nav>
        {loading ? <ProductInfoSkeleton /> : <ProductInfo product={product} />}
      </main>
      <Footer />
    </div>
  );
};
