import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import styles from "./Item.module.css";

const Item = ({ item }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <div className={styles.card}>
      <img src={item.image} alt={item.name} className={styles.image} />
      <h3 className={styles.name}>{item.name}</h3>
      <p className={styles.price}>${item.price.toLocaleString("es-AR")}</p>
      <h4 className={styles.description}>{item.description}</h4>
      <h3 className={styles.color}>Color: {item.color}</h3>
      <div className={styles.containerBtn}>
        <Link to={`/products/${item.id}`} className={styles.btnDetail}>
          Ver detalle
        </Link>
        <button onClick={handleAddToCart} className={styles.btnCart}>
          🛒
        </button>
      </div>
    </div>
  );
};

export default Item;
