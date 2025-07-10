import styles from './Promo.module.css'
import MyButton from '../../ui/MyButton/MyButton'
import { Link } from 'react-router-dom'


const Promo = () => {
  return (
       <div className={styles.promoContainer}>
        <section className={styles.promo}>
          <div className={styles.promoContent}>
            <h1 className={styles.promoTitle}>
              Amazing Discounts <br/> on Pets Products!
            </h1>
            <Link to="/discounts">
              <MyButton>Check out</MyButton>
            </Link>
          </div>
        </section>
      </div>
  )
}

export default Promo