import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styles from "./ListElement.module.scss";
import Link from "next/link";
import { formatPrice } from "../helperFunctions/helperFunctions";

interface Props {
    img: string;
    productName: string;
    price: string;
    description: string;
    handle: string;
}

const ListElement = ({
    img,
    productName,
    price,
    description,
    handle,
}: Props) => {
    return (
        <Card className={styles.productCard} sx={{ maxWidth: 345 }}>
            <Link href={`${handle}`} className={styles.link}>
                <CardActionArea
                    sx={{
                        paddingBottom: "1em",
                    }}
                >
                    <CardMedia component="img" height="350" image={img} alt="product" />
                    <CardContent className={styles.cardContent}>
                        <Typography gutterBottom variant="h5" component="div">
                            {productName}
                        </Typography>
                        <span className={styles.price}>
                            {formatPrice('eur', price)}
                        </span>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            className={styles.description}
                        >
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
        </Card>
    );
};

export default ListElement;
