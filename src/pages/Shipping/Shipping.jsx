import { Navigate } from "react-router-dom";

// Hooks
import { useUsers } from "../../hooks/useUsers";
import { useCart } from "../../hooks/useCart";
import { useCheckout } from "../../hooks/useCheckout";

// Components
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { NavigationLink } from "../../components/NavigationLink/NavigationLink";
import { FormatPrice } from "../../components/FormatPrice/FormatPrice";

// Utils
import { calcTotalPrice } from "../../utils/calculatePrice";

export const Shipping = () => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const { userLogged } = useUsers();
  const { shippingOption, setShippingOption } = useCheckout();
  const { currentCart, isCartEmpty } = useCart();

  // ==========================================================================
  // 2. DERIVED DATA & CALCULATIONS
  // ==========================================================================
  const {
    subTotal,
    totalwithFreight,
    installments,
    installmentsWithFreight,
    totalWithDiscount,
    totalDiscountFreight,
    freight,
  } = calcTotalPrice(currentCart);

  const isExpress = shippingOption === "Entrega Expressa";

  const finalTotal = isExpress ? totalwithFreight : subTotal;
  const finalDiscount = isExpress ? totalDiscountFreight : totalWithDiscount;
  const finalInstallments = isExpress ? installmentsWithFreight : installments;
  const finalFreight = isExpress ? freight : "Grátis";

  // ==========================================================================
  // 3. GUARDS & REDIRECTS
  // ==========================================================================
  if (!userLogged) {
    return <Navigate to="/login" replace />;
  }

  if (isCartEmpty) {
    return <Navigate to="/" replace />;
  }

  // ==========================================================================
  // 4. RENDER
  // ==========================================================================
  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header />
      <main className="bg-general-background flex flex-1 justify-center">
        <div className="flex w-full max-w-7xl flex-col justify-center lg:flex-row">
          <section className="w-full lg:w-[70%]">
            <div className="bg-light border-borders/40 m-7 flex min-h-25 flex-col items-start gap-2 rounded-xl border p-5">
              <h1 className="text-dark mb-5 w-full p-2 text-center text-[20px] font-semibold">
                Selecione uma forma de envio
              </h1>
              <fieldset className="w-full">
                <legend className="sr-only">Opções de Frete</legend>
                <ul className="w-full space-y-4">
                  <li className="border-borders bg-general-background mb-5 flex w-full items-center justify-between gap-3 rounded-xl border p-3">
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="radio"
                        className="cursor-pointer"
                        name="shipping"
                        value="Grátis"
                        onChange={(event) =>
                          setShippingOption(event.target.value)
                        }
                        checked={shippingOption === "Grátis"}
                      />
                      <div className="flex flex-col">
                        <p className="font-semibold">Grátis</p>
                        <p className="text-[12px]">até 20 dias úteis</p>
                      </div>
                    </label>
                  </li>
                  <li className="border-borders bg-general-background mb-5 flex w-full items-center justify-between gap-3 rounded-xl border p-3">
                    <label className="flex w-full gap-2">
                      <input
                        type="radio"
                        className="cursor-pointer"
                        name="shipping"
                        value="Entrega Expressa"
                        onChange={(event) =>
                          setShippingOption(event.target.value)
                        }
                        checked={shippingOption === "Entrega Expressa"}
                      />
                      <div className="mr-3 flex w-full items-center justify-between">
                        <div>
                          <p>Entrega Expressa</p>
                          <p className="text-[12px]">até 7 dias úteis</p>
                        </div>
                        <FormatPrice price={freight} variant="small" />
                      </div>
                    </label>
                  </li>
                </ul>
              </fieldset>
            </div>
          </section>
          <section className="flex w-full flex-col lg:w-[30%]">
            <OrderSummary
              subTotal={subTotal}
              total={finalTotal}
              discount={finalDiscount}
              portion={finalInstallments}
              freight={finalFreight}
            />
            <div className="border-borders/30 m-7 flex flex-col gap-3 rounded-xl border bg-white p-5 text-center">
              <NavigationLink
                to="/payment"
                text="Continuar"
                variant="linkButton"
              />

              <NavigationLink
                to="/address"
                text="Voltar"
                variant="linkButtonWhite"
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};
