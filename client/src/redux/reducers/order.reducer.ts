import { RootState } from './../store';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  isLogin: false,
  data: [],
  currentReceipt: {},
  currentPage: 1,
  totalPage: 1,
};

const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    actionGetReceiptUser: (state, action) => {
      state.isLoading = true;
    },
    actionGetReceiptUserSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload.data;
      state.currentPage = action.payload.page.currentPage;
      state.totalPage = action.payload.page.totalPage;
    },
    actionSetCurrentReceipt: (state, action) => {
      state.currentReceipt = action.payload;
    },
    actionSetLogin(state, action) {
      state.isLogin = action.payload;
    },
  },
});

//action
export const { actionGetReceiptUser, actionGetReceiptUserSuccess, actionSetCurrentReceipt, actionSetLogin } =
  OrderSlice.actions;
//selector
export const getDataReceipt = (state: RootState) => state.order.data;
export const getCurrentPageReceipt = (state: RootState) => state.order.currentPage;
export const getCurrentReceipt = (state: RootState) => state.order.currentReceipt;
export const getLogin = (state: RootState) => state.order.isLogin;
//reducer
const OrderReducer = OrderSlice.reducer;
export default OrderReducer;
