import { useContext } from "react";
import { CheckoutContext } from "../context/checkoutContext/checkoutContext";

export const useCheckout = () => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("useCheckout deve ser usado dentro de um AuthProvider");
  }

  return context;
};
