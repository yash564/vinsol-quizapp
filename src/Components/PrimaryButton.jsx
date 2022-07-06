import React from "react";
import { Button } from "@mui/material";

const PrimaryButton = ({ value, type, color, handler, size }) => {
  return (
    <Button variant={type} color={color} onClick={handler} size={size}>
      {value}
    </Button>
  );
};

export default PrimaryButton;
