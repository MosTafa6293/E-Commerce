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
import axios from "axios";
export const register = (user) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
  });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/users/register", user, config);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem("userInfo", JSON.stringify(res.data));
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
  }
};

export const login = (user) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_REQUEST,
  });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.post("/api/users/login", user, config);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem("userInfo", JSON.stringify(res.data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
  }
};
export const logout = () => (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
};

export const updateUser = (user) => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_USER_REQUEST,
  });
  try {
    const {
      loginReducer: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        token: userInfo.token,
      },
    };
    const res = await axios.put("/api/users/update", user, config);
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: res.data,
    });
    window.location.reload();
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
  }
};

export const getAdminUsers = () => async (dispatch, getState) => {
  dispatch({
    type: ADMIN_USER_REQUEST,
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
    const res = await axios.get("/api/users/userList", config);
    dispatch({
      type: ADMIN_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: ADMIN_USER_FAIL,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.response,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_USER_REQUEST,
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
    const res = await axios.delete(`/api/users/${id}`, config);
    dispatch({
      type: DELETE_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.response,
    });
  }
};
