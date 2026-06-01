import { CartContext } from "./CartContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useState } from "react";
import { FormatPrice } from "../../components/FormatPrice/FormatPrice";
import { useUsers } from "../../hooks/useUsers";

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useLocalStorage("cart", []);
  const [produtoMensagem, setProdutoMensagem] = useState(null);
  const { userLogged } = useUsers();

  const userCart = (item) => {
    const existingCart = carts.find((cart) => cart.userId === userLogged.id);
    if (!existingCart) {
      const firstCartUser = {
        userId: userLogged.id,
        items: [
          {
            ...item,
            quantity: 1,
          },
        ],
      };
      setCarts([...carts, firstCartUser]);
      return;
    }

    const oldItems = existingCart.items;

    const isExist = oldItems.some((produto) => produto.id === item.id);

    if (isExist) {
      setProdutoMensagem(item.id);
      setTimeout(() => {
        setProdutoMensagem(null);
      }, 3000);

      return;
    }
    const newItems = [
      ...oldItems,
      {
        ...item,
        quantity: 1,
      },
    ];

    const newCartUser = { ...existingCart, items: newItems };

    setCarts((prevCarts) =>
      prevCarts.map((cart) =>
        cart.userId === userLogged.id ? newCartUser : cart,
      ),
    );
  };

  const removeFromCart = (id) => {
    const userCart = carts.find((cart) => cart.userId === userLogged.id);
    const itemsCart = userCart.items.filter((product) => product.id !== id);

    const newCart = { ...userCart, items: itemsCart };
    setCarts((prevCarts) =>
      prevCarts.map((cart) => (cart.userId === userLogged.id ? newCart : cart)),
    );
  };

  return (
    <CartContext.Provider
      value={{ carts, produtoMensagem, userCart, setCarts, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
