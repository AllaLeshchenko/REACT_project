import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../../redux/cartSlice'
import axios from 'axios'
import styles from './OrderForm.module.css'

const OrderForm = ({ setIsModalOpen }) => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const totalPrice = useSelector((state) => state.cart.totalPrice)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const orderData = {
        customer: data,
        items: cartItems,
      }

      await axios.post('http://localhost:3333/order/send', orderData)
      setIsModalOpen(true)
      dispatch(clearCart())
      reset()
    } catch (error) {
      console.error(error)
      alert('Ошибка при отправке заказа')
    }
  }

  return (
    <div className={styles.orderSection}>
      <h3>Order details</h3>
      <p>{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items</p>
      <div className={styles.orderTotal}>
        <span>Total:</span>
        <strong>${totalPrice.toFixed(2)}</strong>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.orderForm}>
        <input
          type="text"
          placeholder="Имя"
          {...register('name', { required: 'Имя обязательно' })}
        />
        {errors.name && <span className={styles.error}>{errors.name.message}</span>}

        <input
          type="tel"
          placeholder="Телефон"
          {...register('phone', {
            required: 'Телефон обязателен',
            pattern: {
              value: /^[0-9+\-()\s]+$/,
              message: 'Некорректный номер телефона',
            },
          })}
        />
        {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}

        <input
          type="email"
          placeholder="Email"
          {...register('email', {
            required: 'Email обязателен',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Некорректный email',
            },
          })}
        />
        {errors.email && <span className={styles.error}>{errors.email.message}</span>}

        <button type="submit">Оформить заказ</button>
      </form>
    </div>
  )
}

export default OrderForm