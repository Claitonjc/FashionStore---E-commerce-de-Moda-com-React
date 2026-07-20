import { useContext } from "react";
import { AddressContext } from "../context/addressContext/AddressContext";

export const useAddressForm = () => {
  const context = useContext(AddressContext);

  if (!context) {
    throw new Error("useAddressForm deve ser usado dentro de um AuthProvider");
  }

  return context;
};
