import styles from './MyLargeButton.module.css';

function MyLargeButton({
  children,
  onClick,
  type = 'button',
  className = '',
  variant = 'whiteOnDark',  
  size = 'size516',         
}) {
  return (
    <button 
      type={type}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
    >
      {children}
    </button>
  );
}

export default MyLargeButton;