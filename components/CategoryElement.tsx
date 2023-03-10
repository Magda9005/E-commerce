import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardActions } from "@mui/material";
import styles from "./CategoryElement.module.scss";

interface Props {
  img: string;
  categoryName: string;
}

const CategoryElement = ({ img, categoryName }: Props) => {
  return (
    <Card className={styles.categoryCard} sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="400"
          image={img}
          alt={categoryName}
        />
        <CardContent className={styles.cardContent}>
          <Typography gutterBottom variant="h5" component="div">
            {categoryName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryElement;
