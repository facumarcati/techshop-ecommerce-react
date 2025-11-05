import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CartWidget from "./components/CartWidget";
import NotFound from "./components/NotFound";
import ItemDetail from "./components/ItemDetail";
import CategoryListContainer from "./components/CategoryListContainer";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ItemListContainer />} />
        <Route path="/products/:id" element={<ItemDetail />} />
        <Route path="/categories" element={<CategoryListContainer />} />
        <Route path="/cart" element={<CartWidget />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
