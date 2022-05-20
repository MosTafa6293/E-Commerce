import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminOrders, deleteOrder } from "../redux/actions/orderAction";
import Loader from "../components/Loader";
import Error from "../components/Error";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const OrderList = () => {
  const dispatch = useDispatch();
  const adminOrdersReducer = useSelector((state) => state.adminOrdersReducer);
  const { loading, orders, error } = adminOrdersReducer;
  const loginReducer = useSelector((state) => state.loginReducer);
  const { userInfo } = loginReducer;
  useEffect(() => {
    if (userInfo && userInfo?.user.isAdmin) {
      dispatch(getAdminOrders());
    }
  }, []);
  const deleteHandler = (id) => {
    dispatch(deleteOrder(id));
    alert("product deleted");
    window.location.reload();
  };
  const updateOrder = async (id) => {
    const config = {
      headers: {
        token: userInfo.token,
      },
    };
    await axios.put(`/api/orders/${id}`, { isDelivered: true }, config);
    window.location.reload();
  };
  return (
    <div className="container" style={{ marginTop: "-4rem " }}>
      <h3>Order List</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">amount</TableCell>
              <TableCell align="right">date</TableCell>
              <TableCell align="right">transaction Id</TableCell>
              <TableCell align="right">status</TableCell>
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && <Loader />}
            {error && <Error error={error} />}
            {orders &&
              orders.map((order) => (
                <TableRow
                  key={order._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {order._id}
                  </TableCell>
                  <TableCell align="right">{order.name}</TableCell>
                  <TableCell align="right">{order.orderAmount}</TableCell>

                  <TableCell align="right">{order.createdAt}</TableCell>
                  <TableCell align="right">{order.transactionId}</TableCell>

                  <TableCell align="right">
                    {order.isDelivered ? (
                      <i className="fa-solid fa-check"></i>
                    ) : (
                      <i
                        className="fa-solid fa-x"
                        onClick={() => updateOrder(order._id)}
                        style={{ color: "red" }}
                      ></i>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <i
                      className="far fa-trash-alt"
                      onClick={() => deleteHandler(order._id)}
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

export default OrderList;
