const { createSlice } = require('@reduxjs/toolkit')

const initialState = {
  receipts: [],
  isLoading: false,
}

const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    actionGetAllReceipt: (state, action) => {
      state.isLoading = true
    },
    actionGetAllReceiptSuccess: (state, action) => {
      state.isLoading = false
      state.receipts = action.payload
    },
    actionGetAllReceiptFail: (state, action) => {
      state.isLoading = false
    },
  },
})

//selector
export const getListReceipts = (state) => state.receipt.receipts
export const getLoadingReceipts = (state) => state.receipt.isLoading
//action
export const { actionGetAllReceipt, actionGetAllReceiptSuccess, actionGetAllReceiptFail } =
  receiptSlice.actions
//reducer
const receiptReducer = receiptSlice.reducer
export default receiptReducer
