import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import MyButton from '../MyButton/MyButton';
import styles from './ProductCard.module.css';

const ProductCard = ({ product, fromPath, fromLabel }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
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

        <h4 className={styles.title}>{product.title}</h4>

        <div className={styles.prices}>
          <span className={styles.newPrice}>
            ${product.discont_price || product.price}
          </span>
          {product.discont_price && (
            <span className={styles.oldPrice}>${product.price}</span>
          )}
        </div>
      </Link>

      {/* Кнопка — по центру, появляется при наведении */}
      <div className={styles.addButton}>
        <MyButton onClick={handleAddToCart}>Add to cart</MyButton>
      </div>
    </div>
  );
};

export default ProductCard;

// import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../../redux/cartSlice';
// import styles from './ProductCard.module.css';
// import MyButton from '../MyButton/MyButton';

// const ProductCard = ({ product, fromPath, fromLabel }) => {
//   const dispatch = useDispatch();

//   const discountPercent = product.discont_price
//     ? Math.round((1 - product.discont_price / product.price) * 100)
//     : 0;

//   return (
//     <div className={styles.card}>
//       <Link
//         to={`/products/${product.id}`}
//         state={{ from: fromPath, label: fromLabel }}
//         className={styles.link}
//       >
//         <div className={styles.imageWrapper}>
//           {product.image ? (
//             <img src={`http://localhost:3333${product.image}`} alt={product.title} />
//           ) : (
//             <div className={styles.noImage}>No image</div>
//           )}
//           {product.discont_price && (
//             <div className={styles.discount}>-{discountPercent}%</div>
//           )}
//         </div>

//         <h3 className={styles.title}>{product.title}</h3>

//         <div className={styles.prices}>
//           <span className={styles.newPrice}>
//             ${product.discont_price || product.price}
//           </span>
//           {product.discont_price && (
//             <span className={styles.oldPrice}>${product.price}</span>
//           )}
//         </div>
//       </Link>

//       <MyButton className={styles.addButton} onClick={() => dispatch(addToCart(product))}>
//         Add to cart
//       </MyButton>
//     </div>
//   );
// };

// export default ProductCard;