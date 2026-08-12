import { FormatPrice } from "../FormatPrice/FormatPrice";
import { useCart } from "../../hooks/useCart";
import { BsCart3 } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";

// Hooks
import { useUsers } from "../../hooks/useUsers";

export const ProductInfo = ({ product }) => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const [notLoggedMessage, setNotLoggedMessage] = useState(null);

  const { productId, addToCart } = useCart();
  const { userLogged } = useUsers();
  const timeOutRef = useRef(null);

  // =========================================================================
  // 2. ACTIONS
  // =========================================================================
  const handleAddToCart = (item, event) => {
    event.stopPropagation();
    if (!userLogged) {
      setNotLoggedMessage("Você não está logado");
      if (timeOutRef.current) clearTimeout(timeOutRef.current);
      timeOutRef.current = setTimeout(() => {
        setNotLoggedMessage(null);
      }, 3000);
      return;
    }

    addToCart(item);
  };

  // =========================================================================
  // 3. EFFECTS
  // =========================================================================
  useEffect(() => {
    if (timeOutRef.current) clearTimeout(timeOutRef.current);
  }, []);

  // =========================================================================
  // 4. RENDER
  // =========================================================================
  return (
    <div
      className={`bg-light border-borders/40 text-dark m-5 flex min-h-130 flex-col items-center justify-around gap-8 rounded-2xl border p-6 shadow-md md:w-[60%] lg:w-[70%] lg:flex-row`}
    >
      <picture className="flex max-h-100 w-full flex-1 justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-auto w-full object-contain p-4"
        />
      </picture>
      <section className="m-2 flex flex-1 flex-col gap-6 p-3 text-justify">
        <div>
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <h2 className="text-left text-[12px]">
            Categoria: {product.category}
          </h2>
        </div>
        <FormatPrice price={product.price} />
        <div>
          <span className="leading-7">Descrição:</span>
          <p className="max-h-xl leading-8">{product.description}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={(event) => handleAddToCart(product, event)}
            className="item bg-button-primary hover:bg-button-hover flex cursor-pointer items-center gap-2 self-center rounded-xl px-6 py-3 font-medium tracking-wide shadow-sm transition-all duration-300 active:scale-95"
          >
            <BsCart3 /> Adicionar ao carrinho
          </button>
          {/* If the item is already in the cart, the message appears */}
          {productId === product.id && (
            <p className="text-alert text-center text-[12px]">
              O item já está no carrinho!
            </p>
          )}

          {/* If the user is not logged in, the message appears */}
          {notLoggedMessage && (
            <p className="text-alert text-[12px]">{notLoggedMessage}</p>
          )}
        </div>
      </section>
    </div>
  );
};
