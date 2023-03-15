import NumberInput from "./NumberInput";
import { TableRow, TableCell, TableBody } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Link from "next/link";
import Image from "next/image";
import styles from "./CartLine.module.scss";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";


interface Props {
    title: string;
    variant: string;
    availableQuantity: number;
    quantity: number;
    onClick: () => void;
    onValueChange: (value: number) => void;
    pricePerUnit: String;
    pricePerLine: String;
    handle: string;
    imgUrl: string;
}

const CartLine = ({
    title,
    variant,
    availableQuantity,
    quantity,
    onClick,
    onValueChange,
    pricePerUnit,
    pricePerLine,
    handle,
    imgUrl,
}: Props) => {

    const [inputQuantity, setInputQuantity] = useState(quantity);

    useEffect(() => {
        setInputQuantity(quantity)
    }, [quantity])

    const debouncedOnValueChange = useDebouncedCallback(
        (value: number) => {
            onValueChange(value);
        },
        500
    );

    return (
            <TableRow key={title}>
                <TableCell component="th" scope="row">
                    <Link href={`/products/${handle}`}>
                        <div className={styles.imgContainer}>
                            <Image src={imgUrl} alt={title} fill={true} />
                        </div>
                    </Link>
                </TableCell>
                <TableCell className={styles.text} align="center">
                    {title}
                </TableCell>
                <TableCell className={styles.text} align="center">
                    {variant}
                </TableCell>
                <TableCell className={styles.text} align="center">
                    <NumberInput
                        availableQuantity={availableQuantity}
                        value={inputQuantity}
                        onValueChange={val => {
                            setInputQuantity(val);
                            debouncedOnValueChange(val)
                        }
                        }
                    />
                </TableCell>
                <TableCell className={styles.text} align="center">
                    {pricePerUnit}
                </TableCell>
                <TableCell className={styles.text} align="center">
                    {pricePerLine}
                </TableCell>
                <TableCell className={styles.text} align="center">
                    <button className={styles.removeProductButton} onClick={onClick}>
                        <DeleteOutlinedIcon />
                    </button>
                </TableCell>
            </TableRow>
    );
};

export default CartLine;
