import { useState } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { app } from "../firebase/config.js";
import styles from "./AddProductForm.module.css";

const AddProductForm = () => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let error = "";

    if (name === "price" && value < 0) {
      error = "El precio no puede ser negativo";
    }

    if (name === "stock" && value < 0) {
      error = "El stock no puede ser negativo";
    }

    if (["name", "color", "category"].includes(name)) {
      if (value.length < 2) {
        error = "No puede tener menos de dos caracteres";
      }
    }

    return error;
  };

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    color: "",
    image: "",
    stock: "",
    category: "",
  });

  const db = getFirestore(app);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    const errorMsg = validateField(name, formattedValue);

    setErrors({
      ...errors,
      [name]: errorMsg,
    });

    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();

    try {
      const itemsRef = collection(db, "items");
      await addDoc(itemsRef, {
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        color: formData.color,
        image: formData.image,
        stock: Number(formData.stock),
        category: formData.category,
      });

      alert("Producto agregado correctamente");
      setFormData({
        name: "",
        price: "",
        description: "",
        color: "",
        image: "",
        stock: "",
        category: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Crear Producto</h2>

      <form onSubmit={handleSaveItem} className={styles.form}>
        <label className={styles.label}>Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>Precio</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
        {errors.price && <small className={styles.error}>{errors.price}</small>}

        <label className={styles.label}>Descripción</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className={styles.textarea}
          required
        />

        <label className={styles.label}>Color</label>
        <input
          type="text"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>URL de Imagen</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleInputChange}
          className={styles.input}
          required
        />

        <label className={styles.label}>Stock</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
        {errors.stock && <small className={styles.error}>{errors.stock}</small>}

        <label className={styles.label}>Categoría</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className={styles.input}
          required
        />
        <small className={styles.helper}>
          Usar categorías en plural. Ej: "Telefonos", "Monitores", "Mouses"
        </small>

        <button type="submit" className={styles.button}>
          Agregar producto
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
