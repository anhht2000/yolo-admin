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
    const temp = Object.assign({},data);
    for(const key in temp) {
      helper.push(key);
    }
    yield put(getAllFilterSuccess({filter: temp, helper }));
  } catch (error) {
    console.log(error)
  }
}

export function* productSaga () {
  yield takeLatest(getAllProduct.type, getProductSaga);
  yield takeLatest(getAllFiltter.type, getFilterProductSaga);
}
