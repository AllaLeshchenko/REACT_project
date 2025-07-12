



import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/apiSlice';
import { useLocation } from 'react-router-dom';
import styles from './AllProductsPage.module.css';
import NavButton from '../../ui/NavButton/NavButton';
import ProductCard from '../../ui/ProductCard/ProductCard';
import ProductFilters from '../../components/ProductFilters/ProductFilters';
import { addToCart } from '../../redux/cartSlice'; // ✅ Добавлен импорт

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { items, status } = useSelector((state) => state.api.products);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, status]);

  const handleFilter = (newFiltered) => {
    setFilteredItems((prev) => {
      const sameLength = prev.length === newFiltered.length;
      const sameContent = sameLength && prev.every((item, i) => item.id === newFiltered[i]?.id);
      if (sameContent) return prev;
      return newFiltered;
    });
  };

  const productsToShow = filteredItems.length ? filteredItems : items;

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <NavButton to="/">Home</NavButton>
        <NavButton to="/products">All products</NavButton>
      </div>

      <h2>All products</h2>

      <ProductFilters products={items} onFilter={handleFilter} />

      <div className={styles.grid}>
        {productsToShow.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            fromPath={location.pathname}
            fromLabel="All products"
            onAddToCart={(productWithFrom) => dispatch(addToCart(productWithFrom))} 
          />
        ))}
      </div>
    </div>
  );
};

export default AllProductsPage;