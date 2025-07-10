import React, { useEffect, useMemo, useState } from 'react'
import styles from './ProductFilters.module.css'

const ProductFilters = ({ products, onFilter }) => {
  const [sortOrder, setSortOrder] = useState('default')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const getFinalPrice = (product) => product.discont_price || product.price

  const filtered = useMemo(() => {
    let result = [...products]

    if (minPrice !== '') {
      result = result.filter((p) => getFinalPrice(p) >= parseFloat(minPrice))
    }
    if (maxPrice !== '') {
      result = result.filter((p) => getFinalPrice(p) <= parseFloat(maxPrice))
    }

    if (sortOrder === 'asc') {
      result.sort((a, b) => getFinalPrice(a) - getFinalPrice(b))
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => getFinalPrice(b) - getFinalPrice(a))
    }

    return result
  }, [products, minPrice, maxPrice, sortOrder])

  useEffect(() => {
    onFilter(filtered)
  }, [filtered, onFilter])

  return (
    <div className={styles.container}>
      <div className={styles.priceFilter}>
        <span className={styles.label}>Price</span>
        <input
          type="number"
          placeholder="from"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="to"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.sortFilter}>
        <span className={styles.label}>Sorted</span>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className={styles.select}
        >
          <option value="default">by default</option>
          <option value="asc">Price: low-high</option>
          <option value="desc">Price: high-low</option>
        </select>
      </div>
    </div>
  )
}

export default ProductFilters

// import { useEffect, useState } from 'react'
// import styles from './ProductFilters.module.css'

// const ProductFilters = ({ products, onFilter }) => {
//   const [sortOrder, setSortOrder] = useState('default')
//   const [minPrice, setMinPrice] = useState('')
//   const [maxPrice, setMaxPrice] = useState('')

//   useEffect(() => {
//   let filtered = [...products]

//   const getFinalPrice = (product) => {
//     return product.discont_price || product.price
//   }

//   if (minPrice !== '') {
//     filtered = filtered.filter((p) => getFinalPrice(p) >= parseFloat(minPrice))
//   }
//   if (maxPrice !== '') {
//     filtered = filtered.filter((p) => getFinalPrice(p) <= parseFloat(maxPrice))
//   }

//   if (sortOrder === 'asc') {
//     filtered.sort((a, b) => getFinalPrice(a) - getFinalPrice(b))
//   } else if (sortOrder === 'desc') {
//     filtered.sort((a, b) => getFinalPrice(b) - getFinalPrice(a))
//   }

//   onFilter(filtered)
// }, [products, sortOrder, minPrice, maxPrice, onFilter])

//   return (
//     <div className={styles.container}>
//       <div className={styles.filter}>
//         <label>
//           Prise  
//           <input
//             type="number"
//             value={minPrice}
//             onChange={(e) => setMinPrice(e.target.value)}
//             placeholder='from'/>
//         </label>
//         <label>
//          {' '}
//           <input
//             type="number"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(e.target.value)}
//             placeholder='to'
//           />
//         </label>
//       </div>
//       <div className={styles.sort}>
//         <label>
//           Sorted  
//           <select
//             value={sortOrder}
//             onChange={(e) => setSortOrder(e.target.value)}>
//             <option value="default">Без сортировки</option>
//             <option value="asc">По возрастанию</option>
//             <option value="desc">По убыванию</option>
//           </select>
//         </label>
//       </div>

//     </div>
//   )
// }

// export default ProductFilters