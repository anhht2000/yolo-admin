const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  data: [],
  loading: false,
  currentPage: 1,
  totalPage: 3,
  currentProduct: {},
}

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    actionGetAllProduct: (state, action) => {
      state.loading = true
    },
    actionGetAllProductSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload.data
      state.totalPage = action.payload.page.totalPage
      state.currentPage = action.payload.page.currentPage
    },
    actionGetAllProductFail: (state, action) => {
      state.loading = false
      state.data = []
      state.totalPage = 3
      state.currentPage = 1
    },
    actionGeOneProduct: (state, action) => {
      state.loading = true
    },
    actionGeOneProductSuccess: (state, action) => {
      state.loading = false
      state.currentProduct = action.payload.data
    },
    actionGeOneProductFail: (state, action) => {
      state.loading = false
      state.currentProduct = {}
    },
    actionSearchProduct: (state, action) => {
      state.loading = true
    },
    actionSearchProductSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload.data
      state.totalPage = action.payload.page.totalPage
      state.currentPage = action.payload.page.currentPage
    },
    actionSearchProductFail: (state, action) => {
      state.loading = false
      state.data = []
      state.totalPage = 3
      state.currentPage = 1
    },
    actionSortProduct: (state, action) => {
      state.loading = true
    },
    actionSortProductSuccess: (state, action) => {
      state.loading = false
      state.data = action.payload.data
      state.totalPage = action.payload.page.totalPage
      state.currentPage = action.payload.page.currentPage
    },
    actionSortProductFail: (state, action) => {
      state.loading = false
      state.data = []
      state.totalPage = 3
      state.currentPage = 1
    },
  },
})

export const {
  actionGetAllProduct,
  actionGetAllProductSuccess,
  actionGetAllProductFail,
  actionGeOneProduct,
  actionGeOneProductSuccess,
  actionGeOneProductFail,
  actionSearchProduct,
  actionSearchProductSuccess,
  actionSearchProductFail,
  actionSortProduct,
  actionSortProductSuccess,
  actionSortProductFail,
} = productSlice.actions

//selector
export const getLoading = (state) => state.product.loading
export const getProduct = (state) => state.product.data
export const getCurrentPage = (state) => state.product.currentPage
export const getTotalPage = (state) => state.product.totalPage
export const getCurrentProduct = (state) => state.product.currentProduct

//reducer
const productReducer = productSlice.reducer
export default productReducer
