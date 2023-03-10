import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styles from "./ProductCard.module.scss";
import SizeSelectElement from "./SizeSelectElement";
import NumberInput from "./NumberInput";
import Button from "./Button";
import { formatPrice } from "../helperFunctionsAndConstants/helperFunctions";
import { CombinedError } from "urql";
import ErrorMessage from "./ErrorMessage";

interface Props {
  img: string;
  productName: string;
  description: string;
  price: string;
  variants: string[];
  handleSelectChange: (val: string) => void;
  availableQuantity: number;
  onClick: () => void;
  value: number;
  onValueChange: (value: number) => void;
  variant: string;
  error: CombinedError | undefined;
}

const ProductCard = ({
  img,
  productName,
  description,
  price,
  variants,
  handleSelectChange,
  availableQuantity,
  onClick,
  value,
  onValueChange,
  variant,
  error,
}: Props) => {
  return (
    <Card sx={{ display: "flex" }} className={styles.container}>
      <CardMedia
        component="img"
        sx={{ minWidth: 100, maxHeight: 400 }}
        image={img}
        alt={productName}
        className={styles.cardMedia}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {productName}
        </Typography>
        <span className={styles.price}>{formatPrice("eur", price)}</span>
        <SizeSelectElement
          variants={variants}
          onChange={handleSelectChange}
          variant={variant}
        />
        <NumberInput
          availableQuantity={availableQuantity}
          value={value}
          onValueChange={onValueChange}
        />
        {error && (
          <ErrorMessage
            errorMessage={"Sorry could not add your product, please try again"}
          />
        )}
        <Button onClick={onClick} text={"Add to cart"} />
        <Typography
          variant="body2"
          color="text.secondary"
          className={styles.description}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
