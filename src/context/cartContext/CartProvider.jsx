import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Context
import { CartContext } from "./CartContext";

// Hooks
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useUsers } from "../../hooks/useUsers";

export const CartProvider = ({ children }) => {
  // ======================================================================
  // 1.STATES & HOOKS
  // ======================================================================
  const [carts, setCarts] = useLocalStorage("cart", []);
  const [productId, setProductId] = useState(null);
  const { userLogged } = useUsers();
  const timeOutRef = useRef(null);

  // Derived variable: Always reflects the current logged-in user's cart.
  const currentCart = carts.find((cart) => cart.userId === userLogged?.id);

  // Derived variable: Checks if the cart is empty.
  const isCartEmpty = !currentCart || currentCart?.items?.length === 0;

  // =====================================================================
  // 2.ACTIONS (Functions that manipulate the shopping cart)
  // =====================================================================
  const addToCart = useCallback(
    (item) => {
      if (!userLogged) return;

      // Case: User's first item
      if (!currentCart) {
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

      const isExist = currentCart.items.some(
        (produto) => produto.id === item.id,
      );

      // Case: Product is already in the cart (3-second visual feedback)
      if (isExist) {
        setProductId(item.id);

        if (timeOutRef.current) clearTimeout(timeOutRef.current);
        timeOutRef.current = setTimeout(() => {
          setProductId(null);
        }, 3000);

        return;
      }
      // Case: New product, adds to the existing list
      const newItems = [
        ...currentCart.items,
        {
          ...item,
          quantity: 1,
        },
      ];

      const newCartUser = { ...currentCart, items: newItems };

      setCarts((prevCarts) =>
        prevCarts.map((cart) =>
          cart.userId === userLogged.id ? newCartUser : cart,
        ),
      );
    },
    [carts, currentCart, setCarts, userLogged],
  );

  /**
   * Increases the quantity of a specific item.
   */
  const increase = useCallback(
    (id) => {
      const increaseCart = currentCart.items.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product,
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
    },
    [currentCart, setCarts, userLogged],
  );

  /**
   * Decrements the quantity of an item.
   * UI Note: The interface blocks quantities of less than 1 by replacing
   * the minus button (-) with a trash can icon (removeFromCart).
   */
  const decrement = useCallback(
    (id) => {
      const decrementCart = currentCart.items.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: Math.max(1, product.quantity - 1),
            }
          : product,
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
    },
    [currentCart, setCarts, userLogged],
  );

  const removeFromCart = useCallback(
    (id) => {
      if (!currentCart || !userLogged) return;

      const userCart = carts.find((cart) => cart.userId === userLogged.id);
      const itemsCart = userCart.items.filter((product) => product.id !== id);

      const newCart = { ...userCart, items: itemsCart };
      setCarts((prevCarts) =>
        prevCarts.map((cart) =>
          cart.userId === userLogged.id ? newCart : cart,
        ),
      );
    },
    [carts, setCarts, userLogged, currentCart],
  );

  const clearCart = useCallback(() => {
    if (!userLogged) return;

    setCarts((prevCarts) =>
      prevCarts.map((cart) => {
        if (cart.userId === userLogged.id) {
          if (cart.items.length === 0) return cart;

          return { ...cart, items: [] };
        }
        return cart;
      }),
    );
  }, [setCarts, userLogged]);

  // ===================================================================
  // 3.EFFECTS (Life Cicle)
  // ===================================================================

  // Clears the timeout to prevent memory leaks if the component unmounts.
  useEffect(() => {
    return () => {
      if (timeOutRef.current) clearTimeout(timeOutRef.current);
    };
  }, []);

  // ===================================================================
  // 4.MEMOIZATION & RETURN
  // ===================================================================
  const contextValue = useMemo(
    () => ({
      carts,
      productId,
      addToCart,
      setCarts,
      removeFromCart,
      clearCart,
      currentCart,
      decrement,
      increase,
      isCartEmpty,
    }),
    [
      carts,
      productId,
      addToCart,
      setCarts,
      removeFromCart,
      clearCart,
      currentCart,
      decrement,
      increase,
      isCartEmpty,
    ],
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
