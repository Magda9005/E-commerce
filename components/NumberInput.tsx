import * as React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Props {
  availableQuantity: number;
  value: number;
  onValueChange: (value: number) => void;
}

const NumberInput = ({ availableQuantity, value, onValueChange }: Props) => {
  const handleIncrement = () => {
    onValueChange(value + 1);
  };

  const handleDecrement = () => {
    onValueChange(value - 1);
  };

  return (
    <TextField
      type="number"
      value={value}
      onChange={(event) => onValueChange(parseInt(event.target.value))}
      InputProps={{
        inputProps: {
          min: availableQuantity === 0 ? 0 : 1,
          max: { availableQuantity },
          step: 1,
          inputMode: "numeric",
          style: { textAlign: "center", width: "2em", height: "0.7em" },
        },
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              aria-label="Decrement value"
              onClick={handleDecrement}
              edge="start"
              disabled={value <= 1}
            >
              <RemoveIcon />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Increment value"
              onClick={handleIncrement}
              edge="end"
              disabled={value >= availableQuantity}
            >
              <AddIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default NumberInput;
