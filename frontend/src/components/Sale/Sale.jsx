import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from '../../redux/apiSlice';
import { Link } from 'react-router-dom';
import styles from './Sale.module.css';
import NavButton from '../../ui/NavButton/NavButton'
import ProductCard from '../../ui/ProductCard/ProductCard'

const Sale = () => {
  const dispatch = useDispatch()
  const { items: allProducts, status } = useSelector((state) => state.api.products)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllProducts())
    }
  }, [dispatch, status])

  const discountedProducts = useMemo(() => {
    const filtered = allProducts.filter(p => p.discont_price)
    return filtered.sort(() => 0.5 - Math.random()).slice(0, 4)
  }, [allProducts])

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
          <ProductCard
            key={product.id}
            product={product}
            showButton={false}
            linkState={{
              from: location.pathname,
              label: 'Sale',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Sale