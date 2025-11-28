import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useToast } from "../hooks/useToast";
import styles from "./Item.module.css";

const Item = ({ item }) => {
  const { addToCart } = useContext(CartContext);
  const { showToast } = useToast();

  const handleAddToCart = () => {
    const added = addToCart(item);

    if (added) {
      showToast("Producto agregado al carrito", "success");
    } else {
      showToast("No hay más stock disponible", "error");
    }
  };

  const isOutStock = item.stock === 0;
  const isLowStock = item.stock > 0 && item.stock <= 5;

  const colorMap = {
    Negro: "#1a1a1a",
    Blanco: "#ffffff",
    Naranja: "#ff6b35",
    Celeste: "#4a90e2",
    Azul: "#1e5594ff",
    Rojo: "#e53935",
    Verde: "#43a047",
    Gris: "#757575",
    Rosa: "#ec407a",
    Amarillo: "#fdd835",
    Violeta: "#8e24aa",
    Natural: "#f8f7ed",
  };

  const colorHex = colorMap[item.color] || "#999";

  return (
    <div className={styles.card}>
      <img src={item.image} alt={item.name} className={styles.image} />

      <div className={styles.info}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.price}>${item.price.toLocaleString("es-AR")}</p>
        <h4 className={styles.description}>{item.description}</h4>

        {isOutStock && <p className={styles.noStock}>Sin stock</p>}
        {isLowStock && (
          <p className={styles.lowStock}>{item.stock} ultimas unidades</p>
        )}

        <div className={styles.colorBadge}>
          <span
            className={styles.colorDot}
            style={{ backgroundColor: colorHex }}
          ></span>
          <span>{item.color}</span>
        </div>
      </div>

      <div className={styles.containerBtn}>
        <Link to={`/products/${item.id}`} className={styles.btnDetail}>
          Ver detalle
        </Link>
        <button
          onClick={handleAddToCart}
          className={`${styles.btnCart} ${isOutStock ? styles.disabled : ""}`}
          disabled={isOutStock}
        >
          🛒
        </button>
      </div>
    </div>
  );
};

export default Item;
