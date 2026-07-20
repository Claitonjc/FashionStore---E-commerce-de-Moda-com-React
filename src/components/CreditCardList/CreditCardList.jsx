import { FaCreditCard } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { CreditCard } from "../CreditCard/CreditCard";
import { FaPlus } from "react-icons/fa";

export const CreditCardList = ({ isOpen, modalActive, setModalActive }) => {
  return (
    <div>
      {isOpen && (
        <div>
          <ul>
            <CreditCard />
          </ul>
          <div className="flex cursor-pointer items-center gap-2 text-[14px]">
            <FaPlus />
            <button
              className="cursor-pointer"
              onClick={() =>
                modalActive ? setModalActive(false) : setModalActive(true)
              }
            >
              ADICIONAR CARTÃO DE CRÉDITO
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
