import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../redux/apiSlice'
import { Link } from 'react-router-dom'
import styles from './CategoriesPage.module.css'
import NavButton from '../../ui/NavButton/NavButton'

const CategoriesPage = () => {
  const dispatch = useDispatch()
  const { items, status } = useSelector((state) => state.api.categories)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories())
    }
  }, [dispatch, status])

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <NavButton to="/">Home</NavButton>
        <NavButton to='/categories'>Categories</NavButton>
      </div>
      <h2 className={styles.title}>Categories</h2>
      <div className={styles.grid}>
        {items.map((category) => (
          <Link
            to={`/categories/${category.id}`}
            key={category.id}
            className={styles.card}
          >
            <img
              src={`http://localhost:3333${category.image}`}
              alt={category.title}
            />
            <h3>{category.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CategoriesPage
