import Order from "./Order";
import styles from "./OrderList.module.css";

const OrderList = ({ orders }) => {
  return (
    <div className={styles.list}>
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
