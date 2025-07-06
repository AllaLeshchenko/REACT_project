import styles from './MyLargeButton.module.css'

function MyLargeButton({children, onClick}) {
  return (
    <button onClick={onClick} className={styles.button}>{children}</button>
  )
}

export default MyLargeButton