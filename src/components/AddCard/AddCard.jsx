import { useState } from "react";

// Hooks
import { useCheckout } from "../../hooks/useCheckout";

// Components
import { InputTypeFieldset } from "../InputTypeFieldset/InputTypeFieldset";

//Utils
import { maskCpf, maskCard } from "../../utils/masks";

// ==========================================================================
// CONSTANTS
// ==========================================================================
const INITIAL_FORM = {
  number: "",
  name: "",
  validity: "",
  code: "",
  alias: "",
  cpf: "",
  birth: "",
};

export const AddCard = () => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const [formData, setFormData] = useState(INITIAL_FORM);

  const { addUserCard, setModalActive } = useCheckout();

  // =========================================================================
  // 2. ACTIONS
  // =========================================================================
  const handleSubmit = (event) => {
    event.preventDefault();

    const newCard = {
      ...formData,
      id: crypto.randomUUID(),
    };

    addUserCard(newCard);
    setFormData(INITIAL_FORM);
    setModalActive(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    let newValue = value;

    if (name === "cpf") {
      newValue = value.replace(/\D/g, "").slice(0, 11);
    }

    if (name === "number") {
      newValue = value.replace(/\D/g, "").slice(0, 16);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // =========================================================================
  // 3. RENDER
  // =========================================================================
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
      <div className="flex w-full flex-col gap-3">
        <InputTypeFieldset
          label="Número do cartão*"
          type="text"
          name="number"
          value={maskCard(formData.number)}
          onChange={handleChange}
          required
        />
        <InputTypeFieldset
          label="Nome impresso no cartão*"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="placeholder:text-xl"
          required
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <InputTypeFieldset
            label="Validade*"
            type="month"
            name="validity"
            value={formData.validity}
            onChange={handleChange}
            required
          />
          <InputTypeFieldset
            label="Código de verificação*"
            type="password"
            name="code"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>
        <InputTypeFieldset
          label="Apelido para este cartão"
          type="text"
          name="alias"
          value={formData.alias}
          onChange={handleChange}
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <InputTypeFieldset
            label="CPF do titular*"
            type="text"
            name="cpf"
            value={maskCpf(formData.cpf)}
            onChange={handleChange}
            required
            maxLength={14}
          />
          <InputTypeFieldset
            label="Data de nascimento*"
            type="date"
            name="birth"
            value={formData.birth}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-button-primary text-dark hover:bg-button-hover cursor-pointer rounded-xl px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95"
      >
        Adicionar Cartão
      </button>
    </form>
  );
};
