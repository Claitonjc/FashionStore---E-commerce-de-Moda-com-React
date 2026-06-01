import { useParams } from "react-router-dom";
import { ProductInfo } from "../../components/ProductInfo/ProductInfo";
import { useProduct } from "../../hooks/useProduct";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { NavigationLink } from "../../components/NavigationLink/NavigationLink";
import { TiShoppingCart } from "react-icons/ti";
import { ProductInfoSkeleton } from "../../components/ProductInfoSkeleton/ProductInfoSkeleton";
import { BsCart3 } from "react-icons/bs";

export const ProductDetails = () => {
  const { id } = useParams();

  const { produto, loading, error } = useProduct(id);

  if (error) return <p>{error}</p>;

  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header title="Fashion Store" />
      <main className="bg-general-background flex flex-1 flex-col items-center">
        <nav className="border-borders flex w-full items-center justify-between border p-1">
          <NavigationLink rout={"/"} text="← Return to main page" />
        </nav>
        {loading ? <ProductInfoSkeleton /> : <ProductInfo produto={produto} />}
      </main>
      <Footer />
    </div>
  );
};
