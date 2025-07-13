import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/images/pet-logo.svg';
import cartIcon from '../../assets/images/basket-empty.svg';
import styles from './Header.module.css';
import NavLinkCustom from '../../ui/NavLink/NavLink';

function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const uniqueItemsCount = cartItems.length;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 760 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>

        <div className={styles.logoWrapp}>
          <NavLink to="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </NavLink>
        </div>

        <button
          className={styles.burger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg width="28" height="28" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="10" fill="#000" />
            <rect y="25" width="100" height="10" fill="#000" />
            <rect y="50" width="100" height="10" fill="#000" />
            <rect y="75" width="100" height="10" fill="#000" />
          </svg>
        </button>

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

      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <NavLinkCustom to="/" onClick={() => setIsMenuOpen(false)}>Main Page</NavLinkCustom>
          <NavLinkCustom to="/categories" onClick={() => setIsMenuOpen(false)}>Categories</NavLinkCustom>
          <NavLinkCustom to="/products" onClick={() => setIsMenuOpen(false)}>All products</NavLinkCustom>
          <NavLinkCustom to="/discounts" onClick={() => setIsMenuOpen(false)}>All sales</NavLinkCustom>
        </div>
      )}
    </header>
  );
}

export default Header;

