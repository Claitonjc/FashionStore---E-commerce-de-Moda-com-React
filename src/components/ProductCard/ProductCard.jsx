import { useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { useState } from "react";

// Hooks
import { useCart } from "../../hooks/useCart";
import { useUsers } from "../../hooks/useUsers";

// Utils
import { FormatPrice } from "../FormatPrice/FormatPrice";

export const ProductCard = ({ product }) => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const [notLoggedMessage, setNotLoggedMessage] = useState(null);
  const navigate = useNavigate();

  const { productId, addToCart } = useCart();
  const { userLogged } = useUsers();

  // =========================================================================
  // 2. ACTIONS
  // =========================================================================
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      goToDetails();
    }
  };

  const handleAddToCart = (item, event) => {
    event.stopPropagation();
    if (!userLogged) {
      setNotLoggedMessage("Você não está logado");

      setTimeout(() => {
        setNotLoggedMessage(null);
      }, 3000);
      return;
    }

    addToCart(item);
  };

  const goToDetails = () => {
    navigate(`/details/${product.id}`);
  };

  // =========================================================================
  // 3. RENDER
  // =========================================================================
  return (
    <li
      role="button"
      tabIndex={0}
      className="text-dark border-borders/40 bg-light flex h-50 w-35 cursor-pointer flex-col items-center justify-between rounded-2xl border p-2 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-auto sm:w-72 md:gap-4 md:p-5"
      onClick={goToDetails}
      onKeyDown={handleKeyDown}
    >
      <h2 className="line-clamp-2 px-2 text-center text-[15px] leading-5 font-medium">
        {product.title}
      </h2>

      <picture className="flex h-30 items-center justify-center sm:h-60">
        <img
          src={product.image}
          alt={product.title}
          className="bg-light max-h-full rounded-xl object-contain p-6"
        />
      </picture>

      <FormatPrice price={product.price} />

      {/* If the item is already in the cart, the message appears */}
      {productId === product.id && (
        <p className="text-alert text-[12px]">O item já está no carrinho!</p>
      )}

      {/* If the user is not logged in, the message appears */}
      {notLoggedMessage && (
        <p className="text-alert text-[12px]">{notLoggedMessage}</p>
      )}

      {/* <button
        type="button"
        onClick={(event) => handleAddToCart(product, event)}
        className="bg-button-primary hover:bg-button-hover flex cursor-pointer items-center gap-2 rounded-xl px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95"
      >
        <BsCart3 />
        Adicionar ao carrinho
      </button> */}
    </li>
  );
};
