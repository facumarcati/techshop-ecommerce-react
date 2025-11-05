import { Link } from "react-router-dom";
import styles from "./Item.module.css";

const Item = ({ item }) => {
  return (
    <div className={styles.card}>
      <img src={item.imagen} alt={item.nombre} className={styles.image} />
      <h3 className={styles.name}>{item.nombre}</h3>
      <p className={styles.price}>${item.precio}</p>
      <h4 className={styles.description}>{item.descripcion}</h4>
      <h3 className={styles.color}>Color: {item.color}</h3>
      <div className={styles.containerBtn}>
        <Link to={`/products/${item.id}`} className={styles.btnDetail}>
          Ver detalle
        </Link>
        <button className={styles.btnCart}>🛒</button>
      </div>
    </div>
  );
};

export default Item;
