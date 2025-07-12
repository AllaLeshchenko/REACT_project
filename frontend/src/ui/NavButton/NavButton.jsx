import { useLocation, useNavigate } from 'react-router-dom';
import styles from './NavButton.module.css';

const NavButton = ({ children, to, state, onClick, type = 'button', className = '' }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = to && location.pathname === to;

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (to) navigate(to, { state });
  };

  const combinedClassName = `${styles.navButton} ${isActive ? styles.active : ''} ${className}`;

  return (
    <button type={type} onClick={handleClick} className={combinedClassName}>
      {children}
    </button>
  );
};

export default NavButton


