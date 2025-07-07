import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/apiSlice';
import { Link } from 'react-router-dom';
import styles from './Sale.module.css';
import NavButton from '../../ui/NavButton/NavButton'

const Sale = () => {
  const dispatch = useDispatch();
  const { items: allProducts, status } = useSelector((state) => state.api.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, status]);

  const discountedProducts = useMemo(() => {
    const filtered = allProducts.filter(p => p.discont_price);
    return filtered.sort(() => 0.5 - Math.random()).slice(0, 4); 
  }, [allProducts]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Sale</h2>
        <Link to="/discounts">
           <NavButton>All sales</NavButton>
        </Link>
      </div>

      <div className={styles.grid}>
        {discountedProducts.map(product => (
          <Link 
            to={`/products/${product.id}`} 
            key={product.id}
            className={styles.card} 
          >
            <div className={styles.imageWrapper}>
              {product.image ? (
                <img
                  src={`http://localhost:3333${product.image}`}
                  alt={product.title}
                />
              ) : (
                <div className={styles.noImage}>No image</div>
              )}
              <div className={styles.discount}>
                -{Math.round((1 - product.discont_price / product.price) * 100)}%
              </div>
            </div>
            <h3 className={styles.title}>{product.title}</h3>
            <div className={styles.prices}>
              <span className={styles.newPrice}>${product.discont_price}</span>
              <span className={styles.oldPrice}>${product.price}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sale;