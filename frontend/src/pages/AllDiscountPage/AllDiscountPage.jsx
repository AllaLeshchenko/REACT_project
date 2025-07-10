import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '../../redux/apiSlice'
import { useLocation } from 'react-router-dom'
import styles from './AllDiscountPage.module.css'
import NavButton from '../../ui/NavButton/NavButton'
import ProductCard from '../../ui/ProductCard/ProductCard'
import ProductFilters from '../../components/ProductFilters/ProductFilters'
import { addToCart } from '../../redux/cartSlice'

const AllDiscountPage = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const { items, status } = useSelector((state) => state.api.products)
  const [filteredItems, setFilteredItems] = useState([])

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllProducts())
    }
  }, [dispatch, status])


  const discountedItems = items.filter((p) => p.discont_price)

  const handleFilter = (newFiltered) => {
    setFilteredItems((prev) => {
      const sameLength = prev.length === newFiltered.length
      const sameContent = sameLength && prev.every((item, i) => item.id === newFiltered[i]?.id)
      if (sameContent) return prev
      return newFiltered
    })
  }

  const productsToShow = filteredItems.length ? filteredItems : discountedItems

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <NavButton to="/">Home</NavButton>
        <NavButton to="/discounts">All sales</NavButton>
      </div>

      <h2>Discounted Items</h2>

      <ProductFilters
        products={discountedItems}
        onFilter={handleFilter}
      />

      <div className={styles.grid}>
        {productsToShow.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showButton={true}
            onAddToCart={() => dispatch(addToCart(product))}
            linkState={{ from: location.pathname, label: 'All sales' }}
          />
        ))}
      </div>
    </div>
  )
}

export default AllDiscountPage

