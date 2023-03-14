import { useQuery } from "urql";
import Cookies from "js-cookie";
import { useMemo } from "react";
import { getCart } from "../queries/queries";

const useCart = () => {
  const cartId = Cookies.get("cartId") as string;
  
  const [result] = useQuery({
    query: getCart,
    variables: { cartId },
  });

  const { data, fetching, error } = result;

  const cart = useMemo(() => {
    if (data && data.cart) {
      return {
        cartId: data.cart.id,
        totalQuantity: data.cart.totalQuantity,
        totalCostAndCurrency: [
          data.cart.cost.totalAmount.amount,
          data.cart.cost.totalAmount.currencyCode,
        ],
        productsList: data.cart.lines.edges,
        isLoading: fetching,
        error: error,
      };
    } else
      return {
        cartId: "",
        productsList: [],
        totalCostAndCurrency: [],
        isLoading:fetching
      };
  }, [data, fetching, error]);

  return cart;
};

export default useCart;
