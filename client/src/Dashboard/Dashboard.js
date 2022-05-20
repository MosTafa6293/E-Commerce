import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../dashboard.css";
import CompDashboard from "./CompDashboard";
import { BrowserRouter as Router, Switch, Link, Route } from "react-router-dom";
import UserList from "../admin/UserList";
import ProductList from "../admin/ProductList";
import OrderList from "../admin/OrderList";
import AddProduct from "../admin/AddProduct";
import EditProduct from "../admin/EditProduct";
import { Container, Row } from "react-bootstrap";
import DrawerDashboard from "./Drawer";

const Dashboard = () => {
  return <DrawerDashboard />;
};

export default Dashboard;
