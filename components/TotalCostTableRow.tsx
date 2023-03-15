import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import Button from "./Button";
import styles from "./TotalCostTableRow.module.scss";

interface Props {
  onClick: () => void;
  totalCost: String;
}

const TotalCostTableRow = ({ onClick, totalCost }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
        <TableRow>
          <TableCell className={styles.cost} colSpan={6} align="right">
            Total cost:<span className={styles.totalCost}> {totalCost}</span>
          </TableCell>
          <TableCell align="right" colSpan={6}>
            <Button text={"Checkout"} onClick={onClick} />
          </TableCell>
        </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TotalCostTableRow;
