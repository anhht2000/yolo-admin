import { call, put, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import productApi from '../../core/productApi';
import { IOptionRes } from '../../data/FilterDataPage';
import {
  filterChange,
  filterChangeSuccess,
  filterClear,
  getAllFilterSuccess,
  getAllFiltter,
  getAllProduct,
  getAllProductSuccess,
} from '../reducers/product.reducer';
import { IProductsApi, IResponse } from './../../data/products';

export function* getProductSaga({ payload }: PayloadAction<number>) {
  try {
    const { data }: AxiosResponse<IResponse<IProductsApi>> = yield call(productApi.getAllProduct, payload);
    yield put(getAllProductSuccess(data));
  } catch (error) {
    toast.error('System error ');
  }
}
export function* handlefilterClear() {
  try {
    yield put(getAllProduct(1));
  } catch (error) {
    toast.error('System error ');
  }
}
export function* getFilterProductSaga() {
  try {
    const { data }: AxiosResponse<IResponse<IOptionRes>> = yield call(productApi.getAllOption);

    let helper: string[] = [];
    data.data?.forEach((e) => {
      helper.push(e.name);
    });
    const filter = data.data?.map((e) => {
      let test = e.optionValue?.map((otva) => ({
        content: otva.name,
      }));
      return { name: e.name, value: test };
    });
    const hdfilter: { [key: string]: any } = {};
    filter?.forEach((e) => {
      hdfilter[e.name] = e.value;
    });
    yield put(getAllFilterSuccess({ filter: hdfilter, helper }));
  } catch (error) {
    toast.error('System error ');
  }
}
export function* handlefilterChange({ payload }: PayloadAction<any>) {
  try {
    let filterT = '';
    const hddata = payload?.helper.map((e: string, index: number) => {
      const test = payload.filter[e].filter((item: any) => item.use === true).map((e: any) => e.content);
      if (index === 0) {
        return test.join() + ',';
      }
      return test.join();
    });
    hddata.forEach((element: any) => {
      filterT = filterT + element;
    });
    const { data }: AxiosResponse<IResponse<IProductsApi>> = yield call(productApi.filterProduct, filterT);

    yield put(filterChangeSuccess(data));
  } catch (error) {
    toast.error('System error ');
  }
}

export function* productSaga() {
  yield takeLatest(getAllProduct.type, getProductSaga);
  yield takeLatest(getAllFiltter.type, getFilterProductSaga);
  yield takeLatest(filterClear.type, handlefilterClear);
  yield takeLatest(filterChange.type, handlefilterChange);
}
