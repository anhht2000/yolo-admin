import { createSlice } from '@reduxjs/toolkit';
import { IProducts } from '../../data/products';

const initialState: {
  products: IProducts[];
  loadingProduct: boolean;
  filter: {
    [a: string]: {
      content: string;
      use?: boolean;
    }[];
  };
  filter_clone: {
    [a: string]: {
      content: string;
      use?: boolean;
    }[];
  };
  loadingFilter: boolean;
  helper: string[];
  totalPage: number;
  currentPage: number;
} = {
  products: [],
  loadingProduct: false,
  filter: {},
  filter_clone: {},
  loadingFilter: false,
  helper: [],
  totalPage: 3,
  currentPage: 1,
};

const ProductSlice = createSlice({
  name: 'Product',
  initialState,
  reducers: {
    getAllProduct(state, action) {
      state.loadingProduct = true;
    },
    getAllProductSuccess(state, action) {
      state.loadingProduct = false;
      state.products = action.payload.data;
      state.currentPage = action.payload.page.currentPage;
      state.totalPage = action.payload.page.totalPage;
    },
    getAllFiltter(state) {
      state.loadingFilter = true;
      state.filter = {};
      state.filter_clone = {};
      state.helper = [];
    },
    getAllFilterSuccess(state, action) {
      state.loadingFilter = false;
      state.filter = Object.assign({}, action.payload.filter);
      state.helper = action.payload.helper;
      state.filter_clone = Object.assign({}, action.payload.filter);
    },
    filterChange(state, action) {
      state.filter = {
        ...state.filter,
        [action.payload.value]: state.filter[action.payload.value].map((e) =>
          e.content === action.payload.name ? { content: e.content, use: !e.use } : e
        ),
      };
    },
    filterChangeSuccess(state, action) {
      state.products = action.payload.data;
      state.currentPage = action.payload.page.currentPage;
      state.totalPage = action.payload.page.totalPage;
    },
    filterClear(state) {
      state.filter = state.filter_clone;
    },
    changeCurrentPage(state, action) {
      state.currentPage = action.payload.page;
    },
  },
});

export const {
  getAllProduct,
  getAllProductSuccess,
  getAllFiltter,
  getAllFilterSuccess,
  filterChange,
  filterClear,
  changeCurrentPage,
  filterChangeSuccess,
} = ProductSlice.actions;
export default ProductSlice.reducer;
