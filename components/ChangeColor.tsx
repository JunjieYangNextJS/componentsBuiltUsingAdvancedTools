import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeColor } from "../features/theme";

function ChangeColor() {
  const [color, setColor] = useState("");
  const dispatch = useDispatch();

  console.log(color, "color");

  return (
    <div>
      <TextField
        type="text"
        onChange={(e) => {
          setColor(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          dispatch(changeColor(color));
        }}
      >
        Change Color
      </Button>
    </div>
  );
}

export default ChangeColor;
