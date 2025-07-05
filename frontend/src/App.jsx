import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage.jsx';
import AllProductsPage from './pages/AllProductsPage/AllProductsPage.jsx';
import AllDiscountPage from './pages/AllDiscountPage/AllDiscountPage.jsx';
import Product from './pages/Product/Product.jsx'
import CategoryProduct from './pages/CategoryProduct/CategoryProduct.jsx'
import NotFound from './pages/NotFound/NotFound'
import CartPage from './pages/CartPage/CartPage.jsx';
import Footer from './components/Footer/Footer.jsx';
import './App.css'

function App() {

  return (
    <div className='App'>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/discounts" element={<AllDiscountPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/categories/:id" element={<CategoryProduct />} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
