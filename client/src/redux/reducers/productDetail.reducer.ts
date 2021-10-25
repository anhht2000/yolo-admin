import { RootState } from './../store';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  product: {},
  cardContent: [],
  loading: false,
  total: 0
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
    actionPlusTotalProducts: (state, action) => {
      console.log(action.payload);

      state.total += action.payload
    }
  }
})


export const { getProduct, getProductSuccess, getProductFail, actionPlusTotalProducts } = ProductDetailsSlice.actions;
export const getTotalProducts = (state: RootState) => state.productDetails.total
export default ProductDetailsSlice.reducer;
