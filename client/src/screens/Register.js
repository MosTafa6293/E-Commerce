import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/userAction";
import { useHistory } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Container, Form, FormControl, Card } from "react-bootstrap";
import { Button, TextField, Typography } from "@mui/material";
const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const registerReducer = useSelector((state) => state.registerReducer);
  const { success, error, loading } = registerReducer;
  const registerHandler = (e) => {
    e.preventDefault();
    if (password == cpassword) {
      const user = {
        name: name,
        email: email,
        password: password,
      };
      console.log(user);
      dispatch(register(user));
    } else {
      alert("password is not matched");
    }
  };
  useEffect(() => {
    if (success) {
      history.push("/login");
    }
  }, [history, success]);
  return (
    <Container>
      <Card className="card__signup">
        <Form onSubmit={registerHandler} className="login">
          <Typography
            variant="h4"
            style={{
              marginTop: "20px",
              marginBottom: "50px",
              textAlign: "center",
            }}
          >
            Sign Up
          </Typography>
          {error && <Error error={error} />}
          <TextField
            className="mb-3 login__input"
            controlId="formBasicEmail"
            label="Username"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
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
          <TextField
            className="mb-3 login__input"
            controlId="formBasicPassword"
            label="Confirm Password"
            type="password"
            value={cpassword}
            required
            onChange={(e) => setCPassword(e.target.value)}
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
              {loading ? <Loader /> : "Sign Up"}
            </Button>
          </div>
          <Typography style={{ textAlign: "center" }}>
            Already have an account..?
          </Typography>
          <Typography style={{ textAlign: "center" }}>
            <a href="/login">Login</a>
          </Typography>
        </Form>
      </Card>
    </Container>
  );
};
export default Register;
