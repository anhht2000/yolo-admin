import { toast } from 'react-toastify';
import { takeLatest, call, put } from '@redux-saga/core/effects';
import { AxiosResponse } from 'axios';
import receiptApi from '../../core/receiptApi';
import { IResponse } from '../../data/products';
import { actionGetReceiptUser, actionGetReceiptUserSuccess } from '../reducers/order.reducer';

function* handleGetReceiptUser({ payload }: any) {
  try {
    const { data }: AxiosResponse<IResponse<any>> = yield call(receiptApi.getReceiptUser, payload);
    yield put(actionGetReceiptUserSuccess(data));
  } catch (error) {
    toast.error('Vui lòng đăng nhập để xem lịch sử hóa đơn');
  }
}

export default function* OrderSaga() {
  yield takeLatest(actionGetReceiptUser.type, handleGetReceiptUser);
}
