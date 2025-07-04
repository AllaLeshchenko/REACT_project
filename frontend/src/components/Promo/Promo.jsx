import styles from './Promo.module.css'

const Promo = () => {
  return (
       <div className={styles.promoContainer}>
        <section className={styles.promo}>
          <div className={styles.promoContent}>
            <h1 className={styles.promoTitle}>
              Amazing Discounts <br/> on Pets Products!
            </h1>
            <button className={styles.promoButton}>Check out</button>
          </div>
        </section>
      </div>
  )
}

export default Promo