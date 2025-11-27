import AddProductIcon from "./AddProductIcon";
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

        <NavLinks />
      </div>
    </nav>
  );
};

export default NavBar;
