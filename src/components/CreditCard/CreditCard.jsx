import { InputTypeFieldset } from "../../components/InputTypeFieldset/InputTypeFieldset";
import { calcTotalPrice } from "../../utils/calculatePrice";
import { useCart } from "../../hooks/useCart";
import { useUsers } from "../../hooks/useUsers";
import { useState } from "react";
import { useCheckout } from "../../hooks/useCheckout";
import { FaChevronDown } from "react-icons/fa6";
import { formatPrice } from "../../utils/formatPrice";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const CreditCard = () => {
  const { carts } = useCart();
  const { userLogged } = useUsers();
  const {
    shippingOption,
    listUserCard,
    cvv,
    setCvv,
    selectedCard,
    setSelectedCard,
    selectedMethod,
    setSelectedMethod,
  } = useCheckout();
  const [isOpen, setIsOpen] = useState(false);

  const userCart = carts.find((cart) => cart.userId === userLogged.id);
  const { total, freight } = calcTotalPrice(userCart);

  const finalTotal =
    shippingOption === "Entrega Expressa" ? total : total - freight;

  const paymentMethod = Array.from({ length: 10 }, (_, index) => {
    const installments = index + 1;
    const installmentValue = finalTotal / installments;

    return {
      value: installments,
      label: `${installments}x sem juros - ${formatPrice(installmentValue).symbol}${formatPrice(installmentValue).inteiro}${formatPrice(installmentValue).separator}${formatPrice(installmentValue).decimal}`,
    };
  });

  const handleChangeMethod = (event) => {
    setSelectedMethod(event.target.value);
  };

  return (
    <li className="flex flex-col gap-2">
      <label>
        <div className="mt-5 flex flex-col gap-2">
          <ul className="flex flex-col gap-5">
            {listUserCard &&
              listUserCard.map((card) => (
                <li key={card.id}>
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value={card.id}
                      checked={selectedCard?.id === card.id}
                      onChange={() => setSelectedCard(card)}
                    />
                    <div>
                      <span>{card.alias}</span>
                      <p>{card.number}</p>
                    </div>
                  </label>
                </li>
              ))}
          </ul>
        </div>
      </label>
      <div className="flex items-center gap-2">
        <InputTypeFieldset
          label="CVV*"
          type="text"
          name="CVV*"
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
            value={selectedMethod}
            onChange={handleChangeMethod}
            onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
            className="text-dark mb-2 w-full cursor-pointer appearance-none rounded-xl px-4 py-0.5 pr-10 text-sm font-medium focus:border-0 focus:outline-0"
          >
            {paymentMethod.map((method, index) => (
              <option key={index} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
          <button>
            <FaChevronDown
              className={`text-dark pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xs transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </fieldset>
      </div>
    </li>
  );
};
