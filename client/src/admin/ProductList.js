import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../redux/actions/productAction";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useHistory } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const ProductList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const getAllProductsReducer = useSelector(
    (state) => state.getAllProductsReducer
  );
  const { loading, products, error } = getAllProductsReducer;
  const loginReducer = useSelector((state) => state.loginReducer);
  const { userInfo } = loginReducer;
  useEffect(() => {
    if (userInfo && userInfo?.user.isAdmin) {
      dispatch(getAllProducts());
    }
  }, []);
  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
    alert("product deleted");
    window.location.reload();
  };
  const updateHandler = (id) => {
    history.push(`/dashboard/editProduct/${id}`);
  };
  return (
    <div className="container" style={{ marginTop: "-4rem" }}>
      <h3>Products List</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product Id</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">countInstock</TableCell>
              <TableCell align="right">Rating</TableCell>
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && <Loader />}
            {error && <Error error={error} />}
            {products &&
              products.map((product) => (
                <TableRow
                  key={product._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product._id}
                  </TableCell>
                  <TableCell align="right">{product.name}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>

                  <TableCell align="right">{product.countInStock}</TableCell>
                  <TableCell align="right">{product.Rating}</TableCell>

                  <TableCell align="right">
                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => updateHandler(product._id)}
                    ></i>{" "}
                    <i
                      className="far fa-trash-alt"
                      onClick={() => deleteHandler(product._id)}
                    ></i>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductList;
