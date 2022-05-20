import {
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQUEST,
  PLACE_ORDER_SUCCESS,
  GET_ORDERUSER_FAIL,
  GET_ORDERUSER_REQUEST,
  GET_ORDERUSER_SUCCESS,
  GET_ORDER_FAIL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  ADMIN_ORDER_REQUEST,
  ADMIN_ORDER_SUCCESS,
  ADMIN_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
} from "../types";

export const placeOrderReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case PLACE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
      };
    case PLACE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return {
        state,
      };
  }
};

export const getOrderUserByReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ORDERUSER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORDERUSER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        orders: payload,
      };
    case GET_ORDERUSER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return {
        state,
      };
  }
};

export const getOrderByIdReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        order: payload,
      };
    case GET_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return {
        state,
      };
  }
};

export const adminOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ADMIN_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        orders: action.payload,
      };
    case ADMIN_ORDER_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const deleteOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case DELETE_ORDER_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
