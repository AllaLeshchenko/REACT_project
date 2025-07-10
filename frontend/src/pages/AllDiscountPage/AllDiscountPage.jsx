import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../../redux/apiSlice'
import { addToCart } from '../../redux/cartSlice'
import { useLocation } from 'react-router-dom'
import styles from './AllDiscountPage.module.css'
import NavButton from '../../ui/NavButton/NavButton'
import ProductCard from '../../ui/ProductCard/ProductCard'

const AllDiscountPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { items, status } = useSelector((state) => state.api.products)
  const [sortBy, setSortBy] = useState('')

  useEffect(() => {
    if (status === 'idle') dispatch(fetchAllProducts())
  }, [dispatch, status])

  const filtered = items.filter(p => p.discont_price)

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.discont_price - b.discont_price
    if (sortBy === 'price-high') return b.discont_price - a.discont_price
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
    return 0
  })

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <NavButton to="/">Home</NavButton>
        <NavButton to="/discounts">All sales</NavButton>
      </div>
      <h2>Discounted Items</h2>

      <div className={styles.sorting}>
        <label>Сортировка: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Без сортировки</option>
          <option value="price-low">Цена: по возрастанию</option>
          <option value="price-high">Цена: по убыванию</option>
          <option value="newest">Сначала новые</option>
        </select>
      </div>

      <div className={styles.grid}>
        {sorted.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            showButton={true}
            onAddToCart={(p) => dispatch(addToCart(p))}
            linkState={{ from: location.pathname, label: 'All sales' }}
          />
        ))}
      </div>
    </div>
  )
}

export default AllDiscountPage
