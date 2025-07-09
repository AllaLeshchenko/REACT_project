import { useDispatch, useSelector } from 'react-redux'
import {increaseQty, decreaseQty} from '../../redux/cartSlice'
import { useState } from 'react'
import OrderForm from '../../components/OrderForm/OrderForm'
import { useNavigate } from 'react-router-dom';
import styles from './CartPage.module.css'
import MyButton from '../../ui/MyButton/MyButton';

const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (cartItems.length === 0 && !isModalOpen) {
    return (
      <div className={styles.pageContainer}>
        <h2>Shopping cart</h2>
        <p>Looks like you have no items in your basket currently</p>
        <MyButton onClick={() => navigate('/')}>Continue Shopping</MyButton>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h2>Shopping cart</h2>
      <div className={styles.cartContent}>
        <div className={styles.cartItemsSection}>
          {cartItems.map((item) => {
            const price = item.discont_price ?? item.price
            const oldPrice = item.discont_price ? item.price : null

            return (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={`http://localhost:3333${item.image}`}
                  alt={item.title}
                />
                <div className={styles.itemDetails}>
                  <h3>{item.title}</h3>
                  <div className={styles.price}>
                     <div className={styles.controls}>
                        <button onClick={() => dispatch(decreaseQty(item.id))}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
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
            )
          })}
        </div>
        <OrderForm setIsModalOpen={setIsModalOpen} />
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
             Your order has been successfully placed <br /> on the website. <br /> <br />
              A manager will contact you shortly <br /> to confirm your order.
            </p>
          </div>
       </div>
      )}
    </div>
  )
}

export default CartPage

