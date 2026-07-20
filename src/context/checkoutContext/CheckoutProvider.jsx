import { useState } from "react";
import { CheckoutContext } from "./checkoutContext";
import { FormatPrice } from "../../components/FormatPrice/FormatPrice";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export const CheckoutProvider = ({ children }) => {
  const [selectedAddressId, setSelectedAddressId] = useLocalStorage(
    "addressSelected",
    "",
  );
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [shippingOption, setShippingOption] = useLocalStorage(
    "shipping",
    "Grátis",
  );
  const [listUserCard, setListUserCard] = useLocalStorage("CardList", []);
  const [cvv, setCvv] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [selectedCard, setSelectedCard] = useLocalStorage("cardSelected", "");
  const [stateAuthenticCard, setStateAuthenticCard] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedMethod, setSelectedMethod] = useLocalStorage("portions", "1");
  const { clearCart } = useCart();

  const navigate = useNavigate();

  const calcShippingValue = (value, freight) => {
    if (value === "Grátis") {
      return "Grátis";
    } else if (value === "Entrega Expressa") {
      return <FormatPrice preco={freight} variant="small" />;
    }
  };

  const addUserCard = (card) => {
    setListUserCard((prevCards) => [...prevCards, card]);
  };

  const authenticCard = (route) => {
    if (selectedCard === "pix") {
      setErrorMessage("");
      setSelectedMethod("1");
      navigate(`/${route}`);
      return;
    }

    if (selectedCard.code !== cvv) {
      setErrorMessage("Erro no código CVV");
      return;
    }

    setErrorMessage("");
    navigate(`/${route}`);
    setCvv("");
  };

  const endPayment = () => {
    clearCart();
    navigate("/complete");
  };

  return (
    <CheckoutContext.Provider
      value={{
        selectedAddressId,
        setSelectedAddressId,
        paymentMethod,
        setPaymentMethod,
        shippingOption,
        setShippingOption,
        calcShippingValue,
        addUserCard,
        listUserCard,
        cvv,
        setCvv,
        modalActive,
        setModalActive,
        authenticCard,
        selectedCard,
        setSelectedCard,
        stateAuthenticCard,
        setStateAuthenticCard,
        errorMessage,
        setErrorMessage,
        selectedMethod,
        setSelectedMethod,
        endPayment,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};
