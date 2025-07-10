import React from 'react'
import styles from './SortSelect.module.css'

const SortSelect = ({ value, onChange }) => {
  return (
    <div className={styles.wrapper}>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={styles.select}>
        <option value="">by default</option>
        <option value="newest">newest</option>
        <option value="price-high">price: high-low</option>
        <option value="price-low">price: low-high</option>
      </select>
    </div>
  )
}

export default SortSelect