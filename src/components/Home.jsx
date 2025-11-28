import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import ItemList from "./ItemList.jsx";
import useFirebaseItems from "../hooks/useFirebaseItems";

function Home() {
  const { items, error, loading } = useFirebaseItems();

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Bienvenido a TechShop</h1>
        <p className={styles.subtitle}>
          Tu tienda online de tecnología y gaming. Encontrá productos de calidad
          al mejor precio: periféricos, monitores, celulares y mucho más.
        </p>
      </section>

      <section className={styles.featured}>
        <div className={styles.contSecTitles}>
          <h2 className={styles.sectionTitle}>Productos destacados</h2>
          <p className={styles.sectionText}>
            Los mas elegidos por nuestra comunidad
          </p>
        </div>

        {loading && <p className={styles.message}>Cargando productos...</p>}
        {error && (
          <p className={styles.message}>Error al cargar los productos</p>
        )}

        {!loading && !error && items && <ItemList items={items.slice(0, 3)} />}

        <div className={styles.contBtnCatalog}>
          <Link to="/products" className={styles.btnCatalog}>
            Ver catálogo completo
          </Link>
        </div>
      </section>

      <section className={styles.info}>
        <p>
          🚚 Envíos rápidos, pagos seguros y soporte técnico personalizado.
          <br />
          Equipate con lo mejor, hoy mismo.
        </p>
      </section>
    </div>
  );
}

export default Home;
