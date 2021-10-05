import { call, debounce, put, takeLatest } from '@redux-saga/core/effects'
import productApi from 'src/core/productApi'
import {
  actionGeOneProduct,
  actionGeOneProductSuccess,
  actionGetAllProduct,
  actionGetAllProductFail,
  actionGetAllProductSuccess,
  actionSearchProduct,
  actionSearchProductFail,
  actionSearchProductSuccess,
  actionSortProduct,
  actionSortProductFail,
  actionSortProductSuccess,
} from '../slice/productSlice'

function* getAllProduct({ payload }) {
  try {
    const page = payload || 1
    const product = yield call(productApi.getAll, page)
    yield put(actionGetAllProductSuccess(product.data))
  } catch (error) {
    yield put(actionGetAllProductFail())
  }
}
function* getOneProduct({ payload }) {
  try {
    const product = yield call(productApi.getOne, payload)
    yield put(actionGeOneProductSuccess(product.data))
  } catch (error) {
    yield put(actionGetAllProductFail())
  }
}
function* searchProduct({ payload }) {
  try {
    const product = yield call(productApi.searchProduct, payload)
    yield put(actionSearchProductSuccess(product.data))
  } catch (error) {
    yield put(actionSearchProductFail())
  }
}
function* sortProduct({ payload }) {
  try {
    const product = yield call(productApi.sortProduct, payload.by, payload.order)
    yield put(actionSortProductSuccess(product.data))
  } catch (error) {
    yield put(actionSortProductFail())
  }
}

function* productSaga() {
  yield takeLatest(actionGetAllProduct.type, getAllProduct)
  yield takeLatest(actionGeOneProduct.type, getOneProduct)
  yield debounce(500, actionSearchProduct.type, searchProduct)
  yield takeLatest(actionSortProduct.type, sortProduct)
}
export default productSaga
