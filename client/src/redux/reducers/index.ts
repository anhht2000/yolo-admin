import { combineReducers } from "redux";
import homeReducer from "./home.reducer";
import productReducer from "./product.reducer";
import userReducers from "./user";
const rootReducer = combineReducers({
  user: userReducers,
  product: productReducer,
  home: homeReducer,
});

export default rootReducer;
