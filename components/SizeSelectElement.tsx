import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
    variants: string[];
    variant: string;
    onChange: (value: string) => void
}

export default function SizeSelectElement({ variants, variant, onChange }: Props) {

    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl sx={{ marginBottom: '1em', width: 130 }}>
                <Select
                    id="demo-simple-select"
                    value={variant}
                    onChange={handleChange}
                    sx={{ ':focus': { outline: '1px solid black' } }}
                    required={true}
                >
                    {variants && variants.map((variant) => <MenuItem value={variant} 
                    >{variant}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
}



