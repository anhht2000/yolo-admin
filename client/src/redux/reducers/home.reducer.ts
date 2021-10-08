import { RootState } from './../store';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  topNewProduct: [],
  topSellProduct: [],
  topPopularProduct: [],
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    actionLoadTop: (state) => {
      state.isLoading = true;
    },
    actionLoadTopSuccess: (state, action) => {
      state.isLoading = false;
      state.topNewProduct = action.payload.topNew.data;
      state.topSellProduct = action.payload.topSell.data;
      state.topPopularProduct = action.payload.topPopular.data;
    },
    actionLoadTopFail: (state) => {
      state.isLoading = false;
      state.topNewProduct = [];
      state.topSellProduct = [];
      state.topPopularProduct = [];
    },
  },
});

//action
export const { actionLoadTop, actionLoadTopSuccess, actionLoadTopFail } = homeSlice.actions;
//selector
export const getLoading = (state: RootState) => state.home.isLoading;
export const getTopNewProduct = (state: RootState) => state.home.topNewProduct;
export const getTopSellProduct = (state: RootState) => state.home.topSellProduct;
export const getTopPopularProduct = (state: RootState) => state.home.topPopularProduct;
//reducer
const homeReducer = homeSlice.reducer;
export default homeReducer;
