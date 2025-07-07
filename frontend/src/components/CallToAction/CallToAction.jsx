import React from 'react';
import styles from './CallToAction.module.css';
import ctaImage from '../../assets/images/cta-pets.png'; // убедись, что путь правильный

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
          <button type="submit">Get a discount</button>
        </form>
      </div>
    </section>
  );
};

export default CallToAction;




// const CallToAction = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: ''
//   });

//   const [status, setStatus] = useState(null);

//   const handleChange = (e) => {
//     setFormData({ 
//       ...formData, 
//       [e.target.name]: e.target.value 
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch('http://localhost:3333/sale/send', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });

//       if (res.ok) {
//         setStatus('success');
//         setFormData({ name: '', phone: '', email: '' });
//       } else {
//         setStatus('error');
//       }
//     } catch (error) {
//       console.error(error);
//       setStatus('error');
//     }
//   };

//   