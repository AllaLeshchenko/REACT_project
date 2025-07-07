import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './NavButton.module.css';

const NavButton = ({ children, to, onClick, type = 'button', className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = to && location.pathname === to;

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (to) navigate(to);
  };

  const combinedClassName = `${styles.navButton} ${isActive ? styles.active : ''} ${className}`;

  return (
    <button type={type} onClick={handleClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default NavButton;

// import React from 'react';
// import styles from './NavButton.module.css';

// const NavButton = ({ children, onClick, type = 'button', className = '' }) => {
//   return (
//     <button type={type} onClick={onClick} className={`${styles.navButton} ${className}`}>
//       {children}
//     </button>
//   );
// };

// export default NavButton;