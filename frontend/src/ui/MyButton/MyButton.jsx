import React from 'react';
import styles from './MyButton.module.css';

const MyButton = ({ children, onClick, type = 'button', className = ''}) => {
  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default MyButton;