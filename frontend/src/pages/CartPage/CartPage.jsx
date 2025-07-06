import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increaseQty, decreaseQty, removeFromCart } from '../../redux/cartSlice'
import styles from './CartPage.module.css'

const CartPage = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)

  const total = cartItems.reduce((sum, item) =>
    sum + (item.discont_price || item.price) * item.quantity, 0)

  return (
    <div className={styles.pageContainer}>
      <h2>Schopping cart</h2>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <>
          <div className={styles.cartList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.card}>
                <img src={`http://localhost:3333${item.image}`} alt={item.title} />
                <div className={styles.info}>
                  <h3>{item.title}</h3>
                  <p>Цена: {(item.discont_price || item.price)} $</p>
                  <p>Сумма: {(item.discont_price || item.price) * item.quantity} $</p>
                  <div className={styles.controls}>
                    <button onClick={() => dispatch(decreaseQty(item.id))}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
                    <button onClick={() => dispatch(removeFromCart(item.id))}>Удалить</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.total}>Итого: {total.toFixed(2)} $</div>
        </>
      )}
    </div>
  )
}

export default CartPage
