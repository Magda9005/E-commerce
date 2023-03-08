import { useQuery } from 'urql';
import Cookies from 'js-cookie';
import { useMemo, createContext } from 'react';
import { idText } from 'typescript';
// import { formatPrice } from '../helperFunctions/helperFunctions';

const getCart = `query GetCart($cartId:ID!){
  cart(id: $cartId) {
  id
cost{
totalAmount {
amount
currencyCode
}
}
      totalQuantity
  createdAt
  updatedAt
  lines(first: 10) {
    edges {
      node {
        id
        cost{
          totalAmount{
            amount
            currencyCode
          }
        }
        merchandise {
            ... on ProductVariant {
              id
              quantityAvailable
                              product {
                                  title
                                  images(first:1){
                                    edges {
                                      node{
                                        url
                                      }
                                    }
                                  }
                              }
                              title
                              price {
                                amount
                              }
            }
          }
        quantity
      }
    }
  }
}
}
        `

export const MyContext = createContext();

//CartContext to jest komponent który eknapsuluje całą logikę koszyka
const CartContext = ({ children }) => {
  const cartId = Cookies.get('cartId');
  const [result] = useQuery(
    {
      query: getCart,
      variables: { cartId }
    },
  )
  const { data, fetching, error } = result;

  const cart = useMemo(() => {

    if(data){
      return {
        cartId: data.cart.id,
        totalQuantity: data.cart.lines.edges.length,
        totalCostAndCurrency:[data.cart.cost.totalAmount.amount,data.cart.cost.totalAmount.currencyCode],
        productsList: data.cart.lines.edges,
        isLoading: fetching
      }
    }
   

  }, [data, fetching, error]);

  return (
    <MyContext.Provider value={cart}>
      {children}
    </MyContext.Provider>
  )

}

export default CartContext;




