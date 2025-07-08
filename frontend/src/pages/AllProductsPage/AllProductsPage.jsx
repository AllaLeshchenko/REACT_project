import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../../redux/apiSlice'
import { Link, useLocation } from 'react-router-dom'
import styles from './AllProductsPage.module.css'
import NavButton from '../../ui/NavButton/NavButton'
import ProductCard from '../../ui/ProductCard/ProductCard'

const AllProductsPage = () => {
  const dispatch = useDispatch()
  const location = useLocation();
  const { items, status} = useSelector((state) => state.api.products)
  const [sortBy, setSortBy] = useState('')

  useEffect(() => {
    if (status === 'idle') dispatch(fetchAllProducts())
  }, [dispatch, status])

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt)
    return 0
  })

  return (
   <div className={styles.container}>
      <div className={styles.links}>
        <NavButton to="/">Home</NavButton>
        <NavButton to='/products'>All products</NavButton>
      </div>
      <h2>All products</h2>

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
     {sortedItems.map(product => (
       <ProductCard
         key={product.id}
         product={product}
         fromPath={location.pathname}
         fromLabel="All products"
       />
     ))}
   </div>
</div>
  )
}

export default AllProductsPage
