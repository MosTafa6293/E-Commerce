import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAdminUsers } from "../redux/actions/userAction";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const UserList = () => {
  const dispatch = useDispatch();
  const adminUsersReducer = useSelector((state) => state.adminUsersReducer);
  const { users, loading, error, success } = adminUsersReducer;
  const loginReducer = useSelector((state) => state.loginReducer);
  const { userInfo } = loginReducer;
  useEffect(() => {
    if (userInfo) {
      dispatch(getAdminUsers());
    }
  }, []);
  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
    alert("user deleted");
    window.location.reload();
  };

  return (
    <div className="container" style={{ marginTop: "-4rem" }}>
      <h3>User List</h3>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Id</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">email</TableCell>
              <TableCell align="right">isAdmin</TableCell>
              <TableCell align="right">action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && <Loader />}
            {error && <Error error={error} />}
            {users &&
              users.map((user) => (
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user._id}
                  </TableCell>
                  <TableCell align="right">{user.name}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  {user.isAdmin ? (
                    <TableCell align="right">true</TableCell>
                  ) : (
                    <TableCell align="right">false</TableCell>
                  )}
                  <TableCell align="right">
                    <i
                      className="far fa-trash-alt"
                      onClick={() => deleteHandler(user._id)}
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

export default UserList;
