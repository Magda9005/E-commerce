import { useState } from "react";
import Navbar from "../../components/Navbar";
import EmptyCartInfo from "../../components/EmptyCartInfo";
import { useMutation } from "urql";
import { useDebouncedCallback } from "use-debounce";
import { formatPrice } from "../../helperFunctionsAndConstants/helperFunctions";
import * as React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import CartLine from "../../components/CartLine";
import styles from "./index.module.scss";
import TableHeadCart from "../../components/TableHead";
import {
  removeLine,
  updateSingleLineQuantity,
  createCheckout,
} from "../../mutations/mutations";
import ErrorMessage from "../../components/ErrorMessage";
import useCart from "../../hooks/useCart";
import { fetchOptions } from "../../helperFunctionsAndConstants/fetchOptions";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import TotalCostTableRow from "../../components/TotalCostTableRow";
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from "@mui/material";


const Cart = () => {
  const context = useCart();
  const [, executeMutation] = useMutation(removeLine);
  const [, updateLine] = useMutation(updateSingleLineQuantity);
  const [, checkoutCreate] = useMutation(createCheckout);
  const router = useRouter();

  const cartId = context.cartId;
  const [error, setError] = useState(false);

  const removeItem = (lineId: string) => {
    const lineIds = [lineId];
    executeMutation({ cartId, lineIds }).then((result) => {
      if (result.error) {
        setError(true);
      }
    });
    setError(false);
  };

  const debouncedLineUpdate = useDebouncedCallback((cartId, lines) => {
    updateLine({ cartId, lines }).then((result) => {
      if (result.error) {
        setError(true);
      }
    });
    setError(false);
  }, 100);

  const checkout = () => {
    const lineItems = context.productsList.map((product) => ({
      variantId: product.node.merchandise.id,
      quantity: product.node.quantity,
    }));

    checkoutCreate({ lineItems })
      .then((result) => result.data?.checkoutCreate?.checkout?.webUrl)
      .then((href) => router.push(href));
  };

  return (
    <>
      <Navbar itemsQuantity={context.totalQuantity} />
      {(context.isLoading && context.cartId=="") && <Stack alignItems="center"> 
      <CircularProgress color="inherit" /></Stack>}
      {(!context.isLoading && context.productsList.length === 0) && <EmptyCartInfo />}
      {context.error && (
        <ErrorMessage errorMessage={"Sorry could not retrieve data"} />
      )}
      <div className={styles.tableContainer}>
        <TableContainer component={Paper}>
          {error && (
            <ErrorMessage
              errorMessage={
                "Sorry, could not perform your demand, please try again"
              }
            />
          )}
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            {context.productsList.length > 0 && <TableHeadCart />}
            {context.productsList.map((product) => {
              if (product.node.merchandise.quantityAvailable) {
                return (
                  <>
                    <CartLine
                      title={product.node.merchandise.product.title}
                      variant={product.node.merchandise.title}
                      availableQuantity={product.node.merchandise.quantityAvailable}
                      quantity={product.node.quantity}
                      onClick={() => {
                        removeItem(product.node.id);
                      }}
                      onValueChange={(value) =>
                        debouncedLineUpdate(cartId, [
                          { id: product.node.id, quantity: value },
                        ])
                      }
                      pricePerUnit={formatPrice(
                        product.node.cost.totalAmount.currencyCode,
                        product.node.merchandise.price.amount
                      )}
                      pricePerLine={formatPrice(
                        product.node.cost.totalAmount.currencyCode,
                        product.node.cost.totalAmount.amount
                      )}
                      handle={product.node.merchandise.product.handle}
                      imgUrl={product.node.merchandise.product.images.edges[0].node.url}
                    />
                  </>
                );
              }
            })}
          </Table>
        </TableContainer>
        {context.productsList.length > 0 && (
          <TotalCostTableRow
            onClick={() => checkout()}
            totalCost={formatPrice(
              context.totalCostAndCurrency[1],
              context.totalCostAndCurrency[0]
            )}
          />
        )}
      </div>
    </>
  );
};

export default withUrqlClient((ssr) => ({ ...fetchOptions }))(Cart);

