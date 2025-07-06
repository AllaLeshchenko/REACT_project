import { configureStore } from '@reduxjs/toolkit'
import apiReducer from './apiSlice'
import cartReducer from './cartSlice'

export const store = configureStore({
  reducer: {
    api: apiReducer,
    cart: cartReducer,
  },
})
