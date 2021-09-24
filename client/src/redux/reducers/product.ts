import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
}

const Products = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getAll(state) {

    }
  }
})

export const { getAll } = Products.actions;
export default Products.reducer;
