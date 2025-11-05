import CartWidget from "./CartWidget";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.topRow}>
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>
        <CartWidget className={styles.cart} />
      </div>
      <NavLinks className={styles.navlinks} />
    </nav>
  );
};

export default NavBar;
