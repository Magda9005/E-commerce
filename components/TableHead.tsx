import { TableHead, TableRow, TableCell } from "@mui/material";
import styles from "./TableHead.module.scss";

const TableHeadCart = () => (
  <TableHead>
    <TableRow>
      <TableCell></TableCell>
      <TableCell className={styles.header} align="center">
        Product
      </TableCell>
      <TableCell className={styles.header} align="center">
        Variant
      </TableCell>
      <TableCell className={styles.header} align="center">
        Quantity
      </TableCell>
      <TableCell className={styles.header} align="center">
        Unit Price
      </TableCell>
      <TableCell className={styles.header} align="center">
        Total Price
      </TableCell>
      <TableCell className={styles.header} align="center">
        Remove
      </TableCell>
    </TableRow>
  </TableHead>
);

export default TableHeadCart;
