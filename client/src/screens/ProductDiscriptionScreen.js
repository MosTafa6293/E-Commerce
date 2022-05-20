import React, { useEffect, useState } from "react";
import { getProductById } from "../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartAction";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Review from "../components/Review";
import { Container } from "react-bootstrap";
import { Carousel, Card } from "react-bootstrap";
import Alert from "@mui/material/Alert";
import Rating from "react-rating";
const ProductDiscriptionScreen = ({ match }) => {
  const [qty, setQty] = useState(1);
  const productId = match.params.id;
  const dispatch = useDispatch();
  const getProductByIdReducer = useSelector(
    (state) => state.getProductByIdReducer
  );
  const { product, error, loading } = getProductByIdReducer;
  const loginReducer = useSelector((state) => state.loginReducer);
  const { userInfo } = loginReducer;
  useEffect(() => {
    dispatch(getProductById(productId));
  }, [productId, dispatch]);
  const addToCartHandler = () => {
    dispatch(addToCart(product, qty));
  };
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error error={error} />
      ) : (
        <div
          className="row"
          style={{ paddingTop: "1rem", paddingLeft: "1rem" }}
        >
          <div className="col-md-6">
            <div className="card" style={{ padding: "1rem" }}>
              <h2>{product.name}</h2>
              <img
                src={product.image}
                className="img-fluid"
                style={{ width: "400px" }}
              />
              <p>{product.description}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="m2">
              <h3>Price : {product.price}</h3>
              <hr />
              <h3>Select Quantity</h3>
              {product.countInStock ? (
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.countInStock).keys()].map((x) => {
                    return (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <button className="btn btn-dark">Out of Stock</button>
              )}

              <hr />
              <button
                className="btn btn-dark"
                style={{ color: "#fff" }}
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
              >
                Add To Cart
              </button>
            </div>
            <hr />
            {userInfo && <Review productId={productId} />}
          </div>
        </div>
      )}
      <div
        className="card"
        style={{
          border: "none",
          padding: "2px",
          marginTop: "25px",
          marginLeft: "12px",
        }}
      >
        <h3>Latest Reviews</h3>
        {product?.reviews?.length > 0 ? (
          <Carousel
            className="pagy"
            variant="dark"
            style={{
              borderRadius: "30px",
              width: "100%",

              marginTop: "0px",
            }}
          >
            {product?.reviews?.map((rev) => (
              <Carousel.Item key={rev._id}>
                <div
                  style={{
                    margin: "5rem auto",
                    height: "100%",
                    padding: "10px",
                    width: "100%",
                  }}
                >
                  <Carousel.Caption>
                    <li className="list-group-item">By : {rev.name}</li>
                    <li className="list-group-item">
                      <Rating
                        initialRating={rev.rating}
                        style={{ color: "orange" }}
                        emptySymbol={
                          <img
                            style={{ width: "20px" }}
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/1024px-Empty_Star.svg.png"
                            className="icon"
                          />
                        }
                        fullSymbol={
                          <img
                            style={{ width: "20px" }}
                            src="https://previews.123rf.com/images/get4net/get4net1901/get4net190103118/126406639-empty-star-or-bookmark.jpg"
                            className="icon"
                          />
                        }
                        readonly={true}
                      />
                    </li>

                    <li className="list-group-item">comment : {rev.comment}</li>
                  </Carousel.Caption>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <Alert severity="warning">not reviewd</Alert>
        )}
      </div>
    </Container>
  );
};
export default ProductDiscriptionScreen;
