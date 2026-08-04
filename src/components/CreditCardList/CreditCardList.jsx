import { FaPlus } from "react-icons/fa";

// Components
import { CreditCard } from "../CreditCard/CreditCard";

export const CreditCardList = ({ isOpen, modalActive, setModalActive }) => {
  // ==========================================================================
  // 1. GUARDS & REDIRECTS
  // ==========================================================================
  if (!isOpen) return null;

  // ==========================================================================
  // 2. RENDER
  // ==========================================================================
  return (
    <div>
      <ul>
        <CreditCard />
      </ul>
      <div className="flex cursor-pointer items-center gap-2 text-[14px]">
        <button
          className="flex cursor-pointer items-center gap-2"
          onClick={() => setModalActive(!modalActive)}
        >
          <FaPlus />
          ADICIONAR CARTÃO DE CRÉDITO
        </button>
      </div>
    </div>
  );
};
