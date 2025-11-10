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
        item.id === prod.id ? { ...item, count: item.count + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...prod, count: 1 }]);
    }
  };

  return (
    <CartContext.Provider value={{ cart, getTotalProducts, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
