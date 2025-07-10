import styles from './CallToAction.module.css';
import ctaImage from '../../assets/images/cta-pets.png'; 
import MyLargeButton from '../../ui/MyLargeButton/MyLargeButton'

const CallToAction = () => {
  return (
    <section className={styles.cta}>
      <h2 className={styles.title}>5% off on the first order</h2>
      <div className={styles.content}>
        <img src={ctaImage} alt="Pets" className={styles.image} />
        <form className={styles.form}>
          <input type="text" name="name" placeholder="Name" required />
          <input type="tel" name="phone" placeholder="Phone number" required />
          <input type="email" name="email" placeholder="Email" required />
          <MyLargeButton size = 'size516' variant = 'whiteOnDark'>Get a discount</MyLargeButton>
        </form>
      </div>
    </section>
  );
};

export default CallToAction;




