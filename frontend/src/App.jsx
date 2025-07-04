import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage.jsx';
import AllProductsPage from './pages/AllProductsPage/AllProductsPage.jsx';
import AllDiscountPage from './pages/AllDiscountPage/AllDiscountPage.jsx';
import CartPage from './pages/CartPage/CartPage.jsx';
import Footer from './components/Footer/Footer.jsx';

function App() {

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/discounts" element={<AllDiscountPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>
      <Footer/>
    </>
  );
}

export default App;
