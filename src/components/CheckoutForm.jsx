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
import { Link, useNavigate } from "react-router-dom";
import { app } from "../firebase/config";
import styles from "./CheckoutForm.module.css";
import Swal from "sweetalert2";

function CheckoutForm() {
  const { cart, clearCart } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const db = getFirestore(app);

  useEffect(() => {
    if (cart.length === 0 && !orderId) {
      navigate("/cart");
    }
  }, [cart, navigate, orderId]);

  const validateName = (name) => {
    if (!name.trim()) return "El nombre es obligatorio";
    if (name.trim().length < 3)
      return "El nombre debe tener al menos 3 caracteres";
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name))
      return "El nombre solo puede contener letras";
    return null;
  };

  const validatePhone = (phone) => {
    if (!phone.trim()) return "El teléfono es obligatorio";
    if (!/^\d{10,15}$/.test(phone.replace(/\s/g, "")))
      return "Ingresá un teléfono válido (10-15 dígitos)";
    return null;
  };

  const validateEmail = (email) => {
    if (!email.trim()) return "El email es obligatorio";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return "Ingresá un email válido";
    return null;
  };

  const handleInput = (e) => {
    const { name, value } = e.target;

    setBuyer({
      ...buyer,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    let error = null;

    switch (name) {
      case "name":
        error = validateName(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
    }

    if (error) {
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: validateName(buyer.name),
      phone: validatePhone(buyer.phone),
      email: validateEmail(buyer.email),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const order = {
      buyer: {
        name: buyer.name.trim(),
        phone: buyer.phone.trim(),
        email: buyer.email.trim().toLowerCase(),
      },
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
    } finally {
      setIsSubmitting(false);
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
          <div className={styles.successIcon}>✓</div>
          <h2>¡Gracias por tu compra!</h2>
          <p className={styles.successText}>
            Tu orden se ha procesado exitosamente
          </p>
          <div className={styles.orderIdBox}>
            <span className={styles.orderIdLabel}>ID de orden</span>
            <strong className={styles.orderId}>
              #{orderId.slice(0, 5)}...{orderId.slice(-4)}
            </strong>
          </div>
          <div className={styles.successActions}>
            <Link to="/orders" className={styles.btnOrders}>
              Ver órdenes
            </Link>
            <Link to="/" className={styles.btnHome}>
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.formContainer}>
        <h2>Finalizar compra</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nombre completo</label>
            <input
              type="text"
              name="name"
              value={buyer.name}
              onChange={handleInput}
              onBlur={handleBlur}
              className={errors.name ? styles.inputError : ""}
              placeholder="Facundo Marcati"
            />
            {errors.name && (
              <span className={styles.errorMessage}>{errors.name}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={buyer.phone}
              onChange={handleInput}
              onBlur={handleBlur}
              className={errors.phone ? styles.inputError : ""}
              placeholder="ej: 1175830912"
            />
            {errors.phone && (
              <span className={styles.errorMessage}>{errors.phone}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={buyer.email}
              onChange={handleInput}
              onBlur={handleBlur}
              className={errors.email ? styles.inputError : ""}
              placeholder="ejemplo@correo.com"
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          <button type="submit" className={styles.submitBtn}>
            Confirmar compra
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
