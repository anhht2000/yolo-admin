import { all } from "redux-saga/effects";
import homeSaga from "./home.saga";
import { productSaga } from "./product.saga";

export function* rootSaga() {
  yield all([productSaga(), homeSaga()]);
}
