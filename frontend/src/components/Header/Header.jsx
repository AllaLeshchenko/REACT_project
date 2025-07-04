import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/pet-logo.svg';
import cartIcon from '../../assets/images/basket-empty.svg';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logoWrapp}>
          <NavLink to="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </NavLink>
        </div>
        <NavLink
           to="/" className={({ isActive}) => ( isActive ? styles.activeLink : styles.link)}> Main Page
        </NavLink>
        <NavLink
           to="/categories" className={({ isActive}) => ( isActive ? styles.activeLink : styles.link)}> Categories
        </NavLink>
        <NavLink
           to="/products" className={({ isActive}) => ( isActive ? styles.activeLink : styles.link)}> All products
        </NavLink>
        <NavLink
           to="/discounts" className={({ isActive}) => ( isActive ? styles.activeLink : styles.link)}> All sales
        </NavLink>
          <div className={styles.cartWrapp}>
          <NavLink to="/cart">
            <img className={styles.cartImg} src={cartIcon} alt="cart" />
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
