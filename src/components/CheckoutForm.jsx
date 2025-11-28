import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import {
  collection,
  addDoc,
  getFirestore,
  Timestamp,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { app } from "../firebase/config";
import styles from "./CheckoutForm.module.css";
import Swal from "sweetalert2";

function CheckoutForm() {
  const { cart, clearCart } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null);

  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const db = getFirestore(app);

  const handleInput = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const order = {
      buyer,
      items: cart.map((item) => ({
        id: item.id,
        title: item.name,
        price: item.price,
        quantity: item.count,
      })),
      total: cart.reduce((acc, item) => acc + item.price * item.count, 0),
      date: Timestamp.fromDate(new Date()),
    };

    try {
      const ordersRef = collection(db, "orders");
      const docRef = await addDoc(ordersRef, order);

      for (const item of cart) {
        const itemRef = doc(db, "items", item.id);

        await updateDoc(itemRef, {
          stock: increment(-item.count),
        });
      }

      setOrderId(docRef.id);
      clearCart();
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al procesar la compra.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    if (orderId) {
      Swal.fire({
        title: "¡Compra realizada!",
        text: `Tu ID de orden es: ${orderId}`,
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    }
  }, [orderId]);

  if (orderId) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.successContainer}>
          <h2>Gracias por tu compra! 🎉</h2>
          <p>Tu ID de orden es:</p>
          <strong className={styles.orderId}>{orderId}</strong>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formContainer}>
        <h2>Finalizar compra</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Nombre</label>
          <input
            type="text"
            name="name"
            value={buyer.name}
            onChange={handleInput}
            required
          />

          <label className={styles.label}>Telefono</label>
          <input
            type="tel"
            name="phone"
            value={buyer.phone}
            onChange={handleInput}
            required
          />

          <label className={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={buyer.email}
            onChange={handleInput}
            required
          />
          <button type="submit" className={styles.submitBtn}>
            Confirmar compra
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
