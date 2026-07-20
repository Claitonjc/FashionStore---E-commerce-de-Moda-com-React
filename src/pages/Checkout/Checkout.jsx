import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { useUsers } from "../../hooks/useUsers";
import { calcTotalPrice } from "../../utils/calculatePrice";
import { useCheckout } from "../../hooks/useCheckout";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { useCart } from "../../hooks/useCart";
import { NavigationLink } from "../../components/NavigationLink/NavigationLink";
import { FaPix } from "react-icons/fa6";
import { CreditCardList } from "../../components/CreditCardList/CreditCardList";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { AddCard } from "../../components/AddCard/AddCard";
import { FaCreditCard } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAddressForm } from "../../hooks/useAddressForm";
import { FormatPrice } from "../../components/FormatPrice/FormatPrice";

export const Checkout = () => {
  const navigate = useNavigate();
  const { userLogged } = useUsers();
  const { carts } = useCart();
  const {
    shippingOption,
    errorMessage,
    setErrorMessage,
    modalActive,
    setModalActive,
    authenticCard,
    stateAuthenticCard,
    setStateAuthenticCard,
    selectedCard,
    setSelectedCard,
    selectedAddressId,
    selectedMethod,
    calcShippingValue,
    endPayment,
  } = useCheckout();
  const [isOpen, setIsOpen] = useState(false);
  const { addresses } = useAddressForm();

  const userCart = carts.find((cart) => cart.userId === userLogged?.id);
  const { subTotal, total, discount, portion, freight } =
    calcTotalPrice(userCart);

  const address = addresses.find((item) => item.id === selectedAddressId);

  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header />
      <main className="bg-general-background flex flex-1 justify-center">
        <div className="flex w-full max-w-7xl flex-col justify-center lg:flex-row">
          <section className="w-full lg:w-[70%]">
            {userLogged && (
              <div className="bg-light border-borders/40 m-7 flex min-h-25 flex-col items-start gap-2 rounded-xl border p-5">
                <h1 className="text-dark mb-5 w-full p-2 text-center text-[20px] font-semibold">
                  Revisão
                </h1>
                <div className="w-full">
                  <div className="flex gap-3">
                    <div className="border-borders bg-general-background mb-5 flex w-full flex-col items-center items-start gap-2 rounded-xl border p-3 text-[12px]">
                      <h2 className="text-[14px] font-semibold">
                        Informações da conta:
                      </h2>
                      <div>
                        <p>Nome: {userLogged.name}</p>
                        <p>E-mail: {userLogged.email}</p>
                      </div>
                    </div>
                    <div className="border-borders bg-general-background mb-5 flex w-full flex-col items-center items-start gap-2 rounded-xl border p-3 text-[12px]">
                      <h2 className="text-[14px] font-semibold">
                        Seu pedido será entregue em:
                      </h2>
                      <div>
                        <p>
                          Endereço: {address.street}, {address.number},{" "}
                          {address.district}
                        </p>
                        <p>Cidade: {address.city}</p>
                        <p>CEP: {address.cep}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-borders bg-general-background mb-5 flex w-full flex-col items-center items-start gap-2 rounded-xl border p-3">
                    <h2 className="text-[14px] font-semibold">
                      Forma de entrega:
                    </h2>
                    <p className="text-[12px]">{shippingOption}</p>
                  </div>
                  <div className="border-borders flex flex-col rounded-xl border bg-white p-3">
                    <h2 className="text-[14px] font-semibold">
                      Forma de Pagamento:
                    </h2>
                    {selectedCard !== "pix" ? (
                      <div className="flex items-center gap-1">
                        <p className="mt-0.75 text-[12px]">
                          {selectedMethod}x sem juros de
                        </p>
                        <FormatPrice
                          preco={(total - freight) / selectedMethod}
                          variant="medium"
                        />
                      </div>
                    ) : (
                      <span className="text-[12px]">Pix</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
          {userLogged && (
            <section className="flex w-full flex-col lg:w-[30%]">
              <aside className="border-borders/30 sticky top-5 m-7 flex h-fit flex-col gap-2 rounded-xl border bg-white p-5">
                <h2 className="text-[20px] font-semibold">Resumo do pedido</h2>
                <div className="mt-2 flex flex-col justify-between gap-3 border-b-2 pb-4 text-[12px]">
                  <div className="flex items-center justify-between">
                    <p className="text-[14px]">Valor dos produtos: </p>
                    <FormatPrice preco={subTotal} variant="small" />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[14px]">Frete:</p>
                    {shippingOption !== "Grátis" ? (
                      <FormatPrice preco={freight} variant="small" />
                    ) : (
                      <p className="text-[12px] font-bold">Grátis</p>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex justify-between text-[12px]">
                  <h3 className="text-[16px] font-semibold">Total:</h3>
                  {selectedCard !== "pix" ? (
                    <FormatPrice preco={subTotal + freight} variant="small" />
                  ) : (
                    <p className="flex items-center text-[14px]">
                      Desconto no pix:
                      <FormatPrice preco={discount} variant="small" />
                    </p>
                  )}
                </div>
              </aside>
              <div className="border-borders/30 sticky top-70 m-7 flex flex-col gap-3 rounded-xl border bg-white p-5 text-center">
                {errorMessage && <p>{errorMessage}</p>}
                <div className="relative flex flex-col">
                  <button
                    onClick={endPayment}
                    className="bg-button-primary text-dark hover:bg-button-hover cursor-pointer rounded-xl px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95"
                  >
                    Finalizar
                  </button>
                </div>

                <NavigationLink
                  rout="/payment"
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
