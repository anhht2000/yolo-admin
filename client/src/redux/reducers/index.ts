import { combineReducers } from "redux";
import homeReducer from "./home.reducer";
import productReducer from "./product.reducer";
import productDetailReducer from "./productDetail.reducer";
import userReducers from "./user";
const rootReducer = combineReducers({
  user: userReducers,
  product: productReducer,
  home: homeReducer,
  productDetails: productDetailReducer,
});

export default rootReducer;
