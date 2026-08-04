import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";

// Hooks
import { useCart } from "../../hooks/useCart";

// Utils
import { FormatPrice } from "../FormatPrice/FormatPrice";

export const ProductsCart = ({ product }) => {
  // ==========================================================================
  // 1. STATES & HOOKS
  // ==========================================================================
  const { removeFromCart, decrement, increase } = useCart();

  // ==========================================================================
  // 2. RENDER
  // ==========================================================================
  return (
    <li className="bg-light border-borders/40 m-7 flex items-center gap-2 rounded-xl border">
      <img
        src={product.image}
        alt={product.title}
        className="bg-light m-3 h-27.5 w-30 rounded-lg p-2"
      />
      <section className="flex w-full items-center justify-between gap-2">
        <div className="flex flex-col gap-2">
          <h2 className="line-clamp-2 leading-5">{product.title}</h2>
          <div className="flex w-24 justify-between rounded-sm border p-1">
            <button
              type="button"
              onClick={
                product.quantity === 1
                  ? () => removeFromCart(product.id)
                  : () => decrement(product.id)
              }
              className={
                product.quantity === 1
                  ? "text-general-background cursor-pointer"
                  : "cursor-pointer text-black"
              }
            >
              {product.quantity === 1 ? (
                <CiTrash className="hover:text-alert text-[20px] text-black" />
              ) : (
                <FaMinus className="hover:text-borders" />
              )}
            </button>
            <span>{product.quantity}</span>
            <button
              type="button"
              onClick={() => increase(product.id)}
              className="text-black"
            >
              <FaPlus className="hover:text-borders mr-1 cursor-pointer" />
            </button>
          </div>
        </div>
        <FormatPrice
          price={product.price}
          count={product.quantity}
          variant="default"
        />
      </section>
    </li>
  );
};
