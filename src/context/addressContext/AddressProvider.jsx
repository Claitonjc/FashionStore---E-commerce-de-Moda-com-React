import { useCallback, useEffect, useMemo, useState } from "react";

// Context
import { AddressContext } from "./AddressContext";

// Hooks
import { useFetch } from "../../hooks/useFetch";
import { useLocalStorage } from "../../hooks/useLocalStorage";

// Utils
import { getAddress } from "../../service/getAddress";

// ==========================================================================
// CONSTANTS
// ==========================================================================
const INITIAL_FORM = {
  cep: "",
  street: "",
  number: "",
  district: "",
  city: "",
  uf: "",
};

export const AddressProvider = ({ children }) => {
  // ===========================================================================
  // 1.STATES & HOOKS
  // ===========================================================================
  const [cep, setCep] = useState("");
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [editingId, setEditingId] = useState(null);

  const [addresses, setAddresses] = useLocalStorage("addresses", []);
  const [selectedAddressId, setSelectedAddressId] = useLocalStorage(
    "addressSelected",
    "",
  );

  const { data: address } = useFetch(() => {
    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) return null;
    return getAddress(cleanCep);
  }, [cep]);

  // Derived variable: Searches for the selected address.
  const currentAddress = addresses.find(
    (item) => item.id === selectedAddressId,
  );

  // ===========================================================================
  // 2.ACTIONS (Business Rules and Address Logic)
  // ===========================================================================

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (editingId) {
        setAddresses((prev) =>
          prev.map((address) =>
            address.id === formData.id ? formData : address,
          ),
        );
        setEditingId(null);
      } else {
        const newAddress = {
          ...formData,
          id: crypto.randomUUID(),
        };
        setAddresses((prev) => [...prev, newAddress]);
      }
      setFormData(INITIAL_FORM);
    },
    [editingId, formData, setAddresses],
  );

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "cep") {
      setCep(value);
    }
  }, []);

  const removeAddress = useCallback(
    (id) => {
      setAddresses((prev) => prev.filter((item) => item.id !== id));
      setSelectedAddressId(null);
    },
    [setAddresses, setSelectedAddressId],
  );

  const editAddress = useCallback(
    (id) => {
      const addressToEdit = addresses.find((item) => item.id === id);

      if (!addressToEdit) return;

      setFormData(addressToEdit);
      setEditingId(id);
    },
    [addresses],
  );

  // ==============================================================================
  // 3.SIDE EFFECTS
  // ==============================================================================
  useEffect(() => {
    if (!address) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData((prev) => ({
      ...prev,
      cep: address.cep || "",
      street: address.logradouro || "",
      district: address.bairro || "",
      city: address.localidade || "",
      uf: address.uf || "",
    }));
  }, [address]);

  // ================================================================================
  // 4.MEMOIZATION & RETURN
  // ================================================================================
  const contextValue = useMemo(
    () => ({
      formData,
      addresses,
      selectedAddressId,
      editingId,
      handleChange,
      handleSubmit,
      removeAddress,
      editAddress,
      setAddresses,
      setSelectedAddressId,
      currentAddress,
    }),
    [
      formData,
      addresses,
      selectedAddressId,
      editingId,
      handleChange,
      handleSubmit,
      removeAddress,
      editAddress,
      setAddresses,
      setSelectedAddressId,
      currentAddress,
    ],
  );

  return (
    <AddressContext.Provider value={contextValue}>
      {children}
    </AddressContext.Provider>
  );
};
