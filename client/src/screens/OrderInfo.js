import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import Success from "../components/Success";
import Loader from "../components/Loader";
import { getOrderById } from "../redux/actions/orderAction";
const OrderInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const getOrderByIdReducer = useSelector((state) => state.getOrderByIdReducer);
  const { loading, success, order, error } = getOrderByIdReducer;
  const loginReducer = useSelector((state) => state.loginReducer);
  const { userInfo } = loginReducer;
  useEffect(() => {
    if (userInfo) {
      dispatch(getOrderById(id));
    } else {
      history.push("/login");
    }
  }, [dispatch, id]);
  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      {loading && <Loader />}
      {error && <Error error={error} />}
      <div>
        {order && (
          <div className="row" style={{ marginLeft: "2px" }}>
            <div className="col-md-5 card">
              <h2>Items In Your Order</h2>
              <hr />
              {order.orderItems.map((item) => (
                <div>
                  <h3>{item.name}</h3>
                  <p>
                    Quantity : <b>{item.qty}</b>
                  </p>
                  <strong>
                    Price: {Number(item.qty)} * {Number(item.price)} ={" "}
                    {Number(item.price * item.qty)}
                  </strong>
                  <hr />
                </div>
              ))}
            </div>
            <div
              className="col-md-5 card"
              style={{ textAlign: "left", marginLeft: "2rem" }}
            >
              <h3>Order Details</h3>
              <hr />
              <h5>OrderId :{order._id}</h5>
              <h5>Total Amount : {order.orderAmount}</h5>
              <h5>Date of order : {order.createdAt.substring(0, 10)}</h5>
              <h5>Transcation ID : {order.transactionId}</h5>
              {order.isDelivered ? (
                <Success success="Order Delivered" />
              ) : (
                <Error error="Order Not Delivered" />
              )}
              <hr />
              <div>
                <h3>Shipping Address</h3>
                <h5>
                  {" "}
                  Address : <b>{order.shippingAddress.address}</b>
                </h5>
                <h5>
                  {" "}
                  city : <b>{order.shippingAddress.city}</b>
                </h5>
                <h5>
                  {" "}
                  country : <b>{order.shippingAddress.country}</b>
                </h5>
              </div>
            </div>
          </div>
        )}
        <hr />
        <div className="row">
          <h2>Replacment Conditions</h2>
          <p>
            A free replacement cannot be created for an item which was returned
            and replaced once earlier. If your item is not eligible for free
            replacement due to any reason, you can always return it for a
            refund. If the item has missing parts or accessories, you may try to
            contact the manufacturer for assistance. Manufacturer contact
            information can usually be found on the item packaging or in the
            paperwork included with the item
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;
