import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, editProduct } from "../redux/actions/productAction";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const updateProductReducer = useSelector(
    (state) => state.updateProductReducer
  );
  const { loading, error, success } = updateProductReducer;

  const loginReducer = useSelector((state) => state.loginReducer);
  const { userInfo } = loginReducer;

  const getProductByIdReducer = useSelector(
    (state) => state.getProductByIdReducer
  );
  const {
    product,
    loading: loadingGet,
    error: errorGet,
  } = getProductByIdReducer;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]; //because upload single image
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch(getProductById(id));
    if (success) {
      window.location.href = "/dashboard/productList";
    } else {
      setName(product.name);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      setRating(product.rating);
      setPrice(product.price);
      setCategory(product.category);
      setImage(product.image);
    }
  }, [id]);
  const submitHandler = (e) => {
    e.preventDefault();
    const product = {
      name,
      description,
      rating,
      price,
      countInStock,
      category,
      image,
    };
    //update product
    dispatch(editProduct(id, product));
    alert("product updated");
    window.location.href = "/dashboard/productList";
  };
  return (
    <div>
      {loadingGet ? (
        <Loader />
      ) : (
        <div className="row justify-content-center">
          <div className="col-md-5 card p-5" style={{ marginTop: "-1rem" }}>
            <form onSubmit={submitHandler}>
              <h3>Update Product</h3>
              {error && <Error error={error} />}
              {errorGet && <Error error={errorGet} />}
              <div>
                <label>image</label>
                <input
                  type="text"
                  placeholder="Enter image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <input
                  type="file"
                  id="image"
                  label="choose file"
                  custom
                  onChange={uploadFileHandler}
                />
              </div>
              <div>
                <label>name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Description</label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter Description"
                  class="form-control"
                  id="floatingTextarea"
                  required
                ></textarea>
              </div>
              <div>
                <label>category</label>

                <input
                  type="text"
                  placeholder="Enter Category"
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Price</label>

                <input
                  type="number"
                  placeholder="Enter price"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Rating</label>
                <input
                  type="number"
                  placeholder="Enter rating"
                  className="form-control"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>CountInStock</label>

                <input
                  type="number"
                  placeholder="Enter CountInStock"
                  className="form-control"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-btn"
                style={{ marginTop: "1rem", width: "150px" }}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
