import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { CartContext } from "../context/CartContext";
import styles from "./ItemDetail.module.css";

const ItemDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className={styles.itemDetail}>
      <div>
        <button onClick={() => navigate(-1)} className={styles.btnVolver}>
          Volver
        </button>
        <img src={item.image} alt={item.name} />
      </div>
      <div>
        <h2 className={styles.name}>{item.name}</h2>
        <p className={styles.price}>${item.price.toLocaleString("es-AR")}</p>
        <p className={styles.description}>{item.description}</p>
        <p className={styles.stock}>Stock: {item.stock} unidades</p>
        <p className={styles.color}>Color: {item.color}</p>
        <div className={styles.containerBtn}>
          <button className={styles.btnBuy}>Comprar ahora</button>
          <button onClick={() => addToCart(item)} className={styles.btnCart}>
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
