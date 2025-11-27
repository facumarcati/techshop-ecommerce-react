import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import styles from "./CartContainer.module.css";

function CartContainer() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  if (!cart || cart.length < 1) {
    return (
      <div>
        <p className={styles.message}>No tenés productos en el carrito</p>
      </div>
    );
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <h2 className={styles.title}>Tu Carrito</h2>

        {cart.map((item) => (
          <div key={item.id} className={styles.itemCard}>
            <button
              className={styles.deleteBtn}
              onClick={() => {
                if (confirm("¿Seguro que queres eliminar este producto?")) {
                  removeFromCart(item.id);
                }
              }}
            >
              Eliminar
            </button>

            <img src={item.image} alt={item.name} className={styles.itemImg} />

            <div className={styles.itemInfo}>
              <h3 className={styles.itemName}>{item.name}</h3>

              <p className={styles.price}>
                ${item.price.toLocaleString("de-DE")}
              </p>

              <p className={styles.subtotal}>
                Subtotal: ${(item.price * item.count).toLocaleString("de-DE")}
              </p>

              <label className={styles.qtyLabel}>Cantidad:</label>
              <div className={styles.qtyBox}>
                <button
                  className={styles.qtyBtn}
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, item.count - 1))
                  }
                  disabled={item.count <= 1}
                >
                  -
                </button>

                <span className={styles.qtyNumber}>{item.count}</span>

                <button
                  className={styles.qtyBtn}
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      Math.min(item.stock, item.count + 1)
                    )
                  }
                  disabled={item.count >= item.stock}
                >
                  +
                </button>
              </div>

              <p className={styles.stockInfo}>Stock disponible: {item.stock}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.right}>
        <div className={styles.summaryCard}>
          <h3>Resumen de compra</h3>
          <p className={styles.totalLabel}>Total:</p>
          <p className={styles.totalAmount}>${total.toLocaleString("de-DE")}</p>

          <button className={styles.buyBtn}>Continuar compra</button>
        </div>
      </div>
    </div>
  );
}

export default CartContainer;
