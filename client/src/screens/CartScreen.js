import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Checkout from "../components/Checkout";
import { addToCart, deleteCart } from "../redux/actions/cartAction";
import { Typography } from "@mui/material";
const CartScreen = () => {
  const addToCartReducer = useSelector((state) => state.addToCartReducer);
  const { cartItems } = addToCartReducer;
  const dispatch = useDispatch();
  var subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  return (
    <div>
      <div className="row mt-5 justify-content-center">
        <div className="col-md-7 card">
          <Typography
            variant="h3"
            style={{ textAlign: "center", padding: "5px" }}
          >
            MY CART
          </Typography>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Deleted</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <select
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(addToCart(item, e.target.value));
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                    <td>{item.qty * item.price} </td>
                    <td>
                      <i
                        className="far fa-trash-alt"
                        onClick={() => dispatch(deleteCart(item))}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <hr />
          <h2 className="text-center">Subtotal : {subtotal}$</h2>
          <hr />
          <Checkout amount={subtotal} />
        </div>
      </div>
    </div>
  );
};
export default CartScreen;
