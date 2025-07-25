import { useEffect } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategories } from '../../redux/apiSlice'
import { Link } from 'react-router-dom'
import styles from './Categories.module.css'
import NavButton from '../../ui/NavButton/NavButton'


const Categories = () => {
  const dispatch = useDispatch()
  const { items, status } = useSelector((state) => state.api.categories)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories())
    }
  }, [dispatch, status])

  const displayedCategories = items.slice(0, 4)

  return (
<div className={styles.container}>
  <div className={styles.header}>
    <h2>Categories</h2>
    <Link to="/categories">
      <NavButton>All categories</NavButton>
    </Link>
  </div>

  <div className={styles.grid}>
    {displayedCategories.map((category) => (
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

export default Categories
