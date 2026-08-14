import { ImLocation } from "react-icons/im";
import { IoMdClose } from "react-icons/io";

// Components
import { InputTypeFieldset } from "../InputTypeFieldset/InputTypeFieldset";

export const AddressModal = ({ onClose, onSubmit, handleChange, formData }) => {
  // =========================================================================
  // 1. RENDER
  // =========================================================================
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className="border-borders/30 relative flex max-h-[90vh] w-[90%] max-w-md flex-col items-center gap-4 overflow-y-auto rounded-xl border bg-white shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
          className="hover:text-alert absolute top-2 right-4 cursor-pointer text-[24px] text-gray-500 transition-colors"
        >
          <IoMdClose />
        </button>
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
            value={formData.cep || ""}
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
