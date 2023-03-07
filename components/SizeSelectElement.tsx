import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    variants: string[];
    size: string;
    onChange: (value: string) => void
}

export default function SizeSelectElement({ variants, size, onChange }: Props) {

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ marginBottom: '1em', width: 130 }}>
                <InputLabel id="demo-simple-select-label">Size</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={size}
                    label="Size"
                    onChange={handleChange}
                    sx={{ ':focus': { outline: '1px solid black' } }}
                    required={true}
                >
                    {variants && variants.map((variant, index) => <MenuItem value={variant} 
                    // selected={index === 0 ? true : false}
                    >{variant}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
}



