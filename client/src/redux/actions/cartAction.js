import { ADD_TO_CART, DELETE_FROM_CART } from "../types";
export const addToCart = (product, qty) => async (dispatch, getState) => {
  try {
    const cartItems = {
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      countInStock: product.countInStock,
      qty: qty,
    };
    dispatch({
      type: ADD_TO_CART,
      payload: cartItems,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().addToCartReducer.cartItems)
    );
  } catch (err) {
    console.log(err);
  }
};
export const deleteCart = (item) => (dispatch, getState) => {
  dispatch({
    type: DELETE_FROM_CART,
    payload: item,
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().addToCartReducer.cartItems)
  );
};
