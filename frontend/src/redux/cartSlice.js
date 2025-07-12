import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  totalPrice: 0,
  lastAddedFrom: '/',
  lastAddedFromLabel: 'Home',
}

function calculateTotal(items) {
  return items.reduce((sum, item) => {
    const price = item.discont_price ?? item.price
    return sum + price * item.quantity
  }, 0)
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity = 1, addedFrom, addedFromLabel } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
    
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...action.payload, quantity });
      }
    
      if (addedFrom) {
        state.lastAddedFrom = addedFrom;
        state.lastAddedFromLabel = addedFromLabel || 'Store';
      }
    
      state.totalPrice = state.items.reduce((total, item) => {
        const itemPrice = item.discont_price ?? item.price;
        return total + itemPrice * item.quantity;
      }, 0);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      state.totalPrice = calculateTotal(state.items)
    },

    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload)
      if (item) item.quantity += 1
      state.totalPrice = calculateTotal(state.items)
    },

    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload)
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1
      } else {
        state.items = state.items.filter((i) => i.id !== action.payload)
      }
      state.totalPrice = calculateTotal(state.items)
    },

    clearCart: (state) => {
      state.items = []
      state.totalPrice = 0
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions

export const selectCartItems = (state) => state.cart.items;
export const selectTotalPrice = (state) => state.cart.totalPrice;

export default cartSlice.reducer


