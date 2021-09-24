import { call, put, takeLatest } from "@redux-saga/core/effects";
import { MockFilterProduct } from "../../data/FilterDataPage";
import { IProducts } from "../../data/products";
import { getAllProduct, getAllProductSuccess } from "../reducers/product.reducer";

export function* getProductSaga () {
  const data: IProducts[] = yield call(MockFilterProduct);
  yield put(getAllProductSuccess(data));
}

export function* productSaga () {
  yield takeLatest(getAllProduct.type, getProductSaga)
}
