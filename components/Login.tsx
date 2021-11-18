import React, { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { login, logout } from "./../features/user";
import ChangeColor from "./ChangeColor";

function Login() {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    name: "wtf",
    age: 13,
    email: "something@gmail.com",
  });

  return (
    <div>
      <Button
        onClick={() => {
          dispatch(login(value));
        }}
      >
        Login
      </Button>
      <Button
        onClick={() => {
          dispatch(logout());
        }}
      >
        Log out
      </Button>
      <Button
        onClick={() => {
          setValue((prev) => ({ ...prev, name: "xd" }));
        }}
      >
        change name
      </Button>
      <ChangeColor />
    </div>
  );
}

export default Login;
