import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import styles from "./OrderDetail.module.css";

const OrderDetail = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const db = getFirestore();
    const docRef = doc(db, "orders", id);

    getDoc(docRef)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          navigate("/NotFound");
          return;
        }

        setOrder({ id: snapshot.id, ...snapshot.data() });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) return <p className={styles.message}>Cargando orden...</p>;
  if (error) return <p className={styles.message}>Error: {error}</p>;
  if (!order) return null;

  const shortId = `#${order.id.slice(0, 5)}...${order.id.slice(-4)}`;
  const itemCount = order.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <button onClick={() => navigate(-1)} className={styles.btnVolver}>
          ← Volver a mis órdenes
        </button>

        <div className={styles.orderDetail}>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <h1 className={styles.orderId}>Orden {shortId}</h1>
              <span className={styles.orderDate}>
                {order.date.toDate().toLocaleDateString("es-AR", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <span className={styles.statusBadge}>✓ Completada</span>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Información del cliente</h2>
            <div className={styles.customerInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Nombre</span>
                <span className={styles.infoValue}>{order.buyer.name}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>{order.buyer.email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Teléfono</span>
                <span className={styles.infoValue}>{order.buyer.phone}</span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Resumen de la orden</h2>
            <div className={styles.summaryGrid}>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Total de productos</span>
                <span className={styles.summaryValue}>{itemCount} items</span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Subtotal</span>
                <span className={styles.summaryValue}>
                  ${order.total.toLocaleString("es-AR")}
                </span>
              </div>
              <div className={styles.summaryItem}>
                <span className={styles.summaryLabel}>Envío</span>
                <span className={styles.summaryValue}>Gratis</span>
              </div>
              <div className={styles.summaryItemTotal}>
                <span className={styles.summaryLabelTotal}>Total</span>
                <span className={styles.summaryValueTotal}>
                  ${order.total.toLocaleString("es-AR")}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              Productos ({order.items.length})
            </h2>
            <div className={styles.itemsList}>
              {order.items.map((item, index) => (
                <div key={index} className={styles.itemRow}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={styles.itemQuantity}>
                      Cantidad: {item.quantity}
                    </span>
                  </div>
                  <div className={styles.itemPricing}>
                    <span className={styles.itemPrice}>
                      Precio unidad ${item.price.toLocaleString("es-AR")}
                    </span>
                    <span className={styles.itemSubtotal}>
                      Subtotal: $
                      {(item.price * item.quantity).toLocaleString("es-AR")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
