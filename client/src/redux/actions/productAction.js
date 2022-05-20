import axios from "axios";
import {
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAIL,
  GET_PRODUCTS_FAILED,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCT_FAILED,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
} from "../types";
export const getAllProducts = () => async (dispatch) => {
  dispatch({
    type: GET_PRODUCTS_REQUEST,
  });
  try {
    const res = await axios.get("/api/products");
    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    dispatch({
      type: GET_PRODUCTS_FAILED,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
  }
};

export const getProductById = (id) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCT_REQUEST,
  });
  try {
    const res = await axios.get(`/api/products/${id}`);
    dispatch({
      type: GET_PRODUCT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_PRODUCT_FAILED,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.response,
    });
  }
};

export const filterProducts = (search, sort, category) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCTS_REQUEST,
  });
  try {
    const res = await axios.get("/api/products");
    let filteredProducts = res.data;
    if (search) {
      filteredProducts = res.data.filter((product) =>
        product.name.toLowerCase().includes(search)
      );
    }

    if (category !== "all") {
      filteredProducts = res.data.filter((product) =>
        product.category.toLowerCase().includes(category)
      );
    }

    if (sort !== "popular") {
      if (sort == "htl") {
        filteredProducts = res.data.sort((a, b) => b.price - a.price);
      } else {
        filteredProducts = res.data.sort((a, b) => a.price - b.price);
      }
    }

    dispatch({
      type: GET_PRODUCTS_SUCCESS,
      payload: filteredProducts,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_PRODUCTS_FAILED,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
  }
};
export const addProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_REVIEW_REQUEST,
      });
      const {
        loginReducer: { userInfo },
      } = getState();
      const config = {
        headers: {
          token: userInfo.token,
        },
      };
      const { data } = await axios.post(
        `/api/products/${productId}/review`,
        review,
        config
      );
      dispatch({
        type: ADD_REVIEW_SUCCESS,
      });
    } catch (error) {
     dispatch({
      type: ADD_REVIEW_FAIL,
      payload:
        error?.response && error.response.data.msg
          ? error.response.data.msg
          : error.response,
    });
    }
  };
export const deleteProduct = (id) => async (dispatch, getState) => {
  dispatch({
    type: DELETE_PRODUCT_REQUEST,
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
    const res = await axios.delete(`/api/products/${id}`, config);
    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.response,
    });
  }
};

export const addProduct = (product) => async (dispatch, getState) => {
  dispatch({
    type: ADD_PRODUCT_REQUEST,
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
    const res = await axios.post(`/api/products`, product, config);
    dispatch({
      type: ADD_PRODUCT_SUCCESS,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    dispatch({
      type: ADD_PRODUCT_FAIL,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.response,
    });
  }
};

export const editProduct = (id, product) => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_PRODUCT_REQUEST,
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
    const res = await axios.put(`/api/products/${id}`, product, config);
    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: res.data,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        err.response && err.response.data.msg
          ? err.response.data.msg
          : err.response,
    });
  }
};
