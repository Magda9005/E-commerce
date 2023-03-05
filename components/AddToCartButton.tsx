import * as React from 'react';
import Button from '@mui/material/Button';

const AddToCartButton = () => {
    return (
        <Button variant="contained"
            sx={{
                display: 'block', backgroundColor: 'black', '&:hover': {
                    backgroundColor: 'peach',
                },
                my: '1em'
            }}>
            Add To Cart
        </Button>
    );
}

export default AddToCartButton;