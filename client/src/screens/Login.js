import React, { useState, useEffect } from "react";
import { login } from "../redux/actions/userAction";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Container, Form, FormControl, Card } from "react-bootstrap";
import { Button, TextField, Typography } from "@mui/material";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const loginReducer = useSelector((state) => state.loginReducer);
  const { success, error, loading, userInfo } = loginReducer;
  const loginHandler = (e) => {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    dispatch(login(user));
  };
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);
  return (
    <Container>
      <Card className="card__login">
        <Form onSubmit={loginHandler} className="login">
          <Typography
            variant="h4"
            style={{
              marginTop: "20px",
              marginBottom: "50px",
              textAlign: "center",
            }}
          >
            Login
          </Typography>
          {error && <Error error={error} />}
          <TextField
            className="mb-3 login__input"
            controlId="formBasicEmail"
            label="Email"
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Typography
            className="text-muted"
            style={{ margin: "0 10px 25px", fontSize: "16px" }}
          >
            We'll never share your email with anyone else.
          </Typography>

          <TextField
            className="mb-3 login__input"
            controlId="formBasicPassword"
            label="Password"
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            style={{
              padding: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button variant="contained" className="btn" type="submit">
              {loading ? <Loader /> : "Login"}
            </Button>
          </div>
          <Typography style={{ textAlign: "center" }}>
            Don`t have any account..?
          </Typography>
          <Typography style={{ textAlign: "center" }}>
            <a href="/register">Sign Up</a>
          </Typography>
        </Form>
      </Card>
    </Container>
  );
};
export default Login;
