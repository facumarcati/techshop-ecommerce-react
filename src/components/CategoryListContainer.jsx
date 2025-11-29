import { useEffect, useState } from "react";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { app } from "../firebase/config";
import styles from "./CategoryListContainer.module.css";

const CategoryListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore(app);
    const itemsRef = collection(db, "items");

    getDocs(itemsRef)
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setItems(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={styles.message}>Cargando categorías...</p>;

  const categorias = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);

    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Categorías</h1>

      <div className={styles.grid}>
        {Object.keys(categorias).map((cat) => (
          <Link to={`/category/${cat}`} key={cat} className={styles.card}>
            <div className={styles.imageContainer}>
              <img
                src={categorias[cat][0].image}
                alt={cat}
                className={styles.image}
              />
            </div>

            <div className={styles.info}>
              <h2 className={styles.name}>{cat}</h2>
              <p className={styles.count}>
                {categorias[cat]?.length === 1
                  ? "1 producto"
                  : `${categorias[cat]?.length} productos`}
              </p>
            </div>

            <div className={styles.btnContainer}>
              <span className={styles.btn}>Ver productos</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryListContainer;
