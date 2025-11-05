import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ItemDetail.module.css";

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/items.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al obtener los datos");
        }
        return res.json();
      })
      .then((data) => {
        const foundItem = data.find((product) => product.id === Number(id));

        if (!foundItem) {
          navigate("/NotFound");
          return;
        }

        setItem(foundItem);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) return <p>Cargando detalle...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!item) return null;

  return (
    <div className={styles.itemDetail}>
      <div>
        <button onClick={() => navigate(-1)} className={styles.btnVolver}>
          Volver
        </button>
        <img src={item.imagen} alt={item.nombre} />
      </div>
      <div>
        <h2 className={styles.name}>{item.nombre}</h2>
        <p className={styles.price}>${item.precio}</p>
        <p className={styles.description}>{item.descripcion}</p>
        <p className={styles.color}>Color: {item.color}</p>
        <div className={styles.containerBtn}>
          <button className={styles.btnBuy}>Comprar ahora</button>
          <button className={styles.btnCart}>🛒 Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
