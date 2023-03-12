import * as React from "react";
import Button from "@mui/material/Button";

interface Props {
  onClick: () => void;
  text: string;
}

const AddToCartButton = ({ onClick, text }: Props) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      sx={{
        display: "block",
        backgroundColor: "black",
        my: "1em",
        "&:hover": {
          backgroundColor: "#FFCBA5",
          opacity: "0.7",
          color: "black",
        },
      }}
    >
      {text}
    </Button>
  );
};

export default AddToCartButton;
