import { useDispatch, useSelector } from 'react-redux';
import { increaseQty, decreaseQty, removeFromCart } from '../../redux/cartSlice';
import { useState } from 'react';
import OrderForm from '../../ui/OrderForm/OrderForm';
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.css';
import MyButton from '../../ui/MyButton/MyButton';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Если корзина пуста и модалка не открыта — показать сообщение
  if (cartItems.length === 0 && !isModalOpen) {
    return (
      <div className={styles.pageContainer}>
        <h2>Shopping cart</h2>
        <p>Looks like you have no items in your basket currently</p>
        <MyButton onClick={() => navigate('/')}>Continue Shopping</MyButton>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Shopping cart</h2>
      <div className={styles.cartContent}>
        {/* Левая секция: товары */}
        <div className={styles.cartItemsSection}>
          {cartItems.map((item) => {
            const price = item.discont_price ?? item.price;
            const oldPrice = item.discont_price ? item.price : null;

            return (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={`http://localhost:3333${item.image}`}
                  alt={item.title}
                />
                <div className={styles.itemDetails}>
                  <div className={styles.text}>
                    <h3>{item.title.split(' ').slice(0, 3).join(' ')}</h3>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      onChange={() => dispatch(removeFromCart(item.id))}
                    />
                  </div>

                  <div className={styles.price}>
                    <div className={styles.controls}>
                      <button onClick={() => dispatch(decreaseQty(item.id))}>
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => dispatch(increaseQty(item.id))}>
                        +
                      </button>
                    </div>
                    <div className={styles.priceBlock}>
                      <span className={styles.currentPrice}>${price}</span>
                      {oldPrice && (
                        <span className={styles.oldPrice}>${oldPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.sidebar}>
          <div className={styles.orderSection}>
            <h4>Order details</h4>
            <p>
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
            </p>
            <div className={styles.orderTotal}>
              <span>Total:</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>
          </div>
            <OrderForm setIsModalOpen={setIsModalOpen} />
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <div className={styles.header}>
              <h4>Congratulations!</h4>
              <input
                type="checkbox"
                className={styles.closeCheckbox}
                onChange={() => setIsModalOpen(false)}
              />
            </div>
            <p>
              Your order has been successfully placed <br /> on the website.
              <br />
              <br />
              A manager will contact you shortly <br /> to confirm your order.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;


// import { useDispatch, useSelector } from 'react-redux'
// import { increaseQty, decreaseQty, removeFromCart } from '../../redux/cartSlice'
// import { useState } from 'react'
// import OrderForm from '../../components/OrderForm/OrderForm'
// import { useNavigate } from 'react-router-dom'
// import styles from './CartPage.module.css'
// import MyButton from '../../ui/MyButton/MyButton'

// const CartPage = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const cartItems = useSelector((state) => state.cart.items)
//   const totalPrice = useSelector((state) => state.cart.totalPrice)
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   if (cartItems.length === 0 && !isModalOpen) {
//     return (
//       <div className={styles.pageContainer}>
//         <h2>Shopping cart</h2>
//         <p>Looks like you have no items in your basket currently</p>
//         <MyButton onClick={() => navigate('/')}>Continue Shopping</MyButton>
//       </div>
//     )
//   }

//   return (
//     <div className={styles.container}>
//       <h2>Shopping cart</h2>
//       <div className={styles.cartContent}>
//         <div className={styles.cartItemsSection}>
//           {cartItems.map((item) => {
//             const price = item.discont_price ?? item.price
//             const oldPrice = item.discont_price ? item.price : null

//             return (
//               <div key={item.id} className={styles.cartItem}>
//                 <img
//                   src={`http://localhost:3333${item.image}`}
//                   alt={item.title}
//                 />
//                 <div className={styles.itemDetails}>
//                   <div className={styles.text}>
//                     <h3>{item.title.split(' ').slice(0, 3).join(' ')}</h3>
//                     <input
//                       type="checkbox"
//                       className={styles.checkbox}
//                       onChange={() => dispatch(removeFromCart(item.id))}
//                     />
//                   </div>

//                   <div className={styles.price}>
//                     <div className={styles.controls}>
//                       <button onClick={() => dispatch(decreaseQty(item.id))}>−</button>
//                       <span>{item.quantity}</span>
//                       <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
//                     </div>
//                     <div className={styles.priceBlock}>
//                       <span className={styles.currentPrice}>${price}</span>
//                       {oldPrice && (
//                         <span className={styles.oldPrice}>${oldPrice}</span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )
//           })}
//         </div>
//         <div className={styles.orderSection}>
//           <h3>Order details</h3>
//           <p>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items</p>
//           <div className={styles.orderTotal}>
//             <span>Total:</span>
//             <strong>${totalPrice.toFixed(2)}</strong>
//           </div>
//         </div>

//         <OrderForm setIsModalOpen={setIsModalOpen} />
//       </div>

//       {isModalOpen && (
//         <div className={styles.modal}>
//           <div className={styles.modalContent}>
//             <div className={styles.header}>
//               <h4>Congratulations!</h4>
//               <input
//                 type="checkbox"
//                 className={styles.closeCheckbox}
//                 onChange={() => setIsModalOpen(false)}
//               />
//             </div>
//             <p>
//               Your order has been successfully placed <br /> on the website. <br /><br />
//               A manager will contact you shortly <br /> to confirm your order.
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default CartPage

