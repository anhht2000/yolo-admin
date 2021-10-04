import { call, put, takeLatest } from '@redux-saga/core/effects'
import productApi from 'src/core/productApi'
import {
  actionGeOneProduct,
  actionGeOneProductSuccess,
  actionGetAllProduct,
  actionGetAllProductFail,
  actionGetAllProductSuccess,
} from '../slice/productSlice'

function* getAllProduct() {
  try {
    const product = yield call(productApi.getAll)
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

function* productSaga() {
  yield takeLatest(actionGetAllProduct.type, getAllProduct)
  yield takeLatest(actionGeOneProduct.type, getOneProduct)
}
export default productSaga
