import React from 'react';
import { Link } from 'react-router-dom';
import MyButton from '../MyButton/MyButton';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, fromPath = '/', fromLabel = 'Home', onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onAddToCart) {
      onAddToCart({ 
        ...product, 
        addedFrom: fromPath,
        addedFromLabel: fromLabel,
      }); 
    }
  };

  return (
    <div className={styles.card}>
      <Link
        to={`/products/${product.id}`}
        state={{ from: fromPath, label: fromLabel }}
        className={styles.link}
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
          {product.discont_price && (
            <div className={styles.discount}>
              -{Math.round((1 - product.discont_price / product.price) * 100)}%
            </div>
          )}
        </div>

        <div className={styles.title}>
          <h4>{product.title.split(' ').slice(0, 3).join(' ')}</h4>
        </div>

        <div className={styles.prices}>
          <span className={styles.newPrice}>
            ${product.discont_price || product.price}
          </span>
          {product.discont_price && (
            <span className={styles.oldPrice}>${product.price}</span>
          )}
        </div>
      </Link>

      <div className={styles.addButton}>
        <MyButton onClick={handleAddToCart}>Add to cart</MyButton>
      </div>
    </div>
  );
};

export default ProductCard;



