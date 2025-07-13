import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import styles from './Product.module.css';
import MyButton from '../../ui/MyButton/MyButton';
import NavButton from '../../ui/NavButton/NavButton';
import { useLocation, useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams();
  const location = useLocation();
  const from = location.state?.from || '/';
  const fromLabel = location.state?.label || 'Home';

  const [product, setProduct] = useState(null);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [fullText, setFullText] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3333/products/${id}`);
        const productData = res.data[0];

        if (productData) {
          setProduct(productData);

          const categoryRes = await axios.get(`http://localhost:3333/categories/${productData.categoryId}`);
          setCategoryTitle(categoryRes.data.category.title);
        } else {
          console.error('Продукт не найден');
        }
      } catch (err) {
        console.error('Ошибка при получении продукта:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQtyChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ 
        ...product, 
        quantity,
        addedFrom: location.pathname,
      }));
    }
  };

  if (!product) return <p>Loading...</p>;

  const { title, description, price, discont_price, image, categoryId } = product;

  const unitPrice = discont_price ?? price;
  const totalCurrentPrice = (unitPrice * quantity).toFixed(2);
  const totalOldPrice = discont_price ? (price * quantity).toFixed(2) : null;
  const discountPercent = discont_price ? Math.round((1 - discont_price / price) * 100) : null;

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <NavButton to="/">Home</NavButton>
        <NavButton to={from}>{fromLabel}</NavButton>
        <NavButton to={`/categories/${categoryId}`}>{categoryTitle || 'Category'}</NavButton>
        <NavButton to={`/products/${id}`}>{title}</NavButton>
      </div>

      <div className={styles.content}>
        {image ? (
          <img src={`http://localhost:3333${image}`} alt={title} className={styles.image} />
        ) : (
          <div className={styles.noImage}>Нет изображения</div>
        )}

        <div className={styles.details}>
          <h2 className={styles.title}>{title || 'No title'}</h2>

          <div className={styles.priceBlock}>
            <span className={styles.newPrice}>${totalCurrentPrice}</span>
            {totalOldPrice && <span className={styles.oldPrice}>${totalOldPrice}</span>}
            {discountPercent && <span className={styles.discont}>-{discountPercent}%</span>}
          </div>

          <div className={styles.controls}>
            <button onClick={() => handleQtyChange(-1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQtyChange(1)}>+</button>
            <MyButton className={styles.cartBtn} onClick={handleAddToCart}>
              Add to cart
            </MyButton>
          </div>

          <div className={styles.description}>
            <h3>Description</h3>
            <p>
              {description
                ? fullText
                  ? description
                  : description.length > 400
                    ? description.slice(0, 400) + '...'
                    : description
                : 'No description available.'}
            </p>
            {description && description.length > 400 && (
              <button className={styles.readMore} onClick={() => setFullText(!fullText)}>
                {fullText ? 'Hide' : 'Read more'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;


