import {
  ADMIN_USER_FAIL,
  ADMIN_USER_REQUEST,
  ADMIN_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../types";
export const registerReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case USER_REGISTER_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const loginReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.payload,
      };
    case USER_LOGIN_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case UPDATE_USER_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const adminUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADMIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        users: action.payload,
      };
    case ADMIN_USER_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
      };
    case DELETE_USER_FAIL:
      return {
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
