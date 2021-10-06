import { put } from '@redux-saga/core/effects';
import { all, call } from '@redux-saga/core/effects';
import { takeLatest } from '@redux-saga/core/effects';
import homeApi from '../../core/homeApi';
import { actionLoadTop, actionLoadTopFail, actionLoadTopSuccess } from '../reducers/home.reducer';

function* loadTopProduct() {
  try {
    const arrData: Array<any> = yield all([
      call(homeApi.getTopNew),
      call(homeApi.getTopPopular),
      call(homeApi.getTopSell),
    ]);
    const [topNew, topPopular, topSell] = arrData.map((e) => e.data);
    yield put(actionLoadTopSuccess({ topNew, topPopular, topSell }));
  } catch (error) {
    yield put(actionLoadTopFail());
  }
}
export default function* homeSaga() {
  yield takeLatest(actionLoadTop.type, loadTopProduct);
}
