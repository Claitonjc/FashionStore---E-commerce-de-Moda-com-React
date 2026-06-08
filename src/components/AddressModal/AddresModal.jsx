import { InputTypeFieldset } from "../InputTypeFieldset/InputTypeFieldset";
import { ImLocation } from "react-icons/im";

export const AddressModal = ({ onClose, onSubmit, handleChange, formData }) => {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="border-borders/30 flex flex-col items-center gap-4 rounded-xl border bg-white"
      >
        <p className="text-dark mt-5 flex items-center text-2xl font-semibold">
          <ImLocation className="text-button-primary" />
          Cadastrar Endereço
        </p>
        <form
          className="flex w-full flex-col items-center gap-3 p-6"
          onSubmit={onSubmit}
        >
          <InputTypeFieldset
            label="CEP*"
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleChange}
          />
          <InputTypeFieldset
            label="Logradouro*"
            type="text"
            name="street"
            value={formData.street || ""}
            onChange={handleChange}
          />
          <InputTypeFieldset
            label="Número*"
            type="text"
            name="number"
            value={formData.number || ""}
            onChange={handleChange}
          />
          <InputTypeFieldset
            label="Bairro*"
            type="text"
            name="district"
            value={formData.district || ""}
            onChange={handleChange}
          />
          <div className="flex gap-3">
            <InputTypeFieldset
              label="Cidade*"
              type="text"
              name="city"
              value={formData.city || ""}
              onChange={handleChange}
            />
            <InputTypeFieldset
              label="UF*"
              type="text"
              name="uf"
              value={formData.uf || ""}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="bg-button-primary text-dark hover:bg-button-hover mt-5 cursor-pointer rounded-xl px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95"
          >
            Cadastrar Endereço
          </button>
        </form>
      </section>
    </div>
  );
};
