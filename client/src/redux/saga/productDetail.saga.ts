import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import productDetailApi from '../../core/productDetailApi';
import { getProductSuccess, getProductFail, getProduct } from '../reducers/productDetail.reducer';

function* loadProduct( { payload }: ReturnType<typeof getProduct>) {
  try {
    const result: AxiosResponse<any> = yield call(productDetailApi.getProduct, payload)
    console.log(result.data)
    yield put(getProductSuccess(result.data));
  } catch (error) {
    yield put(getProductFail());
  }
}

export default function* productDetailSaga() {
  yield takeLatest(getProduct.type, loadProduct);
}
