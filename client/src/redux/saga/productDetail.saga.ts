import { AxiosResponse } from 'axios';
import { all, call, put, takeLatest } from '@redux-saga/core/effects';
import productDetailApi from '../../core/productDetailApi';
import { getProductSuccess, getProductFail, getProduct } from '../reducers/productDetail.reducer';

function* loadProduct( { payload }: ReturnType<typeof getProduct>) {
  try {
    const result: Array<any> = yield all([
      call(productDetailApi.getProduct, payload),
      call(productDetailApi.getCardContent)
    ])
    const [productDetails, product] = result.map((item)=> item.data)
    yield put(getProductSuccess({details:productDetails, product: product}));
  } catch (error) {
    yield put(getProductFail());
  }
}

export default function* productDetailSaga() {
  yield takeLatest(getProduct.type, loadProduct);
}
