import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductById } from '../../redux/productSlice'
import styles from './Product.module.css'

const Product = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { item: product, status, error } = useSelector((state) => state.product)

  useEffect(() => {
    dispatch(fetchProductById(id))
  }, [dispatch, id])

  if (status === 'loading') return <p className={styles.loading}>Loading...</p>
  if (status === 'failed') return <p className={styles.error}>Error: {error}</p>
  if (!product) return null

  const hasDiscount = product.discont_price != null

  return (
    <div className={styles.container}>
      <img
        src={`http://localhost:3333${product.image}`}
        alt={product.title}
        className={styles.image}
      />
      <div className={styles.info}>
        <h1>{product.title}</h1>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.pricing}>
          {hasDiscount ? (
            <>
              <span className={styles.oldPrice}>{product.price} ₽</span>
              <span className={styles.newPrice}>{product.discont_price} ₽</span>
            </>
          ) : (
            <span className={styles.newPrice}>{product.price} ₽</span>
          )}
        </div>
        <button className={styles.addToCart}>Add to cart</button>
      </div>
    </div>
  )
}

export default Product
