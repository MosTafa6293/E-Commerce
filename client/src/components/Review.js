import React, { useState, useEffect } from "react";
import Rating from "react-rating";
import { useDispatch, useSelector } from "react-redux";
import { addProductReview } from "../redux/actions/productAction";
import Loader from "./Loader";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Alert } from "react-bootstrap";
import { Carousel, Card } from "react-bootstrap";
const Review = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const loginReducer = useSelector((state) => state.loginReducer);
  const { userInfo } = loginReducer;
  const getProductByIdReducer = useSelector(
    (state) => state.getProductByIdReducer
  );
  const { product } = getProductByIdReducer;

  const addReviewReducer = useSelector((state) => state.addReviewReducer);
  const { error, success, loading } = addReviewReducer;
  const sendReview = () => {
    const review = {
      user: userInfo.user._id,
      name: userInfo.user.name,
      rating: rating,
      comment: comment,
    };
    if (userInfo) {
      dispatch(addProductReview(product._id, review));
    } else {
      alert("user is not authorized.!");
    }
  };
  useEffect(() => {
    if (success) {
      alert("review success");
    } else if (error) {
      alert(error);
    }
  }, []);
  return (
    <div>
      <h2>Give Your Review</h2>
      {loading && <Loader />}
      {error && <Alert variant="danger">{error}</Alert>}
      <Rating
        initialRating={rating}
        onChange={(e) => setRating(e)}
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
        readonly={false}
      />
      <input
        type="text"
        placeholder="write your comment"
        className="form-control mt-2"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="btn btn-dark mt-3" onClick={sendReview}>
        Submit Review
      </button>
    </div>
  );
};

export default Review;
