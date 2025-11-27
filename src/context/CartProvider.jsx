import { useState } from "react";
import { CartContext } from "./CartContext";

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const getTotalProducts = () =>
    cart.reduce((acc, current) => acc + current.count, 0);

  const addToCart = (prod) => {
    const isInCart = cart.some((item) => item.id === prod.id);

    if (isInCart) {
      const updatedCart = cart.map((item) =>
        item.id === prod.id
          ? { ...item, count: Math.min(item.count + 1, prod.stock) }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...prod, count: 1 }]);
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

  return (
    <CartContext.Provider
      value={{
        cart,
        getTotalProducts,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
