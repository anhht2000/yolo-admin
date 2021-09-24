import { createSlice } from '@reduxjs/toolkit';
import { IProducts } from '../../data/products';

const initialState: {products:IProducts[],loading: boolean} = {
  products: [],
  loading: false
}

const ProductSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    getAllProduct(state) {
      state.loading = true;
    },
    getAllProductSuccess(state,action) {
      console.log(action.payload);
      state.loading = false;
      state.products = action.payload;
    }
  }
})


export const { getAllProduct, getAllProductSuccess} = ProductSlice.actions;
export default ProductSlice.reducer;
