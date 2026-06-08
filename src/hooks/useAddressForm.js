import { useEffect, useState } from "react";
import { useFetch } from "./useFetch";
import { getAddress } from "../service/addressService";
import { useLocalStorage } from "./useLocalStorage";

export const useAddressForm = () => {
  const INITIAL_FORM = {
    id: crypto.randomUUID(),
    cep: "",
    street: "",
    number: "",
    district: "",
    city: "",
    uf: "",
  };
  const [cep, setCep] = useState("");
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [addresses, setAddresses] = useLocalStorage("addresses", []);
  const [editingId, setEditingId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const {
    data: address,
    loading,
    error,
  } = useFetch(() => {
    if (cep.length !== 8) return null;
    return getAddress(cep);
  }, [cep]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingId) {
      setAddresses((prev) =>
        prev.map((address) =>
          address.id === formData.id ? formData : address,
        ),
      );
      setFormData(INITIAL_FORM);
    } else {
      setAddresses((prev) => [...prev, formData]);
      setFormData(INITIAL_FORM);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "cep") {
      setCep(value);
    }
  };

  const removeAddress = (id) => {
    setAddresses((prev) => prev.filter((item) => item.id !== id));
  };

  const editAddress = (id) => {
    const addressToEdit = addresses.find((item) => item.id === id);

    if (!addressToEdit) return;

    setFormData(addressToEdit);
    setEditingId(id);
  };

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

  return {
    formData,
    handleChange,
    handleSubmit,
    addresses,
    setAddresses,
    removeAddress,
    editAddress,
    selectedAddress,
    setSelectedAddress,
  };
};
