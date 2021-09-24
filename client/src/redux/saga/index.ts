import { all } from 'redux-saga/effects';
import { productSaga } from './product.saga';

export function* rootSaga() {
  yield all([productSaga()])
}
