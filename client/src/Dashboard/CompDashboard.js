import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAdminUsers } from "../redux/actions/userAction";
import { getAllProducts } from "../redux/actions/productAction";
import { getAdminOrders } from "../redux/actions/orderAction";
import { CategoryScale } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import Chartjs from "chart.js/auto";
import { Container } from "react-bootstrap";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
const CompDashboard = () => {
  const [progress, setProgress] = useState(10);
  const dispatch = useDispatch();
  const adminUsersReducer = useSelector((state) => state.adminUsersReducer);
  const { users } = adminUsersReducer;

  const getAllProductsReducer = useSelector(
    (state) => state.getAllProductsReducer
  );
  const { products } = getAllProductsReducer;

  const adminOrdersReducer = useSelector((state) => state.adminOrdersReducer);
  const { orders } = adminOrdersReducer;

  useEffect(() => {
    dispatch(getAdminOrders());
  }, []);

  useEffect(() => {
    dispatch(getAdminUsers());
  }, []);
  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <Container style={{ marginTop: "-5rem" }}>
      <Box sx={{ flexGrow: 1, display: "flex" }}>
        <Grid item xs={2} sm={4} md={4}>
          <Card style={{ padding: "20px" }}>
            <Typography>Users: {users?.length}% </Typography>
            <LinearProgress variant="determinate" value={5} />
          </Card>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Card style={{ padding: "20px", marginLeft: "10px" }}>
            <Typography>Products: {products?.length}% </Typography>
            <LinearProgress variant="determinate" value={12} />
          </Card>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Card style={{ padding: "20px", marginLeft: "10px" }}>
            <Typography>Orders: {orders?.length}% </Typography>
            <LinearProgress variant="determinate" value={6} />
          </Card>
        </Grid>
      </Box>
      <div className="data">
        <div className="content-data">
          <div className="head" style={{ marginTop: "30px" }}>
            <h3>Sales Report</h3>
            <br />
            <div
              className="menu"
              style={{
                width: "70%",
                height: "80%",
              }}
            >
              <Line
                data={{
                  labels: orders.map(({ createdAt }) =>
                    new Date(createdAt).toDateString()
                  ),
                  datasets: [
                    {
                      data: orders.map(({ orderAmount }) => orderAmount),
                      label: "orders",
                      borderColor: "#3333ff",
                      fill: true,
                    },
                  ],
                }}
              />
            </div>
          </div>
          <div className="chart">
            <div id="chart"></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CompDashboard;
