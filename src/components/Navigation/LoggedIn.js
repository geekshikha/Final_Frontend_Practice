import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/slice";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";

import { useNavigate } from "react-router-dom";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/");
    dispatch(logOut());
  };

  return (
    <>
      <Nav.Item style={{ padding: ".5rem 1rem" }}>{user?.email}</Nav.Item>
      <Button onClick={onLogout}>Logout</Button>
    </>
  );
}
