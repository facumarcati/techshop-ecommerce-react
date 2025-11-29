import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import styles from "./CartContainer.module.css";
import Swal from "sweetalert2";

function CartContainer() {
  const { cart, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);
  const { showToast } = useToast();

  if (!cart || cart.length < 1) {
    return (
      <div className={styles.emptyPage}>
        <p className={styles.message}>No tenés productos en el carrito</p>
      </div>
    );
  }

  const handleDelete = async (item) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: `Se va a eliminar "${item.name}" del carrito`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      removeFromCart(item.id);
      showToast("Producto eliminado del carrito", "success");
    }
  };

  const handleClearCart = async () => {
    const result = await Swal.fire({
      title: "¿Vaciar carrito?",
      text: "Se eliminarán todos los productos del carrito",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    });

    if (result.isConfirmed) {
      clearCart();
      Swal.fire({
        title: "Carrito vacío",
        text: "Se eliminaron todos los productos.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <h2 className={styles.title}>Tu Carrito</h2>

        {cart.map((item) => (
          <div key={item.id} className={styles.itemCard}>
            <button
              className={styles.deleteBtn}
              onClick={() => handleDelete(item)}
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

          <Link to={`/checkout`} className={styles.buyBtn}>
            Continuar compra
          </Link>
          <button className={styles.clearBtn} onClick={handleClearCart}>
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartContainer;
