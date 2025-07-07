import styles from './NotFound.module.css'
import NotFoundImg from '../../assets/images/404.png'
import { Link } from 'react-router-dom'
import MyButton from '../../ui/MyButton/MyButton'

const NotFound = () => {
  return (
    <div className={styles.container}>
        <img className={styles.img} src={NotFoundImg} alt='404'/>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.text}>
            We’re sorry, the page you requested could not be found.<br/>Please go
            back to the homepage.
        </p>
        <Link to='/'>
           <MyButton>Go home</MyButton>
        </Link>
        
    </div>
  )
}

export default NotFound