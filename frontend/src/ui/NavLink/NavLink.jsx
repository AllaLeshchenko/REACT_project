import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavLink.module.css';

const NavLinkCustom = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${styles.link} ${styles.active}` : styles.link
      }
    >
      {children}
    </NavLink>
  );
};

export default NavLinkCustom;