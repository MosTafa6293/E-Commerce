import React, { useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../redux/actions/orderAction";
import Loader from "./Loader";
import Error from "./Error";
import Success from "./Success";
import { useHistory } from "react-router-dom";
const Checkout = ({ amount }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const placeOrderReducer = useSelector((state) => state.placeOrderReducer);
  const { success, error, loading } = placeOrderReducer;
  const tokenHandler = (token) => {
    dispatch(placeOrder(token, amount));
    console.log(token);
  };
  const loginReducer = useSelector((state) => state.loginReducer);
  const { userInfo } = loginReducer;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);
  return (
    <div style={{ textAlign: "center" }}>
      {loading && <Loader />}
      {success && <Success success="Your Order placed successfully" />}
      {error && <Error error={error} />}
      {amount ? (
        <StripeCheckout
          token={tokenHandler}
          amount={amount * 100}
          shippingAddress
          currency="INR"
          stripeKey="pk_test_51KTM0RG1UJtyQQec3gQlIcCFVO92OWpwUkXCocu37FvjEQ472H1MXAWwIe4YEuwwoZSdu2Leuw0T00MbNJ8P9afa00i0d3Zvcz"
        >
          <button
            className="btn"
            style={{
              backgroundColor: " var(--black1-color)",
              color: "var(--text-color)",
              border: "none",
              padding: "0.5rem",
              width: "200px",
              borderRadius: "4px",
              boxShadow: "1px 2px var(--black2-color)",
              margin: "10px",
            }}
            disabled={!amount}
          >
            <i
              className="fa-brands fa-amazon-pay"
              style={{ color: "#fff" }}
            ></i>{" "}
            PAYPAL
          </button>
        </StripeCheckout>
      ) : null}
    </div>
  );
};

export default Checkout;
