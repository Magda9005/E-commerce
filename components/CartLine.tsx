import NumberInput from "./NumberInput";
import { TableRow, TableCell, TableBody } from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Link from "next/link";
import Image from "next/image";
import styles from "./CartLine.module.scss";

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
    return (
        <TableBody>
            <TableRow key={title}>
                <TableCell component="th" scope="row">
                    <Link href={`/products/${handle}`}>
                        <div className={styles.imgContainer}>
                            <Image src={imgUrl} alt="product" fill={true} />
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
                        value={quantity}
                        onValueChange={onValueChange}
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
        </TableBody>
    );
};

export default CartLine;
