import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import ItemListContainer from "./components/ItemListContainer";
import Home from "./components/Home";
import CartContainer from "./components/CartContainer";
import NotFound from "./components/NotFound";
import ItemDetail from "./components/ItemDetail";
import CategoryListContainer from "./components/CategoryListContainer";
import AddProductForm from "./components/AddProductForm";
import CategoryPage from "./components/CategoryPage";
import CheckoutForm from "./components/CheckoutForm";
import OrderListContainer from "./components/OrderListContainer";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ItemListContainer />} />
        <Route path="/products/:id" element={<ItemDetail />} />
        <Route path="/categories" element={<CategoryListContainer />} />
        <Route path="/category/:cat" element={<CategoryPage />} />
        <Route path="/cart" element={<CartContainer />} />
        <Route path="/add-product" element={<AddProductForm />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/checkout" element={<CheckoutForm />} />
        <Route path="orders" element={<OrderListContainer />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
