import styles from "./NavLinks.module.css";
import { NavLink } from "react-router-dom";

const navLinks = () => {
  return (
    <ul className={styles.navLinks}>
      <NavLink to="/" className={styles.links}>
        Inicio
      </NavLink>
      <NavLink to="/products" className={styles.links}>
        Productos
      </NavLink>
      <NavLink to="/categories" className={styles.links}>
        Categorias
      </NavLink>
      <NavLink to="/cart" className={styles.links}>
        Carrito
      </NavLink>
    </ul>
  );
};

export default navLinks;
