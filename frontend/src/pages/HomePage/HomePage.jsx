import React from 'react'
import Promo from '../../components/Promo/Promo'
import Categories from '../../components/Categories/Categories.jsx'
import CallToAction from '../../components/CallToAction/CallToAction.jsx'
import Sale from '../../components/Sale/Sale.jsx'

const HomePage = () => {
  return (
    <div>
      <Promo/>
      <Categories/>
      <CallToAction/>
      <Sale/>
    </div>
  )
}

export default HomePage