import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "@mui/material";
import styles from "./ProductCard.module.scss";
import Button from "@mui/material/Button";

const EmptyCartInfo = () => {
  return (
    <Card
      sx={{ display: "flex", width: "40%", margin: "0 auto" }}
      className={styles.container}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ textAlign: "center" }}
        >
          Your cart is empty
        </Typography>
        <Link href="/products" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
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
            Continue Shopping
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EmptyCartInfo;
