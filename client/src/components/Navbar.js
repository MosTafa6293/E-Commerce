import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@mui/material/Link";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userAction";
import {
  Nav,
  Dropdown,
  DropdownButton,
  NavDropdown,
  Navbar,
  Container,
} from "react-bootstrap";
const Header = () => {
  const addToCartReducer = useSelector((state) => state.addToCartReducer);
  const { cartItems } = addToCartReducer;
  const dispatch = useDispatch();
  const loginReducer = useSelector((state) => state.loginReducer);
  const { userInfo, error, loading } = loginReducer;
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <Navbar className="navbar" bg="" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <i className="fa-solid fa-shop" style={{ color: "#fff" }}></i>
        </Navbar.Brand>

        <Nav className="me-auto">
          {userInfo ? (
            <NavDropdown
              id="nav-dropdown-dark-example"
              title={`${userInfo?.user.name} `}
              menuVariant="light"
              style={{ zIndex: 100 }}
            >
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/orders">My Orders</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login" onClick={logoutHandler}>
                Logout
              </NavDropdown.Item>
              <NavDropdown.Divider />
              {userInfo?.user.isAdmin && (
                <>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/dashboard">
                    Dashboard
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          ) : (
            <Nav.Item>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav.Item>
          )}
        </Nav>
        <Nav>
          <Nav.Item>
            <Nav.Link href="/cart">
              <i className="fas fa-cart-plus" style={{ color: "#fff" }}></i>
              {cartItems.length}
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
