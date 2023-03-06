import * as React from 'react';
import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import Done from '@mui/icons-material/Done';

interface Props {
    defaultValue: string;
    variants: string[];
    onChange: (value: string) => void
}

const VariantElement = ({ defaultValue, variants, onChange }: Props) => {

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <RadioGroup
            aria-labelledby="product-size-attribute"
            defaultValue={defaultValue}
            sx={{ gap: 2, mb: 2, flexWrap: 'wrap', flexDirection: 'row' }}
            onChange={handleRadioChange}
        >
            {variants && variants.map((size) => (
                <Sheet
                    key={size}
                    sx={{
                        position: 'relative',
                        width: 60,
                        height: 40,
                        flexShrink: 0,
                        borderRadius: '10%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '--joy-focus-outlineOffset': '4px',
                        '--joy-palette-focusVisible': (theme) =>
                            theme.vars.palette.neutral.outlinedBorder,
                        marginTop: '4px',
                        [`& .${radioClasses.checked}`]: {
                            [`& .${radioClasses.label}`]: {
                                fontWeight: 'lg',
                            },
                            [`& .${radioClasses.action}`]: {
                                '--variant-borderWidth': '2px',
                                borderColor: 'text.secondary',
                            },
                        },
                        [`& .${radioClasses.action}.${radioClasses.focusVisible}`]: {
                            outlineWidth: '2px',
                        },
                    }}
                >
                    <Radio color="neutral" overlay disableIcon value={size} label={size} />
                </Sheet>
            ))}
        </RadioGroup>
    );
}

export default VariantElement;