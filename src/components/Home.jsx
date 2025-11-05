import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import ItemList from "./ItemList.jsx";
import useFetch from "../hooks/useFetch";

function Home() {
  const { data: items, error, loading } = useFetch("/items.json", 500);

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
        <h2 className={styles.sectionTitle}>Productos destacados</h2>
        <p className={styles.sectionText}>
          Los mas elegidos por nuestra comunidad
        </p>

        {loading && <p className={styles.message}>Cargando productos...</p>}
        {error && (
          <p className={styles.message}>Error al cargar los productos</p>
        )}

        {!loading && !error && items && <ItemList items={items.slice(0, 3)} />}

        <Link to="/products" className={styles.btnCatalog}>
          Ver catálogo completo
        </Link>
      </section>

      <section className={styles.info}>
        <p>
          🚚 Envíos rápidos, pagos seguros y soporte técnico personalizado.
          <br />
          Equipate con lo mejor, hoy mismo.
        </p>
      </section>

      <footer className={styles.footer}>
        <p>
          Desarrollado por <strong>Facundo Marcati</strong> | 2025
        </p>
      </footer>
    </div>
  );
}

export default Home;
