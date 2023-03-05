import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface Props {
    quantityAccessible: number
}

const NumberInput = ({ quantityAccessible }: Props) => {
    const [value, setValue] = React.useState(1);

    const handleIncrement = () => {
        setValue((prevValue) => prevValue + 1);
    };

    const handleDecrement = () => {
        setValue((prevValue) => prevValue - 1);
    };

    return (
        <TextField
            type="number"
            value={value}
            onChange={(event) => setValue(parseInt(event.target.value))}
            InputProps={{
                inputProps: {
                    min: 1,
                    max: { quantityAccessible },
                    step: 1,
                    inputMode: 'numeric',
                    style: { textAlign: "center", width: '2em' }
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
                            disabled={value >= quantityAccessible}
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