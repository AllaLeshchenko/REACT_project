import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/images/pet-logo.svg';
import cartIcon from '../../assets/images/basket-empty.svg';
import styles from './Header.module.css';
import NavLinkCustom from '../../ui/NavLink/NavLink'; 


function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const uniqueItemsCount = cartItems.length;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logoWrapp}>
          <NavLink to="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </NavLink>
        </div>

        <div className={styles.navigation}>
          <NavLinkCustom to="/">Main Page</NavLinkCustom>
          <NavLinkCustom to="/categories">Categories</NavLinkCustom>
          <NavLinkCustom to="/products">All products</NavLinkCustom>
          <NavLinkCustom to="/discounts">All sales</NavLinkCustom>
        </div>

        <div className={styles.cartWrapp}>
          <NavLink to="/cart" className={styles.cartLink}>
            <img className={styles.cartImg} src={cartIcon} alt="cart" />
           {uniqueItemsCount > 0 && <div className={styles.cartBadge}>{uniqueItemsCount}</div>}
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;

