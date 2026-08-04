// Hooks
import { useCart } from "../../hooks/useCart";
import { useUsers } from "../../hooks/useUsers";
import { useCheckout } from "../../hooks/useCheckout";

// Components
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ProductsCart } from "../../components/ProductsCart/ProductsCart";
import { NavigationLink } from "../../components/NavigationLink/NavigationLink";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";

// Utils
import { calcTotalPrice } from "../../utils/calculatePrice";

export const Cart = () => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const { userLogged } = useUsers();
  const { currentCart, isCartEmpty } = useCart();
  const { shippingOption } = useCheckout();

  // =========================================================================
  // 2. DERIVED DATA & CALCULATIONS
  // =========================================================================
  const {
    totalwithFreight,
    installments,
    installmentsWithFreight,
    totalWithDiscount,
    subTotal,
    freight,
  } = calcTotalPrice(currentCart);

  const isExpress = shippingOption === "Entrega Expressa";

  const finalTotal = isExpress ? totalwithFreight : subTotal;
  const finalDiscount = isExpress
    ? totalWithDiscount + freight
    : totalWithDiscount;
  const finalInstallments = isExpress ? installmentsWithFreight : installments;

  // =========================================================================
  // 3. RENDER
  // =========================================================================
  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header title="Fashion Store" />
      <main className="bg-general-background flex flex-1 flex-col items-center">
        <div className="flex w-full max-w-7xl flex-col justify-center lg:flex-row">
          <section className="w-full lg:w-[70%]">
            {!userLogged ? (
              <div className="flex h-125 flex-col items-center justify-center gap-5">
                <p>Você não está logado.</p>
                <NavigationLink
                  to="/login"
                  text="Entrar"
                  variant="linkButton"
                />
              </div>
            ) : isCartEmpty ? (
              <div className="flex min-h-100 flex-col items-center justify-center gap-2">
                <p>Seu carrinho está vazio!</p>

                <NavigationLink
                  to="/"
                  text="Continue Comprando"
                  variant="linkButton"
                />
              </div>
            ) : (
              <ul>
                {currentCart?.items?.map((product) => (
                  <ProductsCart key={product.id} product={product} />
                ))}
              </ul>
            )}
          </section>
          {userLogged && (
            <section className="flex w-full flex-col lg:w-[30%]">
              <OrderSummary
                subTotal={subTotal}
                total={finalTotal}
                discount={finalDiscount}
                portion={finalInstallments}
              />
              <div className="border-borders/30 sticky top-70 m-7 flex flex-col gap-3 rounded-xl border bg-white p-5 text-center">
                <div className="relative flex flex-col">
                  {isCartEmpty && (
                    <p className="text-dark absolute -top-4.5 left-[25%] text-[12px]">
                      Seu carrinho está vazio
                    </p>
                  )}
                  <NavigationLink
                    to="/address"
                    text="Continuar"
                    variant="linkButton"
                    disabled={isCartEmpty}
                  />
                </div>
                <NavigationLink
                  to="/"
                  text="Voltar"
                  variant="linkButtonWhite"
                />
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
