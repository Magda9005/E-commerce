import { useQuery } from "urql";
import Cookies from "js-cookie";
import { useMemo, createContext } from "react";
import { getCart } from "../queries/queries";
// import { formatPrice } from '../helperFunctions/helperFunctions';


export const MyContext = createContext();

interface Props {
  children: React.ReactNode
}
const CartContext = ({ children }: Props) => {
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
        totalQuantity: data.cart.lines.edges.length,
        totalCostAndCurrency: [
          data.cart.cost.totalAmount.amount,
          data.cart.cost.totalAmount.currencyCode,
        ],
        productsList: data.cart.lines.edges,
        isLoading: fetching,
      };
    }
    else return {
      productsList: []
    }
  }, [data, fetching, error]);

  return <MyContext.Provider value={cart}>{children}</MyContext.Provider>;
};

export default CartContext;
