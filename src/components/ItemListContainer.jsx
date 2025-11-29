import styles from "./ItemListContainer.module.css";
import ItemList from "./ItemList.jsx";
import useFirebaseItems from "../hooks/useFirebaseItems";

const ItemListContainer = () => {
  const { items, loading, error } = useFirebaseItems();

  if (loading) return <p className={styles.message}>Cargando productos...</p>;
  if (error)
    return <p className={styles.message}>Error al cargar los productos</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Productos</h1>
      <ItemList items={items} />
    </div>
  );
};

export default ItemListContainer;
