import { configureStore } from '@reduxjs/toolkit'
import categoriesReducer from './categoriesSlice'
import productReducer from './productSlice'

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
     product: productReducer, 
  },
})