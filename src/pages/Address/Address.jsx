import { useState, useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";

// Hooks
import { useUsers } from "../../hooks/useUsers";
import { useCart } from "../../hooks/useCart";
import { useCheckout } from "../../hooks/useCheckout";
import { useAddressForm } from "../../hooks/useAddressForm";

// Components
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { OrderSummary } from "../../components/OrderSummary/OrderSummary";
import { NavigationLink } from "../../components/NavigationLink/NavigationLink";
import { AddressList } from "../../components/AddressList/AddressList";
import { AddressModal } from "../../components/AddressModal/AddresModal";

// Utils
import { calcTotalPrice } from "../../utils/calculatePrice";

export const Address = () => {
  // ========================================================================
  // 1. STATES & HOOKS
  // ========================================================================
  const [isModalActive, setIsModalActive] = useState(false);

  const { shippingOption } = useCheckout();
  const { userLogged } = useUsers();
  const { currentCart, isCartEmpty } = useCart();
  const {
    formData,
    handleChange,
    handleSubmit,
    addresses,
    setAddresses,
    removeAddress,
    editAddress,
    selectedAddressId,
    setSelectedAddressId,
  } = useAddressForm();

  // =========================================================================
  // 2. DERIVED DATA & CALCULATIONS
  // =========================================================================
  const {
    totalwithFreight,
    installments,
    totalWithDiscount,
    installmentsWithFreight,
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
  // 3. HANDLERS
  // =========================================================================
  const openModal = useCallback(() => {
    setIsModalActive(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalActive(false);
  }, []);

  const handleEdit = useCallback(
    (id) => {
      editAddress(id);
      openModal();
    },
    [editAddress, openModal],
  );

  const submitAddress = useCallback(
    (event) => {
      handleSubmit(event);
      closeModal();
    },
    [handleSubmit, closeModal],
  );

  // =========================================================================
  // 4. EFFECTS
  // =========================================================================
  useEffect(() => {
    if (!selectedAddressId && addresses.length > 0) {
      setSelectedAddressId(addresses[0].id);
    }
  }, [addresses, selectedAddressId, setSelectedAddressId]);

  // =========================================================================
  // 5. GUARDS & REDIRECTS
  // =========================================================================
  if (!userLogged) {
    return <Navigate to="/login" replace />;
  }

  if (isCartEmpty) {
    return <Navigate to="/" replace />;
  }

  // =========================================================================
  // 6. RENDER
  // =========================================================================
  return (
    <div className="flex min-h-screen flex-col font-[inter]">
      <Header />
      <main className="bg-general-background relative flex flex-1 justify-center">
        <div className="flex w-full max-w-7xl flex-col justify-center lg:flex-row">
          {/* Left Section: Address List */}
          <section className="w-full lg:w-[70%]">
            <div className="bg-light border-borders/40 m-7 flex min-h-25 flex-col items-start gap-2 rounded-xl border p-5">
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
                      checked={selectedAddressId === address.id}
                      onChange={(event) =>
                        setSelectedAddressId(event.target.value)
                      }
                    />
                  ))}
              </ul>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  openModal();
                }}
                className="cursor-pointer underline"
              >
                Cadastrar novo endereço
              </button>
            </div>
          </section>
          {/* Right Section: Order Summary */}
          <section className="flex w-full flex-col lg:w-[30%]">
            <OrderSummary
              subTotal={subTotal}
              total={finalTotal}
              discount={finalDiscount}
              portion={finalInstallments}
            />
            <div className="border-borders/30 sticky top-70 m-7 flex flex-col gap-3 rounded-xl border bg-white p-5 text-center">
              <div className="relative flex flex-col">
                {!selectedAddressId && (
                  <p className="text-dark absolute -top-4.5 left-[25%] text-[12px]">
                    Selecione um endereço
                  </p>
                )}
                <NavigationLink
                  to="/shipping"
                  text="Continuar"
                  variant="linkButton"
                  disabled={!selectedAddressId}
                />
              </div>
              <NavigationLink
                to="/cart"
                text="Voltar"
                variant="linkButtonWhite"
              />
            </div>
          </section>
        </div>
        {/* Address Modal */}
        {isModalActive && (
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
