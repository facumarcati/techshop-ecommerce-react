import { useEffect, useRef, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import CartWidget from "./CartWidget";
import AddProductIcon from "./AddProductIcon";
import styles from "./NavLinks.module.css";

const NavLinks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className={styles.wrapper} ref={menuRef}>
      <button
        className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      >
        {isOpen ? "✖" : "☰"}
      </button>

      <ul className={styles.navLinksDesktop}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          Inicio
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          Productos
        </NavLink>

        <NavLink
          to="/categories"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          Categorías
        </NavLink>

        <Link to="/add-product" className={styles.noDecoration}>
          <AddProductIcon />
        </Link>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ""}`
          }
        >
          <CartWidget />
        </NavLink>
      </ul>

      {isOpen && (
        <ul className={styles.navLinksMobile} onClick={() => setIsOpen(false)}>
          <NavLink to="/" className={styles.mobileLink}>
            Inicio
          </NavLink>

          <NavLink to="/products" className={styles.mobileLink}>
            Productos
          </NavLink>

          <NavLink to="/categories" className={styles.mobileLink}>
            Categorías
          </NavLink>

          <Link to="/add-product" className={styles.mobileLink}>
            Agregar
          </Link>

          <NavLink to="/cart" className={styles.mobileLink}>
            <CartWidget />
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default NavLinks;
