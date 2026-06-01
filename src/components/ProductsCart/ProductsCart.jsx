import { FormatPrice } from "../FormatPrice/FormatPrice";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useCart } from "../../hooks/useCart";
import { CiTrash } from "react-icons/ci";
import { useUsers } from "../../hooks/useUsers";

export const ProductsCart = ({ produto }) => {
  const { removeFromCart, carts, setCarts } = useCart();
  const { userLogged } = useUsers();

  const userCart = carts.find((cart) => cart.userId === userLogged.id);
  const decrement = (id) => {
    const decrementCart = userCart.items.map((produto) =>
      produto.id === id
        ? {
            ...produto,
            quantity: produto.quantity - 1,
          }
        : produto,
    );

    setCarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart.userId === userLogged.id
          ? {
              ...cart,
              items: decrementCart,
            }
          : cart,
      ),
    );
  };

  const increase = (id) => {
    const increaseCart = userCart.items.map((produto) =>
      produto.id === id
        ? {
            ...produto,
            quantity: produto.quantity + 1,
          }
        : produto,
    );

    setCarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart.userId === userLogged.id
          ? {
              ...cart,
              items: increaseCart,
            }
          : cart,
      ),
    );
  };

  return (
    <li className="bg-light border-borders/40 m-7 flex items-center gap-2 rounded-xl border">
      <img
        src={produto.image}
        alt={produto.title}
        className="bg-light m-3 h-27.5 w-30 rounded-lg p-2"
      />
      <section className="flex w-full items-center justify-between gap-2">
        <div className="flex flex-col gap-2">
          <h2 className="line-clamp-2 leading-5">{produto.title}</h2>
          <div className="flex w-24 justify-between rounded-sm border p-1">
            <button
              type="button"
              onClick={
                produto.quantity === 1
                  ? () => removeFromCart(produto.id)
                  : () => decrement(produto.id)
              }
              className={
                produto.quantity === 1
                  ? "text-general-background cursor-pointer"
                  : "cursor-pointer text-black"
              }
            >
              {produto.quantity === 1 ? (
                <CiTrash className="hover:text-alert text-[20px] text-black" />
              ) : (
                <FaMinus className="hover:text-borders" />
              )}
            </button>
            <span>{produto.quantity}</span>
            <button
              type="button"
              onClick={() => increase(produto.id)}
              className="text-black"
            >
              <FaPlus className="hover:text-borders mr-1 cursor-pointer" />
            </button>
          </div>
        </div>
        <FormatPrice
          preco={produto.price}
          count={produto.quantity}
          variant="default"
        />
      </section>
    </li>
  );
};
