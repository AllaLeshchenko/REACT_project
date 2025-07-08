import React, { useEffect, useState } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import styles from './CategoryProduct.module.css'
import NavButton from '../../ui/NavButton/NavButton'
import ProductCard from '../../ui/ProductCard/ProductCard'

const CategoryProduct = () => {
  const { id } = useParams()
  const location = useLocation()

  // Сначала пробуем взять из state, потом из sessionStorage, потом fallback
  const fallbackFrom = '/categories'
  const fallbackLabel = 'Categories'

  const from = location.state?.from || sessionStorage.getItem('from') || fallbackFrom
  const fromLabel = location.state?.label || sessionStorage.getItem('fromLabel') || fallbackLabel

  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:3333/categories/${id}`)
        setCategory(res.data.category)
        setProducts(res.data.data)
      } catch (err) {
        console.error('Ошибка при получении продуктов категории:', err)
      } finally {
        setLoading(false)
      }
    }

    // 💾 Сохраняем "откуда пришли" в sessionStorage, если есть location.state
    if (location.state?.from) {
      sessionStorage.setItem('from', location.state.from)
    }
    if (location.state?.label) {
      sessionStorage.setItem('fromLabel', location.state.label)
    }

    fetchProductsByCategory()
  }, [id, location.state])

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <NavButton to="/">Home</NavButton>
        <NavButton to={from}>{fromLabel}</NavButton>
        <NavButton to={`/categories/${id}`}>{category?.title || `Category ${id}`}</NavButton>
      </div>
      <h2 className={styles.title}>
        {category ? category.title : `Category ${id}`}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
          <div className={styles.grid}>
             {products.map((product) => (
                        <ProductCard
                 key={product.id}
                 product={product}
                 fromPath={from}
                 fromLabel={fromLabel}
               />
             ))}
          </div>
      )}
    </div>
  )
}

export default CategoryProduct

