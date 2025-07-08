import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import styles from './Product.module.css'
import MyButton from '../../ui/MyButton/MyButton'
import NavButton from '../../ui/NavButton/NavButton'
import { useLocation, useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams()
  const location = useLocation();
  const from = location.state?.from || '/';
  const fromLabel = location.state?.label || 'Home';

  const [product, setProduct] = useState(null)
  const [categoryTitle, setCategoryTitle] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [fullText, setFullText] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3333/products/${id}`)
        const productData = res.data[0]

        if (productData) {
          setProduct(productData)

          const categoryRes = await axios.get(`http://localhost:3333/categories/${productData.categoryId}`)
          setCategoryTitle(categoryRes.data.category.title)
        } else {
          console.error('Продукт не найден')
        }
      } catch (err) {
        console.error('Ошибка при получении продукта:', err)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, quantity }))
    }
  }

  const handleQtyChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount))
  }

  if (!product) return <p>Loading...</p>

  const { title, description, price, discont_price, image, categoryId } = product

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
          <img
            src={`http://localhost:3333${image}`}
            alt={title}
            className={styles.image}
          />
        ) : (
          <div className={styles.noImage}>Нет изображения</div>
        )}

        <div className={styles.details}>
          <h2 className={styles.title}>{title || 'No title'}</h2>

          <div className={styles.priceBlock}>
            {discont_price ? (
              <>
                <span className={styles.newPrice}>${discont_price}</span>
                <span className={styles.oldPrice}>${price}</span>
              </>
            ) : (
              <span className={styles.newPrice}>${price}</span>
            )}
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
              <button
                className={styles.readMore}
                onClick={() => setFullText(!fullText)}
              >
                {fullText ? 'Hide' : 'Read more'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product

// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import { useDispatch } from 'react-redux'
// import { addToCart } from '../../redux/cartSlice'
// import styles from './Product.module.css'
// import MyButton from '../../ui/MyButton/MyButton'
// import NavButton from '../../ui/NavButton/NavButton'

// const Product = () => {
//   const { id } = useParams()
//   const [product, setProduct] = useState(null)
//   const [quantity, setQuantity] = useState(1)
//   const [fullText, setFullText] = useState(false)
//   const dispatch = useDispatch()

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3333/products/${id}`)
//         console.log('Ответ от сервера:', res.data)

//         if (Array.isArray(res.data) && res.data.length > 0) {
//           setProduct(res.data[0])
//         } else {
//           console.error('Продукт не найден или пустой ответ')
//         }
//       } catch (err) {
//         console.error('Ошибка при получении продукта:', err)
//       }
//     }

//     fetchProduct()
//   }, [id])

//   const handleAddToCart = () => {
//     if (product) {
//       dispatch(addToCart({ ...product, quantity }))
//     }
//   }

//   const handleQtyChange = (amount) => {
//     setQuantity((prev) => Math.max(1, prev + amount))
//   }

//   if (!product) return <p>Loading...</p>

//   const { title, description, price, discont_price, image } = product

//   return (
//     <div className={styles.container}>
//     <div className={styles.links}>
//         <NavButton to="/">Home</NavButton>
//         <NavButton to='/categories'>Categories</NavButton>
//         <NavButton to={`/categories/${id}`}>{category?.title || `Category ${id}`}</NavButton>
//         <NavButton></NavButton>
//       </div>

//       <div className={styles.content}>
//         {image ? (
//           <img
//             src={`http://localhost:3333${image}`}
//             alt={title}
//             className={styles.image}
//           />
//         ) : (
//           <div className={styles.noImage}>Нет изображения</div>
//         )}

//         <div className={styles.details}>
//           <h2 className={styles.title}>{title || 'No title'}</h2>

//           <div className={styles.priceBlock}>
//             {discont_price ? (
//               <>
//                 <span className={styles.newPrice}>${discont_price}</span>
//                 <span className={styles.oldPrice}>${price}</span>
//               </>
//             ) : (
//               <span className={styles.newPrice}>${price}</span>
//             )}
//           </div>

//           <div className={styles.controls}>
//             <button onClick={() => handleQtyChange(-1)}>-</button>
//             <span>{quantity}</span>
//             <button onClick={() => handleQtyChange(1)}>+</button>
//             <MyButton className={styles.cartBtn} onClick={handleAddToCart}>
//               Add to cart
//             </MyButton>
//           </div>

//           <div className={styles.description}>
//             <h3>Description</h3>
//             <p>
//               {description
//                 ? fullText
//                   ? description
//                   : description.length > 400
//                     ? description.slice(0, 400) + '...'
//                     : description
//                 : 'No description available.'}
//             </p>
//             {description && description.length > 400 && (
//               <button
//                 className={styles.readMore}
//                 onClick={() => setFullText(!fullText)}
//               >
//                 {fullText ? 'Hide' : 'Read more'}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Product


