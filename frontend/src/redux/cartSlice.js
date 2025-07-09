import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],         // каждый товар: {id, title, price, discont_price, image, quantity}
  totalPrice: 0,     // добавляем общую сумму
}

// Вспомогательная функция для подсчёта суммы
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
      const item = action.payload
      const existing = state.items.find((i) => i.id === item.id)

      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...item, quantity: 1 })
      }

      state.totalPrice = calculateTotal(state.items)
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
      if (item && item.quantity > 1) {
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

export default cartSlice.reducer


// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   items: [], // каждый товар: {id, title, price, discont_price, image, quantity}
// }

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const item = action.payload
//       const existing = state.items.find((i) => i.id === item.id)

//       if (existing) {
//         existing.quantity += 1
//       } else {
//         state.items.push({ ...item, quantity: 1 })
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter((item) => item.id !== action.payload)
//     },
//     increaseQty: (state, action) => {
//       const item = state.items.find((i) => i.id === action.payload)
//       if (item) item.quantity += 1
//     },
//     decreaseQty: (state, action) => {
//       const item = state.items.find((i) => i.id === action.payload)
//       if (item && item.quantity > 1) {
//         item.quantity -= 1
//       } else {
//         state.items = state.items.filter((i) => i.id !== action.payload)
//       }
//     },
//     clearCart: (state) => {
//       state.items = []
//     },
//   },
// })

// export const {
//   addToCart,
//   removeFromCart,
//   increaseQty,
//   decreaseQty,
//   clearCart,
// } = cartSlice.actions

// export default cartSlice.reducer
