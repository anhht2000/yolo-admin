import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: {},
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
      state.product = action.payload.data
    },
    getProductFail(state) {
      state.loading = false
    },
  }
})


export const { getProduct, getProductSuccess, getProductFail } = ProductDetailsSlice.actions;
export default ProductDetailsSlice.reducer;
