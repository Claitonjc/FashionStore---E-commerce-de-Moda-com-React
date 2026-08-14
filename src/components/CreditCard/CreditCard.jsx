import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";

//Hooks
import { useCart } from "../../hooks/useCart";
import { useCheckout } from "../../hooks/useCheckout";

// Components
import { InputTypeFieldset } from "../../components/InputTypeFieldset/InputTypeFieldset";

// Utils
import { formatPrice } from "../../utils/formatPrice";
import { calcTotalPrice } from "../../utils/calculatePrice";
import { maskCardNumber } from "../../utils/masks";

export const CreditCard = () => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const [isOpen, setIsOpen] = useState(false);

  const { currentCart } = useCart();
  const {
    shippingOption,
    listUserCard,
    cvv,
    setCvv,
    installments,
    setInstallments,
    paymentMethod,
    setPaymentMethod,
    removeCard,
  } = useCheckout();

  // ==========================================================================
  // 2. DERIVED DATA & CALCULATIONS
  // ==========================================================================
  const { totalwithFreight, subTotal } = calcTotalPrice(currentCart);

  const finalTotal =
    shippingOption === "Entrega Expressa" ? totalwithFreight : subTotal;

  const paymentInstallments = Array.from({ length: 10 }, (_, index) => {
    const installment = index + 1;
    const installmentValue = finalTotal / installment;

    return {
      value: installment,
      label: `${installment}x sem juros - ${formatPrice(installmentValue).symbol}${formatPrice(installmentValue).integer}${formatPrice(installmentValue).separator}${formatPrice(installmentValue).decimal}`,
    };
  });

  // =========================================================================
  // 3. ACTIONS
  // =========================================================================
  const handleChangeMethod = (event) => {
    setInstallments(event.target.value);
  };

  // =========================================================================
  // 4. RENDER
  // =========================================================================
  return (
    <li className="flex flex-col gap-2">
      <div className="mt-5 flex flex-col gap-2">
        <ul className="flex flex-col gap-5">
          {listUserCard &&
            listUserCard.map((card) => (
              <li key={card.id} className="flex justify-between px-2">
                <label className="flex gap-2">
                  <input
                    type="radio"
                    name="payment"
                    value={card.id}
                    checked={paymentMethod?.id === card.id}
                    onChange={() => setPaymentMethod(card)}
                  />
                  <div>
                    <span>{card.alias ? card.alias : card.name}</span>
                    <p>{maskCardNumber(card.number)}</p>
                  </div>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    aria-label="Excluir Cartão"
                    type="button"
                    className="hover:text-alert cursor-pointer text-[20px] text-black transition-colors"
                    onClick={() => removeCard(card.id)}
                  >
                    <CiTrash />
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>

      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <InputTypeFieldset
          label="CVV*"
          type="password"
          name="cvv"
          value={cvv}
          onChange={(event) => setCvv(event.target.value)}
        />
        <fieldset
          className="border-borders/40 relative mb-2 w-full rounded-xl border"
          label="Forma de pagamento"
        >
          <legend className="ml-4 text-[12px]">Forma de pagamento*</legend>
          <select
            name="portions"
            value={installments}
            onChange={handleChangeMethod}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            className="text-dark mb-2 w-full cursor-pointer appearance-none rounded-xl px-4 py-0.5 pr-10 text-sm font-medium focus:border-0 focus:outline-0"
          >
            {paymentInstallments.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>

          <FaChevronDown
            className={`text-dark ${isOpen ? "rotate-180" : ""} pointer-events-none absolute top-[45%] right-3 -translate-y-1/2 text-xs transition-transform duration-300`}
          />
        </fieldset>
      </div>
    </li>
  );
};
