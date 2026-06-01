import { useContext } from "react";
import { UsersContext } from "../context/UsersContext/UsersContext";

export const useUsers = () => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error("useUsers deve ser usado dentro de um AuthProvider");
  }

  return context;
};
