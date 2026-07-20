import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { useUsers } from "../../hooks/useUsers";
import { calcTotalPrice } from "../../utils/calculatePrice";
import { useCart } from "../../hooks/useCart";
import { useCheckout } from "../../hooks/useCheckout";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { NavigationLink } from "../../components/NavigationLink/NavigationLink";
import { FormatPrice } from "../../components/FormatPrice/FormatPrice";

export const Shipping = () => {
  const { userLogged } = useUsers();
  const { shippingOption, setShippingOption, calcShippingValue } =
    useCheckout();
  const { carts } = useCart();

  const userCart = carts.find((cart) => cart.userId === userLogged?.id);
  const { subTotal, total, portion, discount, freight } =
    calcTotalPrice(userCart);
  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header />
      <main className="bg-general-background flex flex-1 justify-center">
        <div className="flex w-full max-w-7xl flex-col justify-center lg:flex-row">
          <section className="w-full lg:w-[70%]">
            {userLogged && (
              <div className="bg-light border-borders/40 m-7 flex min-h-25 flex-col items-center items-start gap-2 rounded-xl border p-5">
                <h1 className="text-dark mb-5 w-full p-2 text-center text-[20px] font-semibold">
                  Selecione uma forma de envio
                </h1>
                <ul className="w-full">
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
                        <FormatPrice preco={freight} variant="small" />
                      </div>
                    </label>
                  </li>
                </ul>
              </div>
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
                freight={calcShippingValue(shippingOption, freight)}
              />
              <div className="border-borders/30 sticky top-70 m-7 flex flex-col gap-3 rounded-xl border bg-white p-5 text-center">
                {!shippingOption ? (
                  <div className="relative flex flex-col">
                    <p className="text-dark absolute -top-4.5 left-[20%] text-[12px]">
                      Selecione uma forma de envio
                    </p>
                    <NavigationLink
                      rout="#"
                      text="Continuar"
                      variant="linkButton"
                    />
                  </div>
                ) : (
                  <NavigationLink
                    rout="/payment"
                    text="Continuar"
                    variant="linkButton"
                  />
                )}
                <NavigationLink
                  rout="/address"
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
