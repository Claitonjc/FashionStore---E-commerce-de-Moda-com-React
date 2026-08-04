import { GiCheckMark } from "react-icons/gi";
import { Navigate } from "react-router-dom";

// Hooks
import { useCheckout } from "../../hooks/useCheckout";
import { useUsers } from "../../hooks/useUsers";
import { useCart } from "../../hooks/useCart";

//Components
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { NavigationLink } from "../../components/NavigationLink/NavigationLink";

export const PurchaseComplete = () => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const { orderNumber } = useCheckout();
  const { userLogged } = useUsers();
  const { isCartEmpty } = useCart();

  // =========================================================================
  // 2. GUARDS & REDIRECTS
  // =========================================================================
  if (!userLogged) {
    return <Navigate to="/login" replace />;
  }

  if (isCartEmpty) {
    return <Navigate to="/" replace />;
  }

  // =========================================================================
  // 3. RENDER
  // =========================================================================
  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header />
      <main className="bg-general-background flex flex-1 items-center justify-center">
        <section className="border-borders/30 bg-light flex w-full max-w-md flex-col items-center justify-center gap-8 rounded-2xl border px-8 py-12 font-[inter] shadow-sm">
          <div className="border-borders/60 text-dark flex h-16 w-16 items-center justify-center rounded-full border">
            <GiCheckMark className="text-2xl" />
          </div>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-dark text-lg font-medium tracking-wide uppercase">
              Pedido realizado com sucesso!
            </h1>
            <p className="text-dark text-sm">Seu pagamento foi aprovado.</p>
            <span className="text-xs tracking-widest text-gray-400 uppercase">
              Pedido #{orderNumber}
            </span>
          </div>

          <div className="border-borders/40 flex w-full justify-center border-t pt-4">
            <NavigationLink
              to="/"
              text="Retornar para a loja"
              variant="linkButton"
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
