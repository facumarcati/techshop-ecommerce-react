import Item from "./Item.jsx";
import styles from "./ItemList.module.css";

const ItemList = ({ items }) => {
  return (
    <div className={styles.list}>
      {items.map((item) => {
        return <Item key={item.id} item={item} />;
      })}
    </div>
  );
};

export default ItemList;
