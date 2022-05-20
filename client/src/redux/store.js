import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  getAllProductsReducer,
  getProductByIdReducer,
  addReviewReducer,
  deleteProductReducer,
  addProductReducer,
  updateProductReducer,
} from "./reducsers/productReducer";
import { addToCartReducer } from "./reducsers/cartReducer";
import {
  loginReducer,
  registerReducer,
  updateUserReducer,
  adminUsersReducer,
  deleteUserReducer,
} from "./reducsers/userReducer";
import {
  placeOrderReducer,
  getOrderUserByReducer,
  getOrderByIdReducer,
  adminOrdersReducer,
  deleteOrderReducer,
} from "./reducsers/orderReducer";
const middleware = [thunk];
const finalReducer = combineReducers({
  getAllProductsReducer: getAllProductsReducer,
  getProductByIdReducer: getProductByIdReducer,
  addToCartReducer: addToCartReducer,
  registerReducer: registerReducer,
  loginReducer: loginReducer,
  placeOrderReducer: placeOrderReducer,
  getOrderUserByReducer: getOrderUserByReducer,
  getOrderByIdReducer: getOrderByIdReducer,
  addReviewReducer: addReviewReducer,
  updateUserReducer: updateUserReducer,
  adminUsersReducer: adminUsersReducer,
  deleteUserReducer: deleteUserReducer,
  deleteProductReducer: deleteProductReducer,
  adminOrdersReducer: adminOrdersReducer,
  deleteOrderReducer: deleteOrderReducer,
  addProductReducer: addProductReducer,
  updateProductReducer: updateProductReducer,
});
const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userData = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const initialState = {
  addToCartReducer: { cartItems: cartItems },
  loginReducer: { userInfo: userData },
};
const store = createStore(
  finalReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
