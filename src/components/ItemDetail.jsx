import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { CartContext } from "../context/CartContext";
import { useToast } from "../hooks/useToast";
import styles from "./ItemDetail.module.css";

const ItemDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleAddToCart = () => {
    const added = addToCart(item);

    if (added) {
      showToast("Producto agregado al carrito", "success");
    } else {
      showToast("No hay más stock disponible", "error");
    }
  };

  useEffect(() => {
    const db = getFirestore();
    const docRef = doc(db, "items", id);

    getDoc(docRef)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          navigate("/NotFound");
          return;
        }

        setItem({ id: snapshot.id, ...snapshot.data() });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) return <p className={styles.message}>Cargando detalle...</p>;
  if (error) return <p className={styles.message}>Error: {error}</p>;
  if (!item) return null;

  const isOutStock = item.stock === 0;
  const isLowStock = item.stock > 0 && item.stock <= 5;
  const colorHex = colorMap[item.color] || "#999";

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <button onClick={() => navigate(-1)} className={styles.btnVolver}>
          ← Volver
        </button>

        <div className={styles.itemDetail}>
          <div className={styles.imageSection}>
            <img src={item.image} alt={item.name} className={styles.image} />
          </div>

          <div className={styles.infoSection}>
            <h1 className={styles.name}>{item.name}</h1>
            <p className={styles.price}>
              ${item.price.toLocaleString("es-AR")}
            </p>

            <div className={styles.descriptionSection}>
              <h3 className={styles.descriptionTitle}>Descripción</h3>
              <p className={styles.description}>{item.description}</p>
            </div>

            <div className={styles.attributesCard}>
              <div className={styles.detailItem}>
                <div className={styles.stockInfo}>
                  {isOutStock && (
                    <span className={styles.stockBadge} data-status="out">
                      Sin stock
                    </span>
                  )}
                  {isLowStock && (
                    <span className={styles.stockBadge} data-status="low">
                      ⚠️ Últimas {item.stock} unidades
                    </span>
                  )}
                  {!isOutStock && !isLowStock && (
                    <span className={styles.stockBadge} data-status="available">
                      ✓ {item.stock} unidades disponibles
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.detailItem}>
                <div className={styles.colorBadge}>
                  <span
                    className={styles.colorDot}
                    style={{ backgroundColor: colorHex }}
                  ></span>
                  <span>{item.color}</span>
                </div>
              </div>
            </div>

            <div className={styles.actionsSection}>
              <button
                onClick={handleAddToCart}
                className={styles.btnAddToCart}
                disabled={isOutStock}
              >
                🛒 Agregar al carrito
              </button>
              <button className={styles.btnBuyNow} disabled={isOutStock}>
                Comprar ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
