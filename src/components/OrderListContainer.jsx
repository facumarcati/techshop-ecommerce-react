import styles from "./OrderListContainer.module.css";
import OrderList from "./OrderList.jsx";
import useFirebaseOrders from "../hooks/useFIrebaseOrders.js";

function OrderListContainer() {
  const { orders, loading, error } = useFirebaseOrders();

  if (loading) return <p className={styles.message}>Cargando ordenes...</p>;
  if (error)
    return <p className={styles.message}>Error al cargar las ordenes</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mis Órdenes</h1>
      <OrderList orders={orders} />
    </div>
  );
}

export default OrderListContainer;
