import { getFirestore, getDocs, collection, getDoc } from "firebase/firestore";
import { app } from "../firebase/config";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ItemList from "./ItemList";
import styles from "./CategoryPage.module.css";

const CategoryPage = () => {
  const { cat } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const db = getFirestore(app);
    const itemsRef = collection(db, "items");

    getDocs(itemsRef)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const filtered = data.filter(
          (item) =>
            item.category.toLowerCase().trim() === cat.toLowerCase().trim()
        );

        if (filtered.length === 0) {
          navigate("/NotFound");
          return;
        }

        setItems(filtered);
      })
      .catch(() => setError("Error al obtener datos"))
      .finally(() => setLoading(false));
  }, [cat, navigate]);

  if (loading) return <p className={styles.message}>Cargando productos...</p>;
  if (error) return <p className={styles.message}>{error}</p>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.btnBack}>
        ← Volver
      </button>

      <h1 className={styles.title}>{cat}</h1>

      <ItemList items={items} />
    </div>
  );
};

export default CategoryPage;
