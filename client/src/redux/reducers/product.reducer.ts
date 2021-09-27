import { createSlice } from '@reduxjs/toolkit';
import { IProducts } from '../../data/products';

const initialState: {
  products:IProducts[],
  loadingProduct: boolean,
  filter: {
    [a: string]: {
      content: string;
      use?: boolean;
    }[]
  },
  filter_clone: {
    [a: string]: {
      content: string;
      use?: boolean;
    }[]
  },
  loadingFilter: boolean,
  helper: string[]
} = {
  products: [],
  loadingProduct: false,
  filter: {},
  filter_clone: {},
  loadingFilter: false,
  helper: []
}

const ProductSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    getAllProduct(state) {
      state.loadingProduct = true;
    },
    getAllProductSuccess(state,action) {
      state.loadingProduct = false;
      state.products = action.payload;
    },
    getAllFiltter(state) {
      state.loadingFilter = true;
    },
    getAllFilterSuccess(state,action) {
      state.loadingFilter = false;
      state.filter = action.payload.filter;
      state.helper = action.payload.helper;
      state.filter_clone = action.payload.filter;
    },
    filterChange(state,action) {
      state.filter = {
        ...state.filter, [action.payload.value] : state.filter[action.payload.value].map(
          e => e.content === action.payload.name ? { content: e.content, use: !e.use } : e
        )
      }
    },
    filterClear(state) {
      state.filter = state.filter_clone;
    }
  }
})


export const { getAllProduct, getAllProductSuccess, getAllFiltter, getAllFilterSuccess, filterChange, filterClear} = ProductSlice.actions;
export default ProductSlice.reducer;
