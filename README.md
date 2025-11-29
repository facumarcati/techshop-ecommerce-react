# 🛒 TechShop E-commerce

**Single Page Application (SPA) de e-commerce** desarrollada con React y Vite.
Permite listar productos, filtrarlos por categoría, agregarlos a un carrito, y realizar un flujo de checkout completo. Utiliza Firebase para persistencia de datos y CSS Modules para estilos encapsulados.

---

## ✨ Características principales

- 📦 Listado de productos con carga desde Firebase
- ➕ Creación de nuevos productos desde la aplicación
- 🏷️ Filtrado por categoría
- 🔍 Vista detallada de cada producto
- 🛒 Carrito de compras con gestión de stock en tiempo real
- ✅ Formulario de checkout y generación de órdenes
- 📋 Historial de órdenes con vista detallada
- 🎨 Interfaz moderna y responsive
- 🔄 Navegación fluida con React Router
- 💾 Persistencia de datos con Firebase Firestore

---

## 🛠️ Tecnologías utilizadas

- **React 19** - Biblioteca principal con Hooks
- **Vite 7** - Build tool y dev server
- **React Router DOM 7** - Enrutamiento SPA
- **Firebase 12** - Backend as a Service (Firestore)
- **SweetAlert2** - Notificaciones y alertas personalizadas
- **CSS Modules** - Estilos encapsulados
- **JavaScript ES6+** - Lenguaje base

---

## 📁 Estructura del proyecto

```
src/
├── components/        # Componentes reutilizables
│   ├── Item/
│   ├── ItemDetail/
│   ├── Cart/
│   ├── Navbar/
│   └── ...
├── context/          # Context API (CartContext)
├── hooks/            # Custom hooks
├── firebase/         # Configuración de Firebase
└── App.jsx           # Componente principal
```

---

## ⚙️ Requisitos previos

- Node.js >= 18
- npm >= 9 o yarn >= 1.22
- Cuenta de Firebase (para la base de datos)

---

## 🚀 Instalación y configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/facumarcati/techshop-ecommerce-react.git
cd techshop-ecommerce-react
```

### 2. Instalar dependencias

```bash
npm install
# o
yarn install
```

### 3. Iniciar en modo desarrollo

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📦 Scripts disponibles

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

---

## 🎯 Funcionalidades detalladas

### Carrito de compras

- Agregar/eliminar productos
- Actualizar cantidades
- Validación de stock en tiempo real
- Persistencia durante la sesión

### Checkout

- Formulario de datos del comprador
- Validación de campos
- Generación de orden en Firebase
- Actualización automática de stock

### Gestión de productos

- Crear nuevos productos con formulario completo
- Filtrado por categoría
- Vista detallada con información completa
- Indicadores de stock (sin stock, últimas unidades)
- Badges de color

---

## 🌐 Deploy

Para deployar la aplicación:

```bash
npm run build
```

Esto generará una carpeta `dist/` lista para ser deployada en servicios como:

- Vercel
- Netlify
- Firebase Hosting
- GitHub Pages

---

## 📝 Autor

**Facundo Marcati**

- GitHub: [@facumarcati](https://github.com/facumarcati)
