import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { getOrdersByUser } from "../redux/actions/orderAction";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
const OrderScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginReducer = useSelector((state) => state.loginReducer);
  const { userInfo } = loginReducer;
  const getOrderUserByReducer = useSelector(
    (state) => state.getOrderUserByReducer
  );
  const { loading, success, orders, error } = getOrderUserByReducer;
  useEffect(() => {
    if (userInfo) {
      dispatch(getOrdersByUser());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo]);

  return (
    <div
      className="container"
      style={{ textAlign: "center", marginTop: "1rem" }}
    >
      <Typography
        variant="h4"
        style={{ marginBottom: "10px", textAlign: "left" }}
      >
        My Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell align="right">amount</TableCell>
              <TableCell align="right">date</TableCell>
              <TableCell align="right">transaction Id</TableCell>
              <TableCell align="right">status</TableCell>
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
                  <TableCell align="right">{order.orderAmount}</TableCell>

                  <TableCell align="right">{order.createdAt}</TableCell>
                  <TableCell align="right">{order.transactionId}</TableCell>

                  <TableCell align="right">
                    {order.isDelivered ? (
                      <li>Delivered</li>
                    ) : (
                      <li>Not Delivered</li>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrderScreen;
