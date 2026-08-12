import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { CheckoutContext } from "./checkoutContext/CheckoutContext";

// Hooks
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const CheckoutProvider = ({ children }) => {
  // =================================================================
  // 1.STATES & HOOKS
  // =================================================================
  const [cvv, setCvv] = useState("");
  const [modalActive, setModalActive] = useState(false);
  const [stateAuthenticCard, setStateAuthenticCard] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [orderNumber, setOrderNumber] = useLocalStorage("orderNumber", null);
  const [paymentMethod, setPaymentMethod] = useLocalStorage(
    "paymentMethod",
    "pix",
  );
  const [shippingOption, setShippingOption] = useLocalStorage(
    "shipping",
    "Grátis",
  );
  const [listUserCard, setListUserCard] = useLocalStorage("CardList", []);
  const [installments, setInstallments] = useLocalStorage("installments", "1");

  // ==================================================================
  // 2.ACTIONS (Business Rules and Checkout Logic)
  // ==================================================================
  const addUserCard = useCallback(
    (card) => {
      setListUserCard((prevCards) => [...prevCards, card]);
    },
    [setListUserCard],
  );

  const removeCard = useCallback(
    (id) => {
      setListUserCard((prevCards) =>
        prevCards.filter((card) => card.id !== id),
      );
    },
    [setListUserCard],
  );

  const authenticCard = useCallback(
    (route) => {
      // Case 1: Payment via PIX
      if (paymentMethod === "pix") {
        setErrorMessage("");
        setInstallments("1");
        navigate(`/${route}`);
        return;
      }

      // Case 2: Payment via Credit Card
      const isCard =
        typeof paymentMethod === "object" && paymentMethod !== null;

      if (isCard && paymentMethod.code !== cvv) {
        setErrorMessage("Erro no código CVV");
        return;
      }

      // Success
      setErrorMessage("");
      navigate(`/${route}`);
      setCvv("");
    },
    [cvv, navigate, paymentMethod, setInstallments],
  );

  const handleFinishPayment = useCallback(() => {
    const newOrderNumber = Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(newOrderNumber);
  }, [setOrderNumber]);

  /**
   * Finalizes the order, clears the cart, and redirects to the success screen.
   */
  const endPayment = useCallback(() => {
    handleFinishPayment();
    navigate("/complete");
  }, [navigate, handleFinishPayment]);

  // ===========================================================================
  // 3.MEMOIZATION & RETURN
  // ===========================================================================
  const contextValue = useMemo(
    () => ({
      paymentMethod,
      setPaymentMethod,
      shippingOption,
      setShippingOption,
      addUserCard,
      listUserCard,
      cvv,
      setCvv,
      modalActive,
      setModalActive,
      authenticCard,
      stateAuthenticCard,
      setStateAuthenticCard,
      errorMessage,
      setErrorMessage,
      installments,
      setInstallments,
      endPayment,
      removeCard,
      orderNumber,
    }),
    [
      paymentMethod,
      setPaymentMethod,
      shippingOption,
      setShippingOption,
      addUserCard,
      listUserCard,
      cvv,
      setCvv,
      modalActive,
      setModalActive,
      authenticCard,
      stateAuthenticCard,
      setStateAuthenticCard,
      errorMessage,
      setErrorMessage,
      installments,
      setInstallments,
      endPayment,
      removeCard,
      orderNumber,
    ],
  );

  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};
