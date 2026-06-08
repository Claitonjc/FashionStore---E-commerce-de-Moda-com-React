import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { useUsers } from "../../hooks/useUsers";
import { useCart } from "../../hooks/useCart";
import { calcTotalPrice } from "../../utils/calculatePrice";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { NavigationLink } from "../../components/NavigationLink/NavigationLink";
import { ImLocation } from "react-icons/im";
import { InputTypeFieldset } from "../../components/InputTypeFieldset/InputTypeFieldset";
import { AddressList } from "../../components/AddressList/AddressList";
import { AddressModal } from "../../components/AddressModal/AddresModal";
import { useAddressForm } from "../../hooks/useAddressForm";
import { useState } from "react";

export const Address = () => {
  const [active, setActive] = useState(false);
  const {
    formData,
    handleChange,
    handleSubmit,
    addresses,
    setAddresses,
    removeAddress,
    editAddress,
    selectedAddress,
    setSelectedAddress,
  } = useAddressForm();

  const openModal = () => {
    setActive(true);
  };

  const closeModal = () => {
    setActive(false);
  };

  const handleEdit = (id) => {
    editAddress(id);
    openModal();
  };

  const submitAddress = (event) => {
    handleSubmit(event);
    closeModal();
  };

  const { userLogged } = useUsers();

  const { carts } = useCart();

  const userCart = carts.find((cart) => cart.userId === userLogged?.id);
  const { total, portion, discount } = calcTotalPrice(userCart);

  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header />
      <main className="bg-general-background relative flex flex-1 justify-center">
        <div className="flex w-full max-w-7xl flex-col justify-center lg:flex-row">
          <section className="w-full lg:w-[70%]">
            {userLogged && (
              <div className="bg-light border-borders/40 m-7 flex min-h-[100px] flex-col items-center items-start gap-2 rounded-xl border p-5">
                <h1 className="text-dark mb-5 w-full p-2 text-center text-[20px] font-semibold">
                  Selecione ou cadastre um novo endereço
                </h1>
                <ul className="w-full">
                  {addresses.length > 0 &&
                    addresses.map((address) => (
                      <AddressList
                        key={address.id}
                        cep={address.cep}
                        street={address.street}
                        number={address.number}
                        district={address.district}
                        city={address.city}
                        uf={address.uf}
                        addresses={addresses}
                        setAddresses={setAddresses}
                        id={address.id}
                        removeAddress={removeAddress}
                        handleEdit={handleEdit}
                        openModal={openModal}
                        value={address.id}
                        checked={selectedAddress === address.id}
                        onChange={(event) =>
                          setSelectedAddress(event.target.value)
                        }
                      />
                    ))}
                </ul>
                <a
                  onClick={(event) => {
                    event.stopPropagation();
                    openModal();
                  }}
                  className="cursor-pointer underline"
                >
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
                {!selectedAddress ? (
                  <div className="relative flex flex-col">
                    <p className="text-dark absolute -top-4.5 left-[25%] text-[12px]">
                      Selecione um endereço
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
                  rout="/carrinho"
                  text="Voltar"
                  variant="linkButtonWhite"
                />
              </div>
            </section>
          )}
        </div>
        {active && (
          <AddressModal
            onClose={closeModal}
            onSubmit={submitAddress}
            formData={formData}
            handleChange={handleChange}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};
