import styles from "./ItemListContainer.module.css";
import ItemList from "./ItemList.jsx";
import useFetch from "../hooks/useFetch";

const ItemListContainer = ({ saludo }) => {
  const { data: items, error, loading } = useFetch("/items.json", 500);

  if (loading) return <p className={styles.message}>Cargando...</p>;
  if (error)
    return <p className={styles.message}>Error al cargar los productos</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.listProducts}>Productos</h1>
      <ItemList items={items} />
    </div>
  );
};

export default ItemListContainer;
