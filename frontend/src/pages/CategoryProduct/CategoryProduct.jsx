import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import styles from './CategoryProduct.module.css'

const CategoryProduct = () => {
  const { id } = useParams()
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

    fetchProductsByCategory()
  }, [id])

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {category ? category.title : `Category ${id}`}
      </h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <img
                src={`http://localhost:3333${product.image}`}
                alt={product.title}
              />
              <h3>{product.title}</h3>
              <p>{product.price} ₽</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryProduct

