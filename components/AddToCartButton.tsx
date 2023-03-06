import * as React from 'react';
import Button from '@mui/material/Button';

interface Props {
    onClick: () => void
}

const AddToCartButton = ({ onClick }: Props) => {
    return (
        <Button variant="contained" onClick={onClick}
            sx={{
                display: 'block', backgroundColor: 'black',
                my: '1em',
                '&:hover': {
                    backgroundColor: '#FFCBA5',
                    opacity:'0.7',
                    color:'black' 
                },
            }}>
            Add To Cart
        </Button>
    );
}

export default AddToCartButton;