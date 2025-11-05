import useFetch from "../hooks/useFetch";
import ItemList from "./ItemList";
import styles from "./CategoryListContainer.module.css";
import { useState } from "react";

const CategoryListContainer = () => {
  const { data: items, error, loading } = useFetch("/items.json", 500);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  if (loading) return <p className={styles.message}>Cargando categorías...</p>;
  if (error)
    return <p className={styles.message}>Error al cargar los productos</p>;

  const categorias = items.reduce((acc, item) => {
    if (!acc[item.categoria]) acc[item.categoria] = [];
    acc[item.categoria].push(item);
    return acc;
  }, {});

  const productosFiltrados =
    categoriaSeleccionada === "Todas"
      ? items
      : categorias[categoriaSeleccionada] || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Productos por categoría</h1>

      <div className={styles.categoryContainer}>
        {["Todas", ...Object.keys(categorias)].map((categoria) => (
          <button
            key={categoria}
            className={`${styles.categoryBtn} ${
              categoriaSeleccionada === categoria ? styles.active : ""
            }`}
            onClick={() => setCategoriaSeleccionada(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>
      <div className={styles.categorySection}>
        <h2 className={styles.categoryTitle}>{categoriaSeleccionada}</h2>
        <ItemList items={productosFiltrados} />
      </div>
    </div>
  );
};

export default CategoryListContainer;
