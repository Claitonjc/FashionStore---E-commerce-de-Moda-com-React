import { useCart } from "../../hooks/useCart";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ProductsCart } from "../../components/ProductsCart/ProductsCart";
import { NavigationLink } from "../../components/NavigationLink/NavigationLink";
import { FormatPrice } from "../../components/FormatPrice/FormatPrice";
import { Link } from "react-router-dom";
import { useUsers } from "../../hooks/useUsers";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { calcTotalPrice } from "../../utils/calculatePrice";
import { useState } from "react";
import { useCheckout } from "../../hooks/useCheckout";

export const Carrinho = () => {
  const { userLogged } = useUsers();
  const { carts } = useCart();
  const { shippingOption } = useCheckout();

  const userCart = carts.find((cart) => cart.userId === userLogged?.id);
  const { total, portion, discount, subTotal, freight } =
    calcTotalPrice(userCart);

  const [emptyCartMessage, setEmptyCartMessage] = useState("");

  const emptyCart = () => {
    if (!userCart || userCart?.items?.length === 0) {
      setEmptyCartMessage("Seu carrinho está vazio");
      setTimeout(() => {
        setEmptyCartMessage("");
      }, 3000);
    }
  };

  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header title="Fashion Store" />
      <main className="bg-general-background flex flex-1 flex-col items-center">
        <div className="flex w-full max-w-7xl flex-col justify-center lg:flex-row">
          <section className="w-full lg:w-[70%]">
            {!userLogged ? (
              <div className="flex h-125 flex-col items-center justify-center gap-5">
                <p>You are not logged in.</p>
                <NavigationLink
                  rout="/login"
                  text="Log in"
                  variant="linkButton"
                />
              </div>
            ) : !userCart || userCart?.items?.length === 0 ? (
              <div className="flex min-h-100 flex-col items-center justify-center gap-2">
                <p>Seu carrinho está vazio!</p>

                <NavigationLink
                  rout="/"
                  text="Continue Comprando"
                  variant="linkButton"
                />
              </div>
            ) : (
              <ul>
                {userCart?.items?.map((produto) => (
                  <ProductsCart key={produto.id} produto={produto} />
                ))}
              </ul>
            )}
          </section>
          {userLogged && (
            <section className="flex w-full flex-col lg:w-[30%]">
              <OrderSummary
                subTotal={subTotal}
                total={
                  shippingOption === "Entrega Expressa"
                    ? total
                    : total - freight
                }
                discount={
                  shippingOption === "Entrega Expressa"
                    ? discount
                    : discount - freight
                }
                portion={
                  shippingOption === "Entrega Expressa"
                    ? portion
                    : subTotal / 10
                }
              />
              <div className="border-borders/30 sticky top-70 m-7 flex flex-col gap-3 rounded-xl border bg-white p-5 text-center">
                {!userCart || userCart?.items?.length === 0 ? (
                  <div className="relative flex flex-col">
                    <p className="text-dark absolute -top-4.5 left-[25%] text-[12px]">
                      {emptyCartMessage}
                    </p>
                    <button
                      onClick={emptyCart}
                      className="bg-button-primary text-dark hover:bg-button-hover cursor-pointer rounded-xl px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95"
                    >
                      Continuar
                    </button>
                  </div>
                ) : (
                  <NavigationLink
                    rout="/address"
                    text="Continuar"
                    variant="linkButton"
                  />
                )}
                <NavigationLink
                  rout="/"
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
