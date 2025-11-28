import { useState } from "react";
import { CartContext } from "./CartContext";

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const getTotalProducts = () =>
    cart.reduce((acc, current) => acc + current.count, 0);

  const addToCart = (prod) => {
    const isInCart = cart.some((item) => item.id === prod.id);

    if (isInCart) {
      const updatedCart = cart.map((item) => {
        if (item.id === prod.id) {
          const newCount = item.count + 1;

          if (newCount > prod.stock) {
            return item;
          }

          return { ...item, count: newCount };
        }
        return item;
      });

      const prev = cart.find((i) => i.id === prod.id).count;
      const next = updatedCart.find((i) => i.id === prod.id).count;

      if (prev === next) {
        return false;
      }

      setCart(updatedCart);
      return true;
    } else {
      setCart([...cart, { ...prod, count: 1 }]);
      return true;
    }
  };

  const removeFromCart = (id) => {
    const filtered = cart.filter((item) => item.id !== id);

    setCart(filtered);
  };

  const updateQuantity = (id, newCount) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, count: newCount } : item
    );

    setCart(updated);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        getTotalProducts,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
