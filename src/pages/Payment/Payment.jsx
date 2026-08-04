import { FaPix } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate, Navigate } from "react-router-dom";

// Hooks
import { useUsers } from "../../hooks/useUsers";
import { useCheckout } from "../../hooks/useCheckout";
import { useCart } from "../../hooks/useCart";

// Components
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { NavigationLink } from "../../components/NavigationLink/NavigationLink";
import { CreditCardList } from "../../components/CreditCardList/CreditCardList";
import { AddCard } from "../../components/AddCard/AddCard";
import { calcTotalPrice } from "../../utils/calculatePrice";

export const Payment = () => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { userLogged } = useUsers();
  const { currentCart, isCartEmpty } = useCart();
  const {
    shippingOption,
    errorMessage,
    modalActive,
    setModalActive,
    authenticCard,
    stateAuthenticCard,
    setStateAuthenticCard,
    paymentMethod,
    setPaymentMethod,
  } = useCheckout();

  // =========================================================================
  // 2. DERIVED DATA & CALCULATIONS
  // =========================================================================
  const {
    subTotal,
    totalwithFreight,
    installmentsWithFreight,
    totalWithDiscount,
    totalDiscountFreight,
    installments,
    freight,
  } = calcTotalPrice(currentCart);

  const isExpress = shippingOption === "Entrega Expressa";

  const finalTotal = isExpress ? totalwithFreight : subTotal;
  const finalDiscount = isExpress ? totalDiscountFreight : totalWithDiscount;
  const finalInstallments = isExpress ? installmentsWithFreight : installments;
  const finalFreight = isExpress ? freight : "Grátis";

  // =========================================================================
  // 3. EFFECTS
  // =========================================================================
  useEffect(() => {
    if (stateAuthenticCard) {
      navigate("/checkout");
      setStateAuthenticCard(false);
    }
  }, [stateAuthenticCard, navigate, setStateAuthenticCard]);

  // =========================================================================
  // 4. GUARDS & REDIRECTS
  // =========================================================================
  if (!userLogged) {
    return <Navigate to="/login" replace />;
  }

  if (isCartEmpty) {
    return <Navigate to="/" replace />;
  }

  // =========================================================================
  // 5. RENDER
  // =========================================================================
  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header />
      <main className="bg-general-background flex flex-1 justify-center">
        <div className="flex w-full max-w-7xl flex-col justify-center lg:flex-row">
          <section className="w-full lg:w-[70%]">
            <div className="bg-light border-borders/40 m-7 flex min-h-25 flex-col items-start gap-2 rounded-xl border p-5">
              <h1 className="text-dark mb-5 w-full p-2 text-center text-[20px] font-semibold">
                Selecione a forma de pagamento
              </h1>
              <div className="w-full">
                <div className="border-borders bg-general-background mb-5 w-full items-center gap-2 rounded-xl border p-3 text-[12px]">
                  <label className="flex cursor-pointer items-center gap-2">
                    <div className="flex items-center gap-2 text-[20px]">
                      <input
                        type="radio"
                        name="payment"
                        value="pix"
                        checked={paymentMethod === "pix"}
                        onChange={() => setPaymentMethod("pix")}
                        className="cursor-pointer"
                      />
                      <FaPix className="text-[#32DC84]" />
                      <span>PIX</span>
                    </div>
                    <p className="rounded-2xl bg-green-300 px-2">10% OFF</p>
                    <p>Aprovação imediata</p>
                  </label>
                </div>
                <div className="border-borders flex flex-col rounded-xl border bg-white p-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex w-full cursor-pointer items-center justify-between"
                  >
                    <div className="flex items-center gap-2 text-[20px]">
                      <FaCreditCard />
                      <p>Cartão de crédito</p>
                    </div>

                    <IoIosArrowDown
                      className={`cursor-pointer text-[20px] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {modalActive ? (
                    <div>
                      <button
                        onClick={() => setModalActive(false)}
                        className="mb-3 cursor-pointer text-[12px]"
                      >
                        ← Retornar para a lista de cartões
                      </button>
                      <AddCard />
                    </div>
                  ) : (
                    <CreditCardList
                      isOpen={isOpen}
                      modalActive={modalActive}
                      setModalActive={setModalActive}
                    />
                  )}
                </div>
              </div>
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
            <div className="border-borders/30 sticky top-82.5 m-7 flex flex-col gap-3 rounded-xl border bg-white p-5 text-center">
              {errorMessage && <p>{errorMessage}</p>}
              <div className="relative flex flex-col">
                <button
                  onClick={() => authenticCard("checkout")}
                  className="bg-button-primary text-dark hover:bg-button-hover cursor-pointer rounded-xl px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95"
                >
                  Continuar
                </button>
              </div>

              <NavigationLink
                to="/shipping"
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
