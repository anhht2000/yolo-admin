import { combineReducers } from "redux";
import productReducer from "./product.reducer";
import userReducers from './user';
const rootReducer = combineReducers({
  user: userReducers,
  product: productReducer
})

export default rootReducer;
