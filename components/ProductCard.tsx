import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import styles from './ProductCard.module.scss';
import SizeSelectElement from './SizeSelectElement';
import NumberInput from './NumberInput';
import AddToCartButton from './AddToCartButton';

interface Props {
    img: string;
    productName: string;
    description: string;
    price: string;
    variants: string[];
    handleSelectChange: (val: string) => void;
    availableQuantity: number;
    onClick: () => void;
    value:number;
    onValueChange:(value:number)=>void
}

const ProductCard = ({ img, productName, description, price, variants, handleSelectChange, availableQuantity, onClick, value, onValueChange,size }: Props) => {

    return (
        <Card sx={{ display: 'flex' }} className={styles.container}>
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
                <span className={styles.price}>{new Intl.NumberFormat('eur', { style: 'currency', currency: 'eur' }).format(price)
                } </span>
                <SizeSelectElement  variants={variants} onChange={handleSelectChange} size={size} />
                <NumberInput availableQuantity={availableQuantity} value={value}
                    onValueChange={onValueChange} />
                <AddToCartButton onClick={onClick} />
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ProductCard;