import styles from './Promo.module.css'
import MyButton from '../../ui/MyButton/MyButton'


const Promo = () => {
  return (
       <div className={styles.promoContainer}>
        <section className={styles.promo}>
          <div className={styles.promoContent}>
            <h1 className={styles.promoTitle}>
              Amazing Discounts <br/> on Pets Products!
            </h1>
            <MyButton>Check out</MyButton>
          </div>
        </section>
      </div>
  )
}

export default Promo