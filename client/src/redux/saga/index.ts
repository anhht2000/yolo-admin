import { all } from 'redux-saga/effects';
import homeSaga from './home.saga';
import OrderSaga from './order.saga';
import { productSaga } from './product.saga';
import productDetailSaga from './productDetail.saga';

export function* rootSaga() {
  yield all([productSaga(), homeSaga(), productDetailSaga(), OrderSaga()]);
}
