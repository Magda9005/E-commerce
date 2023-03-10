import { useState, useContext } from "react";
import { MyContext } from "../../components/CartContext";
import Navbar from "../../components/Navbar";
import EmptyCartInfo from "../../components/EmptyCartInfo";
import { useMutation } from "urql";
import { useDebouncedCallback } from "use-debounce";
import { formatPrice } from "../../helperFunctions/helperFunctions";
import { gql } from "graphql-tag";
import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CartLine from "../../components/CartLine";
import styles from "./index.module.scss";
import TableHeadCart from "../../components/TableHead";
import {removeLine,updateSingleLineQuantity} from '../../mutations/mutations';

const Cart = () => {
  const context = useContext(MyContext);
  const [result, executeMutation] = useMutation(removeLine);
  const [updateLineResult, updateLine] = useMutation(updateSingleLineQuantity);
  const cartId = context?.cartId;
//   const totalCost = formatPrice(
//     context?.totalCostAndCurrency[1],
//     context?.totalCostAndCurrency[0]
//   );

  console.log(context);

  const removeItem = (lineId: string) => {
    const lineIds = [lineId];
    executeMutation({ cartId, lineIds });
  };

 
  const debounced = useDebouncedCallback(
    (cartId, lines) => {
      updateLine({ cartId, lines });
    },
    200
  );

  if (!context) return null;

  return (
    <>
      <Navbar itemsQuantity={context?.totalQuantity} />
      {context?.productsList?.length === 0 && <EmptyCartInfo />}
      <div className={styles.tableContainer}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {context?.productsList?.map((product, index) => {
              const title = product.node.merchandise.product.title;
              const variant = product.node.merchandise.title;
              const quantity = product.node.quantity;
              const currency = product.node.cost.totalAmount.currencyCode;
              const pricePerUnit = formatPrice(
                currency,
                product.node.merchandise.price.amount
              );
              const pricePerLine = formatPrice(
                currency,
                product.node.cost.totalAmount.amount
              );
              const imgUrl =
                product.node.merchandise.product.images.edges[0].node.url;
              const lineId = product.node.id;
              const handle = product.node.merchandise.product.handle;
              if (index === 0) {
                return (
                  <>
                    <TableHeadCart />
                    <CartLine
                      title={title}
                      variant={variant}
                      availableQuantity={
                        product.node.merchandise.quantityAvailable
                      }
                      quantity={quantity}
                      onClick={() => {
                        removeItem(lineId);
                      }}
                      onValueChange={(value) =>
                        debounced(cartId, [
                          { id: product.node.id, quantity: value },
                        ])
                      }
                      pricePerUnit={pricePerUnit}
                      pricePerLine={pricePerLine}
                      handle={handle}
                      imgUrl={imgUrl}
                    />
                  </>
                );
              } else {
                return (
                  <CartLine
                    title={title}
                    variant={variant}
                    availableQuantity={
                      product.node.merchandise.quantityAvailable
                    }
                    quantity={quantity}
                    onClick={() => {
                      removeItem(lineId);
                    }}
                    onValueChange={(value) =>
                      debounced(cartId, [
                        { id: product.node.id, quantity: value },
                      ])
                    }
                    pricePerUnit={pricePerUnit}
                    pricePerLine={pricePerLine}
                    handle={handle}
                    imgUrl={imgUrl}
                  />
                );
              }
            })}
            {context?.productsList?.length > 0 && (
              <TableRow>
                <TableCell className={styles.cost} colSpan={7} align="right">
                  Total cost:{" "}
                  {/* <span className={styles.totalCost}>{totalCost}</span> */}
                </TableCell>
              </TableRow>
            )}
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Cart;
