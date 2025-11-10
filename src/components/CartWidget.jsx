import styles from "./CartWidget.module.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartWidget = () => {
  const { getTotalProducts } = useContext(CartContext);
  const total = getTotalProducts();

  return (
    <div className={styles.cart}>
      <span>🛒</span>
      <span>{total}</span>
    </div>
  );
};

export default CartWidget;
