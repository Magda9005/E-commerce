import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import styles from './ListElement.module.scss';
import Link from 'next/link';

interface Props {
    img: string;
    productName: string;
    price: string;
    description: string;
    handle: string;
}

const ListElement = ({ img, productName, price, description, handle }: Props) => {
    return (
        <Card className={styles.productCard} sx={{ maxWidth: 345 }}>
            <Link href={`${handle}`} className={styles.link}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="350"
                        image={img}
                        alt="product"
                    />
                    <CardContent className={styles.cardContent}>
                        <Typography gutterBottom variant="h5" component="div">
                            {productName}
                        </Typography>
                        <span className={styles.price}>{new Intl.NumberFormat('eur', { style: 'currency', currency: 'eur' }).format(price)
                        } </span>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                </CardActions>
            </Link >

        </Card>
    );
}


export default ListElement;