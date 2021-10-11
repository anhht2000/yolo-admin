import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: {},
  cardContent: [],
  loading: false,
}

const ProductDetailsSlice = createSlice({
  name: 'ProductDetails',
  initialState,
  reducers: {
    getProduct(state, action) {
      state.loading = true
    },
    getProductSuccess(state, action) {
      state.loading = false
      state.product = action.payload.details.data
      state.cardContent = action.payload.product.data
    },
    getProductFail(state) {
      state.loading = false
    },
    getCardContent(state) {

    },
    getCardContentSuccess(state, action) {
      state.loading = false
      state.cardContent = action.payload.data
    },
    getCardContentFail(state) {
      state.loading = false
    },
  }
})


export const { getProduct, getProductSuccess, getProductFail } = ProductDetailsSlice.actions;
export default ProductDetailsSlice.reducer;
