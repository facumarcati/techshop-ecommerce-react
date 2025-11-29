import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.containerError}>
      <div className={styles.card}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.subtitle}>Página no encontrada</p>
        <p className={styles.text}>
          Lo sentimos, la página que buscás no existe o fue movida.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
