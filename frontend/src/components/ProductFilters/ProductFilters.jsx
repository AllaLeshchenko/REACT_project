import React, { useEffect, useMemo, useState } from 'react'
import styles from './ProductFilters.module.css'

const ProductFilters = ({ products, onFilter }) => {
  const [sortOrder, setSortOrder] = useState('default')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const getFinalPrice = (product) => product.discont_price || product.price

  const filtered = useMemo(() => {
    let result = [...products]

    if (minPrice !== '') {
      result = result.filter((p) => getFinalPrice(p) >= parseFloat(minPrice))
    }
    if (maxPrice !== '') {
      result = result.filter((p) => getFinalPrice(p) <= parseFloat(maxPrice))
    }

    if (sortOrder === 'asc') {
      result.sort((a, b) => getFinalPrice(a) - getFinalPrice(b))
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => getFinalPrice(b) - getFinalPrice(a))
    }

    return result
  }, [products, minPrice, maxPrice, sortOrder])

  useEffect(() => {
    onFilter(filtered)
  }, [filtered, onFilter])

  return (
    <div className={styles.container}>
      <div className={styles.priceFilter}>
        <span className={styles.label}>Price</span>
        <input
          type="number"
          placeholder="from"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="to"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.sortFilter}>
        <span className={styles.label}>Sorted</span>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className={styles.select}
        >
          <option value="default">by default</option>
          <option value="asc">Price: low-high</option>
          <option value="desc">Price: high-low</option>
        </select>
      </div>
    </div>
  )
}

export default ProductFilters

