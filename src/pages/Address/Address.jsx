import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { useUsers } from "../../hooks/useUsers";
import { useCart } from "../../hooks/useCart";
import { calcTotalPrice } from "../../utils/calculatePrice";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { NavigationLink } from "../../components/NavigationLink/NavigationLink";
import { ImLocation } from "react-icons/im";
import { InputTypeFieldset } from "../../components/InputTypeFieldset/InputTypeFieldset";
import { useState } from "react";
import { AddressList } from "../../components/AddressList/AddressList";

export const Address = () => {
  const [address, setAddress] = useState([
    {
      cep: "",
      street: "",
      number: "",
      district: "",
      city: "",
      uf: "",
    },
  ]);
  const { userLogged } = useUsers();

  const { carts } = useCart();

  const userCart = carts.find((cart) => cart.userId === userLogged?.id);
  const { total, portion, discount } = calcTotalPrice(userCart);

  const [active, setActive] = useState(false);

  const openModal = (e) => {
    e.stopPropagation();
    setActive(true);
  };

  const closeModal = () => {
    setActive(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(address);

  return (
    <div
      className="flex min-h-screen flex-col font-[inter]"
      onClick={closeModal}
    >
      <Header />
      <main className="bg-general-background relative flex flex-1 justify-center">
        <div className="flex w-full max-w-7xl flex-col justify-center lg:flex-row">
          <section className="w-full lg:w-[70%]">
            {userLogged && (
              <div className="bg-light border-borders/40 m-7 flex min-h-[100px] flex-col items-center items-start gap-2 rounded-xl border p-5">
                <ul className="w-full">
                  <AddressList
                    cep={address.cep}
                    street={address.street}
                    number={address.number}
                    district={address.district}
                    city={address.city}
                    uf={address.uf}
                  />
                </ul>
                <a onClick={openModal} className="cursor-pointer underline">
                  Cadastrar novo endereço
                </a>
              </div>
            )}
          </section>
          {userLogged && (
            <section className="flex w-full flex-col lg:w-[30%]">
              <OrderSummary
                total={total}
                discount={discount}
                portion={portion}
              />
              <div className="border-borders/30 sticky top-70 m-7 flex flex-col gap-3 rounded-xl border bg-white p-5 text-center">
                <NavigationLink
                  rout="#"
                  text="Continuar"
                  variant="linkButton"
                />
                <NavigationLink
                  rout="/carrinho"
                  text="Voltar"
                  variant="linkButtonWhite"
                />
              </div>
            </section>
          )}
        </div>
        {active && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/40"
            onClick={closeModal}
          >
            {/* Address Modal */}
            <section
              onClick={(e) => e.stopPropagation()}
              className="border-borders/30 flex flex-col items-center gap-4 rounded-xl border bg-white"
            >
              <p className="text-dark mt-5 flex items-center text-2xl font-semibold">
                <ImLocation className="text-button-primary" />
                Cadastrar Endereço
              </p>
              <form
                className="flex w-full flex-col items-center gap-3 p-6"
                onSubmit={handleSubmit}
              >
                <InputTypeFieldset
                  label="CEP*"
                  type="text"
                  name="cep"
                  value={address.cep}
                  onChange={handleChange}
                />
                <InputTypeFieldset
                  label="Logradouro*"
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleChange}
                />
                <InputTypeFieldset
                  label="Número*"
                  type="text"
                  name="number"
                  value={address.number}
                  onChange={handleChange}
                />
                <InputTypeFieldset
                  label="Bairro*"
                  type="text"
                  name="district"
                  value={address.district}
                  onChange={handleChange}
                />
                <div className="flex gap-3">
                  <InputTypeFieldset
                    label="Cidade*"
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                  />
                  <InputTypeFieldset
                    label="UF*"
                    type="text"
                    name="uf"
                    value={address.uf}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-button-primary text-dark hover:bg-button-hover mt-5 cursor-pointer rounded-xl px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95"
                >
                  Cadastrar Endereço
                </button>
              </form>
            </section>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};
