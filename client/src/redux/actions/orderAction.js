import {
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  GET_ORDERUSER_REQUEST,
  GET_ORDERUSER_SUCCESS,
  GET_ORDERUSER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_FAIL,
  GET_ORDER_SUCCESS,
  ADMIN_ORDER_REQUEST,
  ADMIN_ORDER_SUCCESS,
  ADMIN_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
} from "../types";
import axios from "axios";
export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
  const {
    loginReducer: { userInfo },
  } = getState();
  const {
    addToCartReducer: { cartItems },
  } = getState();
  const cartNewItems = new Array();
  for (var i = 0; i < cartItems.length; i++) {
    var item = {
      name: cartItems[i].name,
      quantity: cartItems[i].qty,
      price: cartItems[i].price,
      _id: cartItems[i]._id,
    };
    cartNewItems.push(item);
  }
  dispatch({
    type: PLACE_ORDER_REQUEST,
  });
  try {
    const res = await axios.post("/api/orders/placeorder", {
      token,
      subtotal,
      userInfo,
      cartItems,
    });
    console.log(res);
    dispatch({
      type: PLACE_ORDER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PLACE_ORDER_FAIL,
      payload: err.response ? err.response.data.msg : err.response,
    });
  }
};

export const getOrdersByUser = () => async (dispatch, getState) => {
  dispatch({
    type: GET_ORDERUSER_REQUEST,
  });
  const {
    loginReducer: { userInfo },
  } = getState();
  const config = {
    headers: {
      token: userInfo.token,
    },
  };
  try {
    const res = await axios.get("/api/orders/me", config);
    dispatch({
      type: GET_ORDERUSER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ORDERUSER_FAIL,
      payload: err.response ? err.response.data.msg : err.response,
    });
  }
};

export const getOrderById = (id) => async (dispatch, getState) => {
  dispatch({
    type: GET_ORDER_REQUEST,
  });
  const {
    loginReducer: { userInfo },
  } = getState();
  const config = {
    headers: {
      token: userInfo.token,
    },
  };
  try {
    const res = await axios.get(`/api/orders/${id}`, config);
    dispatch({
      type: GET_ORDER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ORDER_FAIL,
      payload: err.response ? err.response.data.msg : err.response,
    });
  }
};

export const getAdminOrders = () => async (dispatch, getState) => {
  dispatch({
    type: ADMIN_ORDER_REQUEST,
  });
  try {
    const {
      loginReducer: { userInfo },
    } = getState();
    const config = {
      headers: {
        token: userInfo.token,
      },
    };
    const res = await axios.get("/api/orders", config);
    dispatch({
      type: ADMIN_ORDER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ADMIN_ORDER_FAIL,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.response,
    });
  }
};

export const deleteOrder = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_ORDER_REQUEST,
  });
  try {
    const {
      loginReducer: { userInfo },
    } = getState();
    const config = {
      headers: {
        token: userInfo.token,
      },
    };
    const res = await axios.delete(`/api/orders/${id}`, config);
    dispatch({
      type: DELETE_ORDER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.response,
    });
  }
};
