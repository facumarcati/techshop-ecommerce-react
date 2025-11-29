import { Link } from "react-router-dom";
import styles from "./Order.module.css";

const Order = ({ order }) => {
  const itemCount = order.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3 className={styles.orderId}>#{order.id}</h3>
          <span className={styles.orderDate}>
            {order.date.toDate().toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>

        <span className={styles.status}>Completada</span>
      </div>

      <div className={styles.body}>
        <div className={styles.infoGrid}>
          <div className={styles.infoBlock}>
            <span className={styles.label}>Cliente</span>
            <span className={styles.value}>{order.buyer.name}</span>
          </div>

          <div className={styles.infoBlock}>
            <span className={styles.label}>Productos</span>
            <span className={styles.value}>{itemCount}</span>
          </div>

          <div className={styles.infoBlock}>
            <span className={styles.label}>Total</span>
            <span className={styles.total}>
              ${order.total.toLocaleString("es-AR")}
            </span>
          </div>
        </div>

        <Link to={`/orders/${order.id}`} className={styles.btn}>
          Ver detalle →
        </Link>
      </div>
    </div>
  );
};

export default Order;
