import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCategories = createAsyncThunk('api/fetchCategories', async () => {
  const res = await axios.get('http://localhost:3333/categories/all')
  return res.data
})

export const fetchAllProducts = createAsyncThunk('api/fetchAllProducts', async () => {
  const res = await axios.get('http://localhost:3333/products/all')
  return res.data
})

export const fetchProductsByCategory = createAsyncThunk(
  'api/fetchProductsByCategory',
  async (categoryId) => {
    const res = await axios.get(`http://localhost:3333/categories/${categoryId}`)
    return { categoryId, data: res.data }
  }
)

export const fetchProductById = createAsyncThunk('api/fetchProductById', async (productId) => {
  const res = await axios.get(`http://localhost:3333/products/${productId}`)
  return { productId, data: res.data }
})

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    categories: {
      items: [],
      status: 'idle',
      error: null
    },
    products: {
      items: [],
      status: 'idle',
      error: null
    },
    productsByCategory: {},
    productById: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categories.status = 'loading'
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories.status = 'succeeded'
        state.categories.items = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.categories.status = 'failed'
        state.categories.error = action.error.message
      })

    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.products.status = 'loading'
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.products.status = 'succeeded'
        state.products.items = action.payload
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.products.status = 'failed'
        state.products.error = action.error.message
      })

    builder
      .addCase(fetchProductsByCategory.pending, (state, action) => {
        const id = action.meta.arg
        state.productsByCategory[id] = {
          items: [],
          status: 'loading',
          error: null
        }
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        const { categoryId, data } = action.payload
        state.productsByCategory[categoryId] = {
          items: data,
          status: 'succeeded',
          error: null
        }
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        const id = action.meta.arg
        state.productsByCategory[id] = {
          items: [],
          status: 'failed',
          error: action.error.message
        }
      })

    builder
      .addCase(fetchProductById.pending, (state, action) => {
        const id = action.meta.arg
        state.productById[id] = {
          item: null,
          status: 'loading',
          error: null
        }
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        const { productId, data } = action.payload
        state.productById[productId] = {
          item: data,
          status: 'succeeded',
          error: null
        }
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        const id = action.meta.arg
        state.productById[id] = {
          item: null,
          status: 'failed',
          error: action.error.message
        }
      })
  }
})

export default apiSlice.reducer
