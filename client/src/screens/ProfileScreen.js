import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateUser } from "../redux/actions/userAction";
import { Form, Card } from "react-bootstrap";
import { Button, TextField, Typography } from "@mui/material";

const ProfileScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loginReducer = useSelector((state) => state.loginReducer);
  const { userInfo } = loginReducer;

  const updateUserReducer = useSelector((state) => state.updateUserReducer);
  const { success, loading, error } = updateUserReducer;

  const [name, setName] = useState(userInfo.user.name);
  const [email, setEmail] = useState(userInfo.user.email);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const updateHandler = (e) => {
    e.preventDefault();
    if (password == cpassword) {
      const user = {
        name,
        email,
        password,
      };
      dispatch(updateUser(user));
      alert("please re login");
      localStorage.removeItem("userInfo");
      history.push("/login");
    } else {
      alert("password is not match");
    }
  };
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [history]);
  return (
    <Card className="card__signup">
      <Form onSubmit={updateHandler} className="login">
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
          placeholder="Username"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          className="mb-3 login__input"
          controlId="formBasicEmail"
          label="Email Address"
          placeholder="Enter email"
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
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          className="mb-3 login__input"
          controlId="formBasicPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          value={cpassword}
          required
          onChange={(e) => setCpassword(e.target.value)}
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
            {loading ? <Loader /> : "Update"}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default ProfileScreen;
