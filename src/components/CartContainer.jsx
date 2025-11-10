import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import styles from "./CartContainer.module.css";

function CartContainer() {
  const { cart } = useContext(CartContext);

  if (!cart || cart.length < 1) {
    return (
      <div>
        <p>No tenes productos en el carrito</p>
      </div>
    );
  }

  return (
    <div>
      {cart.map((prod) => (
        <div key={prod.id}>
          <h2>{prod.nombre}</h2>
          <p>${prod.precio}</p>
          <p>Cantidad: {prod.count}</p>
          <button>Borrar</button>
        </div>
      ))}
    </div>
  );
}

export default CartContainer;
