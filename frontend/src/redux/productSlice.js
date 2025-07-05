import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// Асинхронный запрос одного продукта по ID
export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    const response = await axios.get(`http://localhost:3333/products/${id}`)
    return response.data
  }
)

const productSlice = createSlice({
  name: 'product',
  initialState: {
    item: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.item = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default productSlice.reducer
