import * as React from "react";
import Alert from "@mui/material/Alert";

interface Props {
  errorMessage: string;
}

export const ErrorMessage = ({ errorMessage }: Props) => {
  return <Alert severity="error">{errorMessage}</Alert>;
};

export default ErrorMessage;
