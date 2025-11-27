import styles from "./AddProductIcon.module.css";
import { Link } from "react-router-dom";

const AddProductIcon = () => {
  return (
    <Link to="/add-product" className={styles.buttonMinimal}>
      Agregar
    </Link>
  );
};

export default AddProductIcon;
