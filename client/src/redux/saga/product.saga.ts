import { call, put, takeLatest } from "@redux-saga/core/effects";
import { FilterInterFace, MockFilterData, MockFilterProduct } from "../../data/FilterDataPage";
import { IProducts } from "../../data/products";
import { getAllFilterSuccess, getAllFiltter, getAllProduct, getAllProductSuccess } from "../reducers/product.reducer";

export function* getProductSaga () {
  const data: IProducts[] = yield call(MockFilterProduct);
  yield put(getAllProductSuccess(data));
}

export function* getFilterProductSaga() {
  try {
    const data: FilterInterFace = yield call(MockFilterData);
    var helper: string[] = []
    for(const key in data) {
      helper.push(key);
      for(const element of data[key]) {
        element.use = false;
      }
    }
    yield put(getAllFilterSuccess({filter: data, helper }));
  } catch (error) {
    console.log(error)
  }
}

export function* productSaga () {
  yield takeLatest(getAllProduct.type, getProductSaga);
  yield takeLatest(getAllFiltter.type, getFilterProductSaga);
}
